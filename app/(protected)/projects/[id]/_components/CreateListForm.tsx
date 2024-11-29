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
import { useActionState } from "react";
import { useForm } from "react-hook-form";

export const CreateListForm = ({ projectId }: { projectId: string }) => {
	const { currentUser } = useCurrentUser();
	const [state, action, isPending] = useActionState(
		createNewList.bind(null, currentUser, projectId),
		undefined
	);
	const form = useForm({
		defaultValues: {
			title: "",
		},
	});


	

	return (
		<Form {...form}>
			<form
				action={action}
				className="w-5/6 mx-auto flex flex-col gap-4 h-full"
			>
				<FormField
					name="title"
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
