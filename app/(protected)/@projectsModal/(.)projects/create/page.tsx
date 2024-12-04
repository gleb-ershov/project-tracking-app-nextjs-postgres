import { CreateProjectForm } from "@/app/(protected)/projects/_components/CreateProjectForm";
import { Modal } from "@/components/common/Modal";

export default async function CreateProjectPage() {
	return (
		<Modal position="right">
			<CreateProjectForm />
		</Modal>
	);
}
