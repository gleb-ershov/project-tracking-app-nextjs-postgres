import { Ellipsis, Square } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import staticProjectImagePlaceholder from "@/public/project-card-default-image.png";
import { statusColorCreator } from "@/utils/helpers/statusColorCreator";
import { DeleteProjectButton } from "./DeleteProjectButton";

interface IProjectCardProps {
	id: string;
	status: string;
	title: string;
	tags: string[];
	deadlineDate: Date;
}
export const ProjectCard = (props: IProjectCardProps) => {
	const { id, title, status, tags, deadlineDate } = props;
	const statusColor = statusColorCreator(status);

	return (
		<div className="m-6 p-4 pt-2 bg-background rounded-lg inline-block">
			<div className="flex items-center justify-between pb-2">
				<span className="flex items-center gap-2">
					<Square
						width={16}
						className={`fill-${statusColor}-400`}
						strokeWidth={0}
					/>
					<span
						className={`text-${statusColor}-500 font-semibold text-sm`}
					>
						{status.slice(0, 1).toUpperCase() + status.slice(1)}
					</span>
				</span>
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger className="outline-none">
							<span>
								<Ellipsis size={24} fill="lightgray" />
							</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<Link
								href={`/projects/${id}/info`}
								className="w-full"
							>
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
									permanently delete your project and
									corresponding tasks.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="flex items-center justify-between">
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Close
									</Button>
								</DialogClose>
								<DialogClose asChild>
									<DeleteProjectButton projectId={id} />
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</DropdownMenu>
				</Dialog>
			</div>
			<div className="flex items-center justify-between">
				{tags[0] ? (
					<Badge className="bg-sidebarL text-grayRegular">
						{tags[0]}
					</Badge>
				) : null}
				<span className="text-sm flex items-center gap-2 text-gray-600">
					Due date
					<span className="font-semibold">
						{format(deadlineDate, "dd.MM.yy")}
					</span>
				</span>
			</div>
			<Link href={`/projects/${id}`}>
				<Image
					alt="project-image-placeholder"
					placeholder="blur"
					src={staticProjectImagePlaceholder}
					width={270}
					height={160}
					className="mt-2"
				/>
				<h5 className="font-semibold mt-4 text-grayDark">{title}</h5>
			</Link>
		</div>
	);
};
