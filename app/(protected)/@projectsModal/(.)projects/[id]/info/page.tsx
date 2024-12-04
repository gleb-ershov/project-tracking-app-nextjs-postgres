import { getProjectById } from "@/utils/data-access/getProjectById";
import { ProjectInfo } from "@/app/(protected)/projects/_components/ProjectInfo";
import { Modal } from "@/components/common/Modal";

export default async function ProjectInfoPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const dynamicParams = await params;
	const projectId = dynamicParams.id;
	const project = await getProjectById(projectId, {
		incActivities: true,
		incUser: true,
	});

	return (
		<Modal position="right">
			{"data" in project ? <ProjectInfo {...project.data[0]} /> : null}
		</Modal>
	);
}
