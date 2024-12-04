"server-only";

import { db } from "@/prisma/db";
import { checkAuth } from "../actions/auth/checkAuth";
import { createError } from "../helpers/createError";

export const getFilteredProjectContent = async (
	projectId: string,
	searchQuery: string = "",
	sortQuery: string = ""
) => {
	const isAuthenticated = await checkAuth();

	if (!isAuthenticated.ok) {
		return createError(401, "Not Authorized", undefined, true);
	}
	await new Promise((resolve) => setTimeout(resolve, 15000));
	try {
		const response = await db.project.findMany({
			where: {
				id: projectId,
			},
			select: {
				tasks: {
					where: {
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
						listId: null,
						...(sortQuery &&
							sortQuery !== "all" && { status: sortQuery }),
					},
					include: { createdBy: true },
				},
				lists: {
					where: {
						title: {
							contains: searchQuery,
							mode: "insensitive",
						},
					},
					include: {
						tasks: true,
						createdBy: true,
					},
				},
			},
		});

		const result = [...response[0].lists, ...response[0].tasks].sort(
			(itemOne, itemTwo) =>
				itemTwo.createdAt.getTime() - itemOne.createdAt.getTime()
		);

		return {
			ok: true,
			status: 200,
			data: result,
		};
	} catch (error) {
		return createError(500, "An unexpected error occured", error);
	}
};
