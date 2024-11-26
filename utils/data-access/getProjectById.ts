"server-only";

import { db } from "@/prisma/db";
import { checkAuth } from "../actions/auth/checkAuth";
import { createError } from "../helpers/createError";

export const getProjectById = async (
	id: string,
	incActivities?: boolean,
	incUser?: boolean
) => {
	const isAuthenticated = await checkAuth();

	if (!isAuthenticated.ok) {
		return createError(401, "Not Authorized", undefined, true);
	}

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
