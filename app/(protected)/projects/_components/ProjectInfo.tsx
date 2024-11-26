import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { statusColorCreator } from "@/utils/helpers/statusColorCreator";
import { Activity, Project, User } from "@prisma/client";
import { format } from "date-fns";
import { Activity as ActivityIcon, Plus, Square } from "lucide-react";
import Image from "next/image";
import { ProjectActivityCard } from "./ProjectActivityCard";

interface IProjectActivityWithUser extends Activity {
	createdBy: User;
}

interface IProjectInfoProps extends Project {
	createdBy: User;
	activities: IProjectActivityWithUser[];
}

export const ProjectInfo = async (props: IProjectInfoProps) => {
	const {
		title,
		createdBy,
		deadlineDate,
		status,
		tags,
		activities,
		description,
	} = props;

	const statusColor = statusColorCreator(status);

	return (
		<div className="flex flex-col flex-1 w-[90%] mx-auto mt-6">
			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-bold">{title}</h3>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span className="font-medium text-grayRegular">
								Created by
							</span>
							<div className="px-1.5 bg-sidebarL rounded-full py-0.5 flex items-center gap-1">
								<span>
									<Image
										src={
											createdBy.imageUrl ||
											"/avatar-placeholder.png"
										}
										width={20}
										height={20}
										alt=""
										className="bg-background rounded-full"
									/>
								</span>
								<span className="font-medium text-sm">
									{`${createdBy.name} ${createdBy.surname}`}
								</span>
							</div>
							<span className="text-grayRegular bg-sidebarL rounded-full w-5 h-5 flex items-center justify-center">
								<Plus size={14} />
							</span>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<span className="font-medium text-grayRegular">
							Due date
						</span>
						<span className="py-0.5 px-2 font-semibold text-grayRegular bg-sidebarL rounded-md text-[12px] flex items-center gap-2">
							{format(deadlineDate, "PPP")}
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="font-medium text-grayRegular">
							Status
						</span>
						<Badge
							className={`font-semibold text-${statusColor}-500 bg-sidebarL text-[12px] flex items-center gap-2`}
						>
							<Square
								className={`fill-${statusColor}-400`}
								strokeWidth={0}
								size={14}
							/>
							{`${status.slice(0, 1).toUpperCase()}${status.slice(
								1
							)}`}
						</Badge>
					</div>
					<div className="flex items-center gap-4">
						<span className="font-medium text-grayRegular">
							Tags
						</span>
						<div className="flex items-center gap-2 flex-wrap">
							{tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
					</div>
					<div className="flex items-center gap-4">
						<span className="font-medium text-grayRegular">
							Assignees
						</span>
						<div className="px-1.5 bg-sidebarL rounded-full py-0.5 flex items-center gap-1">
							<span>
								<Image
									src={
										createdBy.imageUrl ||
										"/avatar-placeholder.png"
									}
									width={20}
									height={20}
									alt=""
									className="bg-background rounded-full"
								/>
							</span>
							<span className="font-medium text-sm">
								{`${createdBy.name} ${createdBy.surname}`}
							</span>
						</div>
					</div>
				</div>
			</div>
			<Tabs defaultValue="description" className="w-full mt-6 flex-1">
				<TabsList className="w-full flex items-center bg-sidebarL">
					<TabsTrigger value="description" className="w-1/2">
						Description
					</TabsTrigger>
					<TabsTrigger value="activities" className="w-1/2">
						Activities
					</TabsTrigger>
				</TabsList>
				<TabsContent value="description">
					<div className="bg-sidebarL p-2">
						<p className="text-justify leading-relaxed">
							{description}
						</p>
					</div>
				</TabsContent>
				<TabsContent value="activities">
					<div className="bg-sidebarL p-2">
						<ActivityIcon />
						{activities.map((item) => (
							<ProjectActivityCard {...item} key={item.id} />
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
