"use server";

import { createError } from "@/utils/helpers/createError";
import { checkAuth } from "../auth/checkAuth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { createActivityAction } from "../activities/createNewActivity";
import { z } from "zod";
import { required_error, invalid_type_error } from "../../consts";

export const createNewTaskAction = async (
	user: { id: string; name: string },
	projectId: string,
	tags: string[],
	deadline: Date,
	externalLinks: string[],
	listId: string | null,
	currentState: unknown,
	formState: FormData
) => {
	const isAuthorized = await checkAuth();

	if (isAuthorized.status === 401) {
		return isAuthorized;
	}

	const newTask = {
		title: formState.get("title") as string,
		description: formState.get("description") as string,
		priority: formState.get("priority") as string,
		status: formState.get("status") as string,
	};

	const CreateTaskSchema = z.object({
		title: z.string({ invalid_type_error, required_error }),
		description: z.string({ invalid_type_error }).optional(),
		priority: z.string({ invalid_type_error, required_error }),
		status: z.string({ invalid_type_error, required_error }),
		deadline: z.date({ invalid_type_error, required_error }),
		tags: z.array(z.string({ invalid_type_error })).optional(),
		externalLinks: z.array(z.string({ invalid_type_error })).optional(),
	});
	const zodResult = CreateTaskSchema.safeParse({
		...newTask,
		tags,
		deadline,
		externalLinks,
	});

	if (!zodResult.success) {
		console.log(zodResult.error.errors);
		return createError(400, "Bad request", undefined, true);
	}

	try {
		const response = await db.task.create({
			data: {
				...newTask,
				tags,
				deadline,
				externalLinks,
				userId: user.id,
				projectId,
				listId,
			},
		});

		const newActivityPayload = {
			entityId: listId
				? [projectId, listId, response.id]
				: [projectId, response.id],
			userId: user.id,
			title: "Created",
			description: `created task ${newTask.title}`,
		};

		await createActivityAction(
			listId
				? ["projectId", "listId", "taskId"]
				: ["projectId", "taskId"],
			newActivityPayload
		);

		revalidatePath(`/projects/${projectId}`);

		return {
			ok: true,
			status: 200,
			data: response,
		};
	} catch (error) {
		return createError(500, "Internal Error", error, undefined);
	}
};
