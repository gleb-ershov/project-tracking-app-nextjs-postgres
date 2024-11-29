import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTaskForm } from "./CreateTaskForm";
import { CreateListForm } from "./CreateListForm";

export const CreateProjectItemForm = async ({
	projectId,
}: {
	projectId: string;
}) => {
	return (
		<Tabs
			defaultValue="task"
			className="flex flex-col w-[90%] mx-auto mt-4 max-h-[calc(100%-15%)]"
		>
			<TabsList className="w-full flex items-center bg-sidebarL">
				<TabsTrigger value="task" className="w-1/2">
					Task
				</TabsTrigger>
				<TabsTrigger value="list" className="w-1/2">
					List
				</TabsTrigger>
			</TabsList>

			<TabsContent value="task" className="h-full">
				<CreateTaskForm projectId={projectId} />
			</TabsContent>

			<TabsContent value="list" className="flex-1">
				<CreateListForm projectId={projectId} />
			</TabsContent>
		</Tabs>
	);
};
