import { BadgeWithImage } from "@/components/common/BadgeWithImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, User } from "@prisma/client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { Calendar, Ellipsis, Flag } from "lucide-react";
import Link from "next/link";
import { DeleteTaskButton } from "./DeleteTaskButton";

interface ITaskCardProps extends Task {
	createdBy: User;
}

export const TaskCard = (props: ITaskCardProps) => {
	const { title, deadline, createdBy, priority, projectId, id } = props;
	return (
		<div className="p-2 bg-background flex-auto min-w-[150px] rounded-lg flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<Badge className="bg-green-300 flex items-center gap-2 px-2 py-0 rounded-sm uppercase">
					<Flag size={12} />
					<span className="text-[12px]">{priority}</span>
				</Badge>
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger className="outline-none">
							<span>
								<Ellipsis size={24} fill="lightgray" />
							</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<Link href={`/projects/`} className="w-full">
								<DropdownMenuItem className="hover:cursor-pointer">
									More
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>
								<DialogTrigger className="text-left w-full">
									Delete
								</DialogTrigger>
							</DropdownMenuItem>
						</DropdownMenuContent>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Are you absolutely sure?
								</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will
									permanently delete this task.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="flex items-center justify-between">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Close
									</Button>
								</DialogClose>
								<DialogClose asChild>
									<DeleteTaskButton
										projectId={projectId}
										taskId={id}
									/>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</DropdownMenu>
				</Dialog>
			</div>
			<span className="font-semibold text-lg">{title}</span>
			{deadline ? (
				<span className="flex items-center gap-2">
					<Calendar size={14} />
					<span className="text-sm font-medium">
						{format(deadline, "PPP")}
					</span>
				</span>
			) : null}
			<BadgeWithImage
				imageProps={{
					src: createdBy.imageUrl,
					alt: `${createdBy.name} profile picture`,
					className: "rounded-full",
					width: 22,
					height: 22,
				}}
				badgeText={`${createdBy.name} ${createdBy.surname}`}
			/>
		</div>
	);
};
