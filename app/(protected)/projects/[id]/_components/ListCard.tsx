import { List, Task } from "@prisma/client";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { TaskInListCard } from "./TaskInListCard";

interface IListCardProps extends List {
	tasks: Task[];
	projectId: string;
}

export const ListCard = (props: IListCardProps) => {
	const { id, tasks, title, projectId } = props;
	return (
		<div className="p-2 bg-background rounded-lg flex flex-col gap-2 items-center min-w-[200px] flex-auto">
			<h5 className="font-semibold text-center">{title}</h5>
			{tasks.map((task) => (
				<TaskInListCard {...task} key={task.id} />
			))}
			<Link
				href={`/projects/${projectId}/create?listId=${id}`}
				className="flex items-center gap-2 w-full text-sm justify-center mt-2"
			>
				Add task <PlusSquare size={18} strokeWidth={1} />
			</Link>
		</div>
	);
};
