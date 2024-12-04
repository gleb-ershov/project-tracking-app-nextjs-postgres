"server-only";

import { db } from "@/prisma/db";
import { checkAuth } from "../actions/auth/checkAuth";
import { createError } from "../helpers/createError";
import { TGetProjectByIdOptions } from "../types";

export const getProjectById = async (
	id: string,
	options: TGetProjectByIdOptions
) => {
	const isAuthenticated = await checkAuth();

	if (!isAuthenticated.ok) {
		return createError(401, "Not Authorized", undefined, true);
	}

	const { incUser, incActivities, incLists, incTasks } = options;
	try {
		const response = await db.project.findMany({
			where: {
				id,
			},
			include: {
				createdBy: !!incUser,
				activities: {
					include: {
						createdBy: !!incActivities,
					},
				},
				tasks: !!incTasks,
				lists: !!incLists,
			},
		});

		return {
			ok: true,
			status: 200,
			data: response,
		};
	} catch (error) {
		return createError(500, "Internal Error", error, undefined);
	}
};
