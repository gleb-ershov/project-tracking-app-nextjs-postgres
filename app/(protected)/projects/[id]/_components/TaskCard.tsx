import { Task } from "@prisma/client";

export const TaskCard = (props: Task) => {
	return (
		<div className="p-2 bg-background flex-auto min-w-[150px]">
			{props.title}
		</div>
	);
};
