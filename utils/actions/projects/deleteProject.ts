"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createError } from "../../helpers/createError";
import { checkAuth } from "../auth/checkAuth";
import { db } from "@/prisma/db";
import { getCurrentUser } from "@/utils/data-access/getCurrentUser";

export const deleteProjectAction = async (projectId: string) => {
	const isAuthorized = await checkAuth();

	if (isAuthorized.status === 401) {
		return isAuthorized;
	}

	try {
		const currentUser = await getCurrentUser({ id: true });
		if ("data" in currentUser) {
			const response = await db.project.findMany({
				where: {
					id: projectId,
				},
				select: {
					userId: true,
				},
			});

			if (!response) {
				return createError(
					400,
					"Project does not exist",
					undefined,
					true
				);
			}

			if (response[0].userId !== currentUser.data.id) {
				return createError(401, "No such permissions", undefined, true);
			}

			await db.project.delete({
				where: {
					id: projectId,
				},
			});

			revalidatePath("/projects");
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
		redirect("/projects");
	}
};
