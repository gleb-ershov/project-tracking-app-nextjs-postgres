import { getProjectsByUser } from "@/utils/data-access/getProjectsByUser";
import { ProjectCard } from "./ProjectCard";

interface IProjectsListProps {
	searchQuery?: string;
	sortQuery?: string;
}

export const ProjectsList = async (props: IProjectsListProps) => {
	const { searchQuery = "", sortQuery = "" } = props;
	const dbResponse = await getProjectsByUser(searchQuery, sortQuery);

	if (dbResponse.ok && "data" in dbResponse) {
		return (
			<>
				{dbResponse.data.map((item) => (
					<ProjectCard {...item} key={item.id} />
				))}
			</>
		);
	}

	if (!dbResponse.ok && !("data" in dbResponse)) {
		return <>Error</>;
	}
};
