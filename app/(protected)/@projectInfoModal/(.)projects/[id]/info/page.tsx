import { Ellipsis, MoveDiagonal, Star } from "lucide-react";
import { CloseModalButton } from "../../../../../../components/common/CloseModalButton";
import { getProjectById } from "@/utils/data-access/getProjectById";
import { ProjectInfo } from "@/app/(protected)/projects/_components/ProjectInfo";

export default async function ProjectInfoPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const dynamicParams = await params;
	const projectId = dynamicParams.id;
	const project = await getProjectById(projectId, true, true);

	return (
		<div className="absolute top-3 right-3 bg-background rounded-lg border-2 border-gray-50 shadow-md h-[calc(100%-24px)] w-1/3 flex flex-col p-2">
			<div className="flex items-center justify-between p-2">
				<span className="flex items-center gap-4">
					<CloseModalButton path="/projects" />
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
			{"data" in project ? <ProjectInfo {...project.data[0]} /> : null}
		</div>
	);
}
