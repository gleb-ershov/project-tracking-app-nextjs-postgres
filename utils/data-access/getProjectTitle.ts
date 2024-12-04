"server-only";

import { db } from "@/prisma/db";
import { createError } from "../helpers/createError";

export const getProjectTitle = async (projectId: string) => {
	try {
		const response = await db.project.findMany({
			where: { id: projectId },
			select: { title: true },
		});

		return {
			status: 200,
			ok: true,
			data: response,
		};
	} catch (error) {
		return createError(500, "An unexpected error occured", error);
	}
};
