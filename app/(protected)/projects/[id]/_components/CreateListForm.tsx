"use client";

import { useCurrentUser } from "@/components/providers/AuthProvider";
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
import { createNewList } from "@/utils/actions/lists/createNewList";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

export const CreateListForm = () => {
	const { currentUser } = useCurrentUser();
	const { id: projectId } = useParams<{ id: string }>();

	const [state, action, isPending] = useActionState(
		createNewList.bind(null, currentUser, projectId),
		undefined
	);

	const form = useForm();

	return (
		<Form {...form}>
			<form
				action={action}
				className="w-5/6 mx-auto flex flex-col gap-4 h-full"
			>
				<FormField
					name="title"
					defaultValue=""
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Type here"
									type="text"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter your new list title.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isPending} className="w-full">
					Create list
				</Button>
			</form>
		</Form>
	);
};
