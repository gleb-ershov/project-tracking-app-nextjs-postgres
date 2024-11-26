"use server";
import z from "zod";
import { required_error, invalid_type_error } from "../../consts";
import { hashPassword } from "@/utils/helpers/hashPassword";
import { db } from "@/prisma/db";
import { createError } from "@/utils/helpers/createError";
import { redirect } from "next/navigation";

interface ISignUpFormData {
	name: string;
	surname: string;
	city?: string;
	phone?: string;
	work?: string;
	email: string;
	password: string;
	repeat_password: string;
	imageUrl?: string;
}

export const createNewUser = async (
	currentState: unknown,
	formState: ISignUpFormData
) => {
	const SignUpFormSchema = z
		.object({
			name: z.string({ invalid_type_error, required_error }),
			surname: z.string({ invalid_type_error, required_error }),
			email: z.string({ invalid_type_error, required_error }).email(),
			password: z.string({ invalid_type_error, required_error }).min(6),
			repeat_password: z.string().min(6),
			city: z.string().optional(),
			work: z.string().optional(),
			phone: z.string().optional(),
			imageUrl: z.union([z.string().url().optional(), z.literal("")]),
		})
		.refine((schema) => schema.password === schema.repeat_password, {
			message: "Password and Repeat password fields should be equal",
		});

	const zodResult = SignUpFormSchema.safeParse(formState);

	if (!zodResult.success) {
		console.log(zodResult.error.errors);
		return createError(400, "Bad request", undefined, true);
	}

	const { name, surname, email, phone, city, work, imageUrl, password } =
		zodResult.data;

	const userData = {
		name,
		surname,
		email,
		phone,
		city,
		work,
		password: await hashPassword(password),
		imageUrl:
			imageUrl ||
			"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png",
	};

	let result;

	try {
		result = await db.user.create({
			data: userData,
		});

		return {
			status: 200,
			ok: true,
			data: result,
		};
	} catch (error) {
		return createError(500, "Internal Error", error, undefined);
	} finally {
		if (result) {
			redirect("/sign-in");
		}
	}
};
