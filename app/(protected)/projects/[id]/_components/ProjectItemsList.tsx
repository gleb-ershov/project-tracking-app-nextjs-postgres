import { TaskCard } from "./TaskCard";
import { ListCard } from "./ListCard";
import { cn } from "@/utils/lib/shadcnUtils";
import { getFilteredListsByProject } from "@/utils/data-access/getFilteredListsByProject";
import { getFilteredTasksByProject } from "@/utils/data-access/getFilteredTasksByProject";

export const ProjectItemsList = async ({
	projectId,
	display,
	sort,
	search,
}: {
	projectId: string;
	display: string;
	sort: string;
	search: string;
}) => {
	const [lists, tasks] = await Promise.allSettled([
		getFilteredListsByProject(projectId, search, sort),
		getFilteredTasksByProject(projectId, search, sort),
	]);
	return (
		<div
			className={cn(
				"p-2 bg-sidebarL mx-auto mt-4 w-[95%] flex flex-wrap gap-4 justify-evenly",
				{
					"flex-col": display === "list",
				}
			)}
		>
			{lists.status === "fulfilled" && "data" in lists.value
				? lists.value.data.map((list) => (
						<ListCard {...list} key={list.id} tasks={list.tasks} />
				  ))
				: null}
			{tasks.status === "fulfilled" && "data" in tasks.value
				? tasks.value.data.map((task) => (
						<TaskCard {...task} key={task.id} />
				  ))
				: null}
		</div>
	);
};
