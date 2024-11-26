"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { createNewUser } from "@/utils/actions/users/createNewUser";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
	name: z.string(),
	surname: z.string(),
	email: z.string(),
	password: z.string(),
	repeat_password: z.string(),
	phone: z.string().optional(),
	city: z.string().optional(),
	work: z.string().optional(),
	imageUrl: z.string().optional(),
});

export const SignUpForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
			repeat_password: "",
			phone: "",
			city: "",
			work: "",
			imageUrl: "",
		},
	});

	const [state, action, isPending] = useActionState(
		createNewUser.bind(null, undefined, form.getValues()),
		undefined
	);
	const [page, setPage] = useState<number>(1);

	return (
		<div className="border-2 border-gray-50 rounded-lg p-4 h-fit w-[90%] mx-auto sm:w-[75%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]">
			<h2 className="mx-auto font-bold text-xl w-fit">
				Create new account
			</h2>
			<Form {...form}>
				<form action={action} className="space-y-8 max-w-3xl mx-auto">
					{page === 1 ? (
						<>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Name"
												type="text"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="surname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Surname</FormLabel>
										<FormControl>
											<Input
												placeholder="Surname"
												type="text"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email"
												type="email"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput
												type="password"
												placeholder="Password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Password should be at least 6
											characters long.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="repeat_password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Repeat password</FormLabel>
										<FormControl>
											<PasswordInput
												type="password"
												placeholder="Repeat password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Please repeat your password
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null}

					{page === 2 ? (
						<>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone number</FormLabel>
										<FormControl>
											<Input
												placeholder="Phone Number"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Phone number with country code.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="sm:grid grid-cols-12 gap-4">
								<div className="sm:col-span-6">
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input
														placeholder="City"
														type="text"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="mt-8 sm:col-span-6 sm:mt-0">
									<FormField
										control={form.control}
										name="work"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Work</FormLabel>
												<FormControl>
													<Input
														placeholder="Company name"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Provide name of the company
													you are working in.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormField
								control={form.control}
								name="imageUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Profile image URL</FormLabel>
										<FormControl>
											<Input
												placeholder="example: https://example.com/image-id"
												type="text"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Provide a link to your desired
											profile image in URL format.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="mx-auto"
								disabled={isPending}
							>
								Submit
							</Button>
						</>
					) : null}
				</form>
			</Form>
			<div className="flex items-center justify-evenly mt-4">
				<Button
					variant="ghost"
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
				>
					<ArrowLeft />
				</Button>
				<span>Page {page} of 2</span>
				<Button
					variant="ghost"
					disabled={page === 2}
					onClick={() => setPage(page + 1)}
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
};
