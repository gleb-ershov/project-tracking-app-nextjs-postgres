"use client";

import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/useUrlParams";
import { Grid2x2, Kanban, List, PlusSquare, Square } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ProjectsFilters = () => {
	const [displayType, setDisplayFormat] = useState<string>("kanban");
	const { searchParams, pathname, replace } = useUrlParams();

	const handleSort = (newSortQuery: string) => {
		const newURLparams = new URLSearchParams(searchParams);
		newURLparams.set("sort", newSortQuery);
		replace(`${pathname}?${newURLparams.toString()}`);
	};

	return (
		<div className="flex items-center w-[95%] bg-sidebarL mx-auto p-2 rounded-lg gap-6 justify-between mt-6">
			<div className="flex-1 flex gap-6 items-center">
				<Button
					onClick={() => handleSort("all")}
					className="w-1/3 bg-white p-2 text-center text-lg font-medium duration-300 text-grayDark hover:bg-gray-100"
				>
					<Square
						width={36}
						className="fill-gray-300"
						strokeWidth={0}
					/>
					<span className="text-gray-500 font-semibold">All</span>
				</Button>
				<Button
					onClick={() => handleSort("ongoing")}
					className="w-1/3 bg-white p-2 text-center text-lg font-medium duration-300 text-grayDark hover:bg-gray-100"
				>
					<Square
						width={36}
						className="fill-red-400"
						strokeWidth={0}
					/>
					<span className="text-red-500 font-semibold">Ongoing</span>
				</Button>
				<Button
					onClick={() => handleSort("completed")}
					size="icon"
					className="w-1/3 bg-white p-2 text-center text-lg font-medium duration-300 text-grayDark hover:bg-gray-100"
				>
					<Square
						width={36}
						className="fill-green-400"
						strokeWidth={0}
					/>
					<span className="text-green-500 font-semibold">
						Completed
					</span>
				</Button>
			</div>
			<div className="flex items-center gap-6 mr-8">
				<Link href="/projects/create" className="flex items-center gap-2">
					<PlusSquare />
					Add new project
				</Link>
				<button
					onClick={() => setDisplayFormat("kanban")}
					className={`hover:bg-gray-200 duration-300 p-2 rounded-lg`}
				>
					<Kanban size={28} />
				</button>
				<button
					className="hover:bg-gray-200 duration-300 p-2 rounded-lg"
					onClick={() => setDisplayFormat("list")}
				>
					<List size={28} />
				</button>
				<button
					onClick={() => setDisplayFormat("grid")}
					className="hover:bg-gray-200 duration-300 p-2 rounded-lg"
				>
					<Grid2x2 size={28} strokeWidth={1.5} />
				</button>
			</div>
		</div>
	);
};
