"use client";
import { useUrlParams } from "@/hooks/useUrlParams";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export const Searchbar = () => {
	const { pathname, searchParams, replace } = useUrlParams();

	const searchHandler = useDebouncedCallback((term: string) => {
		const newURLparams = new URLSearchParams(searchParams);
		newURLparams.set("search", term);
		replace(`${pathname}?${newURLparams.toString()}`);
	}, 300);

	return (
		<div className="bg-[#f5f6f8] flex items-center h-fit rounded-lg flex-1">
			<Search color="#d3d7de" strokeWidth={2} className="ml-2" />
			<input
				onChange={(e) => searchHandler(e.currentTarget.value)}
				type="search"
				className="border-none outline-none bg-transparent shadow-none p-2 w-full text-gray-600"
				placeholder="Search by name, label or task..."
			/>
		</div>
	);
};
