"use client";

import { useCurrentUser } from "@/components/providers/AuthProvider";
import { createNewProject } from "@/utils/actions/projects/createNewProject";
import { useActionState, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { cn } from "@/utils/lib/shadcnUtils";
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
import { format } from "date-fns";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const CreateProjectForm = () => {
	const { currentUser } = useCurrentUser();
	const [tagInputValue, setTags] = useState<string[]>([]);
	const [datePickerValue, setDeadline] = useState<Date>(new Date(Date.now()));

	const [state, action, isPending] = useActionState(
		createNewProject.bind(
			null,
			datePickerValue,
			tagInputValue,
			currentUser.id
		),
		undefined
	);

	const form = useForm({
		defaultValues: {
			title: "",
			description: "",
			status: "",
			deadline: new Date(),
			tags: [],
		},
	});

	useEffect(() => console.log(state), [state]);

	return (
		<Form {...form}>
			<form
				className="w-5/6 mx-auto flex flex-col gap-4 mt-6"
				action={action}
			>
				<FormField
					control={form.control}
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
								Enter your new project title.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="deadline"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Due date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={(undefined, val: Date) => {
											field.onChange(val);
											setDeadline(val);
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<TagsInput
									minItems={0}
									value={field.value ? field.value : []}
									onValueChange={(val: string[]) => {
										field.onChange(val);
										setTags(val);
									}}
									placeholder="Enter your tags"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								name="status"
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="ongoing">
										Ongoing
									</SelectItem>
									<SelectItem value="completed">
										Completed
									</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								Your project complete status
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter your description"
									className="resize-none"
									{...field}
									name="description"
								/>
							</FormControl>
							<FormDescription>
								Some additional info about your project
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isPending && <span>asdasdas</span>}
				<Button type="submit" disabled={isPending}>
					Create project
				</Button>
			</form>
		</Form>
	);
};
