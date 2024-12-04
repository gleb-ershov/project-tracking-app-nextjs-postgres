import { CreateProjectItemForm } from "@/app/(protected)/projects/[id]/_components/CreateProjectItemForm";
import { Modal } from "@/components/common/Modal";

export default async function CreateProjectItemPage() {
	return (
		<Modal position="right">
			<CreateProjectItemForm />
		</Modal>
	);
}
