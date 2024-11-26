"use server";

import { createError } from "@/utils/helpers/createError";
import { checkAuth } from "../auth/checkAuth";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { createActivityAction } from "../activities/createNewActivity";
import { redirect } from "next/navigation";

export const createNewProject = async (
	deadlineDate: Date,
	tags: string[],
	userId: string,
	currentState: unknown,
	formState: FormData
) => {
	const isAuthenticated = await checkAuth();

	if (!isAuthenticated.ok) {
		return createError(401, "Not Authorized", undefined, true);
	}

	const formData = {
		title: formState.get("title") as string,
		description: formState.get("description") as string,
		status: formState.get("status") as string,
	};

	const newProjectData = {
		...formData,
		tags,
		deadlineDate,
		userId,
	};

	let response;

	try {
		response = await db.project.create({
			data: newProjectData,
		});

		const projectCreatedActivity = {
			entityId: [response.id],
			userId,
			title: "Created",
			description: `created project ${response.title}`,
		};
		await createActivityAction(["projectId"], projectCreatedActivity);
		revalidatePath("/projects");

		return {
			ok: true,
			status: 200,
			data: response,
		};
	} catch (error) {
		return createError(500, "Internal Error", error, undefined);
	} finally {
		if (response?.id) {
			redirect("/projects");
		}
	}
};
