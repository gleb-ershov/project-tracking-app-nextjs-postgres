"use client";

import { useUrlParams } from "@/hooks/useUrlParams";
import { FilterButton } from "./FilterButton";

const filterOptions = [
	{
		value: "to do",
		title: "To Do",
		icon: true,
	},
	{
		value: "in progress",
		title: "In Progress",
		icon: true,
	},
	{
		value: "done",
		title: "Done",
		icon: true,
	},
	{
		value: "need review",
		title: "Need review",
		icon: true,
	},
];

export const TasksFilters = () => {
	const { searchParams, pathname, replace } = useUrlParams();

	const handleSort = (newSortQuery: string) => {
		const newURLparams = new URLSearchParams(searchParams);
		const currentSortQuery = newURLparams.get("sort");
		if (currentSortQuery === newSortQuery) {
			newURLparams.set("sort", "");
		} else {
			newURLparams.set("sort", newSortQuery);
		}
		replace(`${pathname}?${newURLparams.toString()}`);
	};

	return (
		<div className="flex items-center w-[95%] bg-sidebarL mx-auto p-2 rounded-lg gap-6 justify-between mt-6">
			<div className="flex-1 flex gap-6 items-center">
				{filterOptions.map((option) => (
					<FilterButton
						handler={handleSort}
						{...option}
						key={option.value}
					/>
				))}
			</div>
		</div>
	);
};
