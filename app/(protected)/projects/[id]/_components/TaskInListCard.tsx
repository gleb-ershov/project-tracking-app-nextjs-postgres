import { Task } from "@prisma/client";

export const TaskInListCard = (props: Task) => {
	return (
		<span className="w-full shadow-sm rounded-lg px-3 py-2 text-base cursor-pointer hover:bg-gray-50 duration-300">
			{props.title}
		</span>
	);
};
