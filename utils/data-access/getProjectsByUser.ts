"server-only";

import { db } from "@/prisma/db";
import { checkAuth } from "../actions/auth/checkAuth";
import { createError } from "../helpers/createError";
import { getCurrentUser } from "./getCurrentUser";

export const getProjectsByUser = async (
	searchQuery?: string,
	sortQuery?: string
) => {
	const isAuthorized = await checkAuth();

	if (isAuthorized.status === 401) {
		return createError(401, "Authorization failed", undefined, true);
	}

	try {
		const currentUser = await getCurrentUser({ id: true });
		if ("data" in currentUser) {
			const { id } = currentUser.data;
			const response = await db.project.findMany({
				where: {
					userId: id,
					OR: [
						{
							title: {
								contains: searchQuery,
								mode: "insensitive",
							},
						},
						// requires to enter the whole tag 'title' content to find item
						{
							tags: {
								has: searchQuery,
							},
						},
					],
					...(sortQuery &&
						sortQuery !== "all" && { status: sortQuery }),
				},
			});

			return {
				ok: true,
				status: 200,
				data: response,
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
		return createError(500, "An unexpected error occured", error);
	}
};
