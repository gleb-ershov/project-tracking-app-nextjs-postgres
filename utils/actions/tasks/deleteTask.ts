"use server";

import { createError } from "@/utils/helpers/createError";
import { checkAuth } from "../auth/checkAuth";
import { getCurrentUser } from "@/utils/data-access/getCurrentUser";
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTaskAction = async (projectId: string, taskId: string) => {
	const isAuthorized = await checkAuth();

	if (isAuthorized.status === 401) {
		return isAuthorized;
	}

	try {
		const currentUser = await getCurrentUser({ id: true });
		if ("data" in currentUser) {
			const response = await db.task.findMany({
				where: {
					id: taskId,
				},
				select: {
					userId: true,
				},
			});

			if (!response) {
				return createError(400, "Task does not exist", undefined, true);
			}

			if (response[0].userId !== currentUser.data.id) {
				return createError(401, "No such permissions", undefined, true);
			}

			await db.task.delete({
				where: {
					id: taskId,
				},
			});

			revalidatePath(`/projects/${projectId}`);
			return {
				ok: true,
				status: 200,
			};
		} else {
			return createError(
				500,
				"An unexpected error occured",
				undefined,
				true
			);
		}
	} catch (error) {
		return createError(500, "Internal Error", error, undefined);
	} finally {
		redirect(`/projects/${projectId}`);
	}
};
