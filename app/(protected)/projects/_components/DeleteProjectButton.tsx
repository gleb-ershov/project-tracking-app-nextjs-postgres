"use client";

import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "@/utils/actions/projects/deleteProject";

export const DeleteProjectButton = ({ projectId }: { projectId: string }) => {
	return (
		<Button
			type="button"
			variant="secondary"
			className="bg-red-300"
			onClick={() => deleteProjectAction(projectId)}
		>
			Delete
		</Button>
	);
};
