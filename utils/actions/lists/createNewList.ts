"use server";

import { db } from "@/prisma/db";
import { checkAuth } from "../auth/checkAuth";
import { revalidatePath } from "next/cache";
import { createError } from "@/utils/helpers/createError";
import { z } from "zod";
import { required_error, invalid_type_error } from "../../consts";
import { createActivityAction } from "../activities/createNewActivity";

export const createNewList = async (
	user: { id: string; name: string },
	projectId: string,
	currentState: unknown,
	formState: FormData
) => {
	const isAuthorized = await checkAuth();

	if (isAuthorized.status === 401) {
		return isAuthorized;
	}

	const newList = {
		title: formState.get("title") as string,
	};

	const CreateListSchema = z.object({
		title: z.string({ invalid_type_error, required_error }),
	});

	const zodResult = CreateListSchema.safeParse(newList);

	if (!zodResult.success) {
		return createError(400, "Bad request", undefined, true);
	}

	try {
		const response = await db.list.create({
			data: { ...newList, projectId, userId: user.id },
		});

		const newActivityPayload = {
			entityId: [projectId, response.id],
			userId: user.id,
			title: "Created",
			description: `created list ${newList.title}`,
		};
		await createActivityAction(["projectId", "listId"], newActivityPayload);

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
