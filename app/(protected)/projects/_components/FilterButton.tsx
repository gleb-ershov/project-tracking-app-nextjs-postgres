"use client";

import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";

interface IFilterButtonProps {
	handler: (term: string) => void;
	icon?: boolean;
	value: string;
	title: string;
}

export const FilterButton = (props: IFilterButtonProps) => {
	const { handler, icon, value, title } = props;
	return (
		<Button
			onClick={() => handler(value)}
			size="sm"
			className="w-1/3 bg-white text-center text-lg font-medium duration-300 text-grayDark hover:bg-gray-100"
		>
			{icon ? (
				<Square width={36} className="fill-gray-300" strokeWidth={0} />
			) : null}
			<span className="text-gray-500 font-semibold">{title}</span>
		</Button>
	);
};
