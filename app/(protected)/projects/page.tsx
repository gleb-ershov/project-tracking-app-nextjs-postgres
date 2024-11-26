import { ProjectsFilters } from "./_components/ProjectsFilters";
import { ProjectsPageHeader } from "./_components/ProjectsPageHeader";
import { ProjectsList } from "./_components/ProjectsList";

export default async function ProjectsPage(props: {
	searchParams?: Promise<{
		search?: string;
		sort?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const searchQuery = searchParams?.search || "";
	const sortQuery = searchParams?.sort || "";
	return (
		<div className="flex flex-col h-full">
			<ProjectsPageHeader />
			<ProjectsFilters />
			<div className="flex-1 bg-sidebarL my-6 w-[95%] mx-auto rounded-lg">
				<ProjectsList searchQuery={searchQuery} sortQuery={sortQuery} />
			</div>
		</div>
	);
}
