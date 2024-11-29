import { ProjectsPageHeader } from "../_components/ProjectsPageHeader";
import { getProjectById } from "@/utils/data-access/getProjectById";
import { ProjectInfoFull } from "../_components/ProjectInfoFull";
import { TasksFilters } from "../_components/TasksFilters";
import Link from "next/link";
import { OverviewSelectBlock } from "../_components/OverviewSelectBlock";
import { PlusSquare } from "lucide-react";
import { ProjectItemsList } from "./_components/ProjectItemsList";
import { Carousel } from "@/components/common/Carousel";

export default async function ProjectInfoPage({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams?: Promise<{
		display?: string;
		search?: string;
		sort?: string;
	}>;
}) {
	const dynamicParams = await params;
	const projectId = dynamicParams.id;
	const projectContent = await getProjectById(projectId, true, true);
	const searchPar = await searchParams;
	const display = searchPar?.display || "flex";
	const search = searchPar?.search || "";
	const sort = searchPar?.sort || "";

	if ("data" in projectContent) {
		const currentProject = projectContent.data[0];

		const projectInfo = <ProjectInfoFull {...currentProject} />;

		const projectBoard = (
			<>
				<div className="flex items-center w-[90%] mx-auto mt-6">
					<div className="w-1/2">
						<OverviewSelectBlock />
					</div>
					<Link
						href={`/projects/${projectId}/create`}
						className="flex items-center gap-2 ml-auto"
					>
						Create new item
						<PlusSquare strokeWidth={1} />
					</Link>
				</div>
				<TasksFilters />
				<ProjectItemsList
					projectId={projectId}
					sort={sort}
					display={display}
					search={search}
				/>
			</>
		);

		const { title } = currentProject;
		return (
			<div className="flex flex-col w-full">
				<ProjectsPageHeader content={title} />
				<Carousel elements={[projectInfo, projectBoard]} />
			</div>
		);
	}
}
