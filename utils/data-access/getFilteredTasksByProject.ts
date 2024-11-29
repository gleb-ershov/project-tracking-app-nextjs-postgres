"server-only";

import { db } from "@/prisma/db";
import { checkAuth } from "../actions/auth/checkAuth";
import { createError } from "../helpers/createError";

export const getFilteredTasksByProject = async (
	projectId: string,
	searchQuery: string = "",
	sortQuery: string = ""
) => {
	const isAuthenticated = await checkAuth();

	if (!isAuthenticated.ok) {
		return createError(401, "Not Authorized", undefined, true);
	}
	console.log(projectId, searchQuery, sortQuery);
	try {
		const response = await db.task.findMany({
			where: {
				projectId,
				listId: null,
				OR: [
					{
						title: {
							contains: searchQuery,
							mode: "insensitive",
						},
					},
					{
						tags: {
							has: searchQuery,
						},
					},
				],
				...(sortQuery && sortQuery !== "all" && { status: sortQuery }),
			},
		});

		return {
			ok: true,
			status: 200,
			data: response,
		};
	} catch (error) {
		return createError(500, "An unexpected error occured", error);
	}
};
