import { CreateProjectItemForm } from "@/app/(protected)/projects/[id]/_components/CreateProjectItemForm";
import { CloseModalButton } from "@/components/common/CloseModalButton";
import { Ellipsis, MoveDiagonal, Star } from "lucide-react";

export default async function CreateProjectItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const projectId = await (await params).id;
	return (
		<div className="absolute top-3 right-3 bg-background rounded-lg border-2 border-gray-50 shadow-md h-[calc(100%-24px)] w-1/3 flex flex-col p-2">
			<div className="flex items-center justify-between p-2 h-[5%]">
				<span className="flex items-center gap-4">
					<CloseModalButton />
					<MoveDiagonal strokeWidth={1} />
				</span>
				<h3 className="font-semibold text-lg text-grayRegular">
					Project info
				</h3>
				<span className="flex items-center gap-4">
					<Ellipsis strokeWidth={1} />
					<Star strokeWidth={1} />
				</span>
			</div>
			<CreateProjectItemForm projectId={projectId} />
		</div>
	);
}