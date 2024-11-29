export const ProjectsPageHeader = ({ content }: { content?: string }) => {
	const headerContent = content ? content : "Your Projects";
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-4xl font-semibold ml-8 pt-4 text-black">
				{headerContent}
			</h2>
		</div>
	);
};
