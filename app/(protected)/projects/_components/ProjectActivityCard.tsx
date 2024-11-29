import { Activity, User } from "@prisma/client";
import Image from "next/image";

interface IProjectActivityCardProps extends Activity {
	createdBy: User;
}

export const ProjectActivityCard = (activity: IProjectActivityCardProps) => {
	const { createdBy, description } = activity;
	const userFullName = `${createdBy.name} ${createdBy.surname}`;
	return (
		<div className="px-4 py-2 mx-auto bg-background rounded-lg shadow-sm flex items-center w-full">
			<span className="flex items-center gap-2">
				<Image
					src={createdBy.imageUrl}
					width={24}
					height={24}
					alt=""
					className="rounded-full"
				/>
				<span className="font-semibold">{userFullName}</span>
			</span>
			&nbsp;<span>{description}</span>
		</div>
	);
};
