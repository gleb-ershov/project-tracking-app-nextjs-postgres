"use client";

import { useUrlParams } from "@/hooks/useUrlParams";

export const OverviewSelectBlock = () => {
	const { searchParams, pathname, replace } = useUrlParams();
	const currentDisplayType = searchParams.get("display") || "flex";

	const handleDisplay = (newDisplayType: string) => {
		const newURLparams = new URLSearchParams(searchParams);
		newURLparams.set("display", newDisplayType);
		replace(`${pathname}?${newURLparams.toString()}`);
	};
	return (
		<div className="flex items-center w-full justify-between text-sm">
			<span className="w-1/4 font-semibold text-gray-500 text-left">
				Overview
			</span>
			<button
				onClick={() => handleDisplay("flex")}
				className={`w-1/4
                    ${
						currentDisplayType === "flex" &&
						"border-b-2 border-black"
					}`}
			>
				Flex
			</button>
			<button
				onClick={() => handleDisplay("grid")}
				className={`w-1/4 ${
					currentDisplayType === "grid" && "border-b-2 border-black"
				}`}
			>
				Grid
			</button>
			<button
				onClick={() => handleDisplay("list")}
				className={`w-1/4 ${
					currentDisplayType === "list" && "border-b-2 border-black"
				}`}
			>
				List
			</button>
		</div>
	);
};
