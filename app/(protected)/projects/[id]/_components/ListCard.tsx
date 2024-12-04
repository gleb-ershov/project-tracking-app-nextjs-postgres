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
		<div className="p-2 bg-background rounded-lg shadow-sm flex flex-col gap-2 items-center min-w-[200px] flex-auto">
			<h5 className="font-semibold text-center">{title}</h5>
			<div className="flex flex-col gap-4 w-full items-center my-2">
				{tasks.map((task) => (
					<TaskInListCard {...task} key={task.id} />
				))}
			</div>
			<Link
				href={`/projects/${projectId}/create?listId=${id}`}
				className="flex items-center gap-2 w-full text-sm justify-center
				 bg-sky-50 px-2 py-1 rounded-lg mt-auto font-semibold text-sky-400
				  hover:bg-sky-100 duration-300"
			>
				Add task <PlusSquare size={18} strokeWidth={1.5} />
			</Link>
		</div>
	);
};
