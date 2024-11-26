"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { logIn } from "@/utils/actions/auth/logIn";
import { PasswordInput } from "@/components/ui/password-input";
// import { PasswordInput } from "@/components/ui/password-input";
export const SignInForm = () => {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [state, action, isPending] = useActionState(logIn, undefined);
	useEffect(() => console.log(state), [state]);

	return (
		<div className="border-2 border-gray-50 rounded-lg p-4 h-fit w-[90%] mx-auto sm:w-[75%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]">
			<h2 className="mx-auto font-bold text-xl w-fit">Log in account</h2>
			<Form {...form}>
				<form
					action={action}
					className="space-y-8 max-w-3xl mx-auto py-10"
				>
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
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
};
