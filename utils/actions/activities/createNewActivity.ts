"use server";

import { db } from "@/prisma/db";
import { createError } from "../../helpers/createError";

interface ICreateActivityArgs {
	entityId: string[];
	userId: string;
	title: string;
	description: string;
}

export const createActivityAction = async (
	entity: string[],
	entityData: ICreateActivityArgs
) => {
	const { entityId, userId, title, description } = entityData;

	const newActivityRelations = Object.fromEntries(
		entity.map((_, i) => [entity[i], entityId[i]])
	);

	try {
		const response = await db.activity.create({
			data: { ...newActivityRelations, title, userId, description },
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
