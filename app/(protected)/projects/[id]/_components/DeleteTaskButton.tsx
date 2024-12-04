"use client";

import { Button } from "@/components/ui/button";
import { deleteTaskAction } from "@/utils/actions/tasks/deleteTask";

export const DeleteTaskButton = ({
	projectId,
	taskId,
}: {
	projectId: string;
	taskId: string;
}) => {
	return (
		<Button
			type="button"
			variant="secondary"
			className="bg-red-300"
			onClick={() => deleteTaskAction(projectId, taskId)}
		>
			Delete
		</Button>
	);
};
