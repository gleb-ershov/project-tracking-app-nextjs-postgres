"use client";

import { useCurrentUser } from "@/components/providers/AuthProvider";
import { createNewTaskAction } from "@/utils/actions/tasks/createNewTask";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

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
import { Calendar as CalendarIcon, Delete, PlusSquare } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCreateTask } from "@/hooks/useCreateTask";

export const CreateTaskForm = ({ projectId }: { projectId: string }) => {
	const { currentUser } = useCurrentUser();
	const searchParams = useSearchParams();
	const listId = searchParams.get("listId");
	useEffect(() => console.log(listId), [listId]);
	const { state: createTaskState, dispatch } = useCreateTask();

	const [state, action, isPending] = useActionState(
		createNewTaskAction.bind(
			null,
			currentUser,
			projectId,
			createTaskState.tagInputValue,
			createTaskState.datePickerValue,
			createTaskState.linksInputs.map(
				(item: { value: string }) => item.value
			),
			listId
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
			priority: "",
			listId: listId || "",
		},
	});

	return (
		<Form {...form}>
			<form
				className="w-5/6 mx-auto flex flex-col gap-4 h-full"
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
								Enter your new task title.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between items-end">
					<FormField
						control={form.control}
						name="deadline"
						render={({ field }) => (
							<FormItem className="flex flex-col flex-1">
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
											onSelect={(
												undefined,
												val: Date
											) => {
												field.onChange(val);
												dispatch({
													type: "add_deadlineDate",
													payload: val,
												});
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					{listId ? (
						<FormField
							name="listId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>List ID</FormLabel>
									<FormControl>
										<Input
											type="text"
											disabled={true}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : null}
				</div>
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
										dispatch({
											type: "add_tag",
											payload: val,
										});
									}}
									placeholder="Enter your tags"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-4 w-full">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className="w-1/2">
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
										<SelectItem value="to do">
											To Do
										</SelectItem>
										<SelectItem value="in progress">
											In Progress
										</SelectItem>
										<SelectItem value="done">
											Done
										</SelectItem>
										<SelectItem value="need review">
											Need Review
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Your task complete status
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="priority"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormLabel>Priority</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									name="priority"
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select option" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="normal">
											Normal
										</SelectItem>
										<SelectItem value="high">
											High
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Your task priority
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
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
								Some additional info about your task
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">External links</span>
					<button
						type="button"
						onClick={() =>
							dispatch({
								type: "add_externalLinkInput",
							})
						}
					>
						<PlusSquare size={20} />
					</button>
				</div>

				<div className="flex flex-col overflow-auto flex-1 gap-2">
					{createTaskState.linksInputs.map((item, index) => (
						<div
							key={`${index}`}
							className="flex items-flex justify-between gap-4"
						>
							<Input
								type="url"
								className="flex-1 outline-none"
								value={item.value}
								placeholder="Enter your link here..."
								onChange={(e) => {
									const prevValue = [
										...createTaskState.linksInputs,
									];
									prevValue[index].value =
										e.currentTarget.value;
									dispatch({
										type: "add_externalLinkValue",
										payload: prevValue,
									});
								}}
							/>
							<button
								type="button"
								className="mr-4"
								onClick={() => {
									const newState = [
										...createTaskState.linksInputs,
									];
									newState.splice(index, 1);
									dispatch({
										type: "delete_externalLink",
										payload: newState,
									});
								}}
							>
								<Delete size={20} />
							</button>
						</div>
					))}
				</div>
				<Button type="submit" disabled={isPending}>
					Create task
				</Button>
			</form>
		</Form>
	);
};
