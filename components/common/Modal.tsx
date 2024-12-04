import { Ellipsis, MoveDiagonal, Star } from "lucide-react";
import { ReactNode } from "react";
import { CloseModalButton } from "./CloseModalButton";
import { cn } from "@/utils/lib/shadcnUtils";

interface IModalProps {
	position: "left" | "right";
	children: ReactNode;
	resizable?: boolean;
	redirectPath?: string;
}
export const Modal = (props: IModalProps) => {
	const { position, children, resizable = false, redirectPath } = props;
	return (
		<div
			className={cn(
				"absolute top-3 bg-background rounded-lg border-2 border-gray-50 shadow-md h-[calc(100%-24px)] w-1/3 flex flex-col p-2 z-50",
				{
					"right-3": position === "right",
					"left-3": position === "left",
				}
			)}
		>
			<div className="flex items-center justify-between p-2">
				<span className="flex items-center gap-4">
					<CloseModalButton path={redirectPath} />
					{resizable ? <MoveDiagonal strokeWidth={1} /> : null}
				</span>
				<h3 className="font-semibold text-lg text-grayRegular">
					Project info
				</h3>
				<span className="flex items-center gap-4">
					<Ellipsis strokeWidth={1} />
					<Star strokeWidth={1} />
				</span>
			</div>
			{children}
		</div>
	);
};
