import { Activity, User } from "@prisma/client";

interface IProjectActivityCardProps extends Activity {
	createdBy: User;
}

export const ProjectActivityCard = (activity: IProjectActivityCardProps) => {
	const { createdBy, description } = activity;
	return (
		<div className="px-2 py-1 mx-auto bg-background">
			<span>{`${createdBy.name} ${createdBy.surname}`}</span>
			{description}
		</div>
	);
};
