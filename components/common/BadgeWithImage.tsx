import Image, { ImageProps } from "next/image";
import { Badge, BadgeProps } from "../ui/badge";
import { cn } from "@/utils/lib/shadcnUtils";

interface IBadgeWithImageProps {
	imageProps: ImageProps;
	badgeProps?: BadgeProps;
	badgeText: string;
}
export const BadgeWithImage = (props: IBadgeWithImageProps) => {
	const { imageProps, badgeProps, badgeText } = props;
	return (
		<Badge
			{...badgeProps}
			className={cn(
				"flex items-center gap-2 bg-sidebarL rounded-full text-grayDark font-medium w-fit px-1.5 py-0.5 mt-auto",
				badgeProps?.className
			)}
		>
			<Image {...imageProps} />
			<span>{badgeText}</span>
		</Badge>
	);
};
