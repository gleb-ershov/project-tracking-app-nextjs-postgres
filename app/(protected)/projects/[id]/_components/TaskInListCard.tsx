import { Task } from "@prisma/client";

export const TaskInListCard = (props: Task) => {
	return (
		<span className="w-[90%] shadow-md rounded-lg px-2 py-1 text-sm">
			{props.title}
		</span>
	);
};
