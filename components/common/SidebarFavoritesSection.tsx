"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import { Square } from "lucide-react";

export const SidebarFavoritesSection = () => {
	const { state } = useSidebar();
	return (
		<>
			<SidebarSeparator
				className={`w-full bg-gray-200 m-0 p-0 h-[1px] ${
					state === "collapsed" ? "hidden" : ""
				}`}
			/>
			<SidebarGroup
				className={`${state === "collapsed" ? "hidden" : ""}`}
			>
				<SidebarGroupLabel className="font-semibold mb-2 text-grayLight text-sm">
					Favorites
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{componentData.map(({ title, Icon, color }) => (
							<SidebarMenuItem key={title}>
								<SidebarMenuButton>
									<span className="flex items-center gap-2 font-semibold text-gray-600">
										<Icon
											strokeWidth={0}
											fill={color}
											size={18}
										/>
										{title}
									</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</>
	);
};

const componentData = [
	{
		title: "Card Sorting",
		Icon: Square,
		color: "skyblue",
	},
	{
		title: "Upload SpeedArt Videos",
		Icon: Square,
		color: "pink",
	},
	{
		title: "User Profile Redesign",
		Icon: Square,
		color: "purple",
	},
	{
		title: "Property Details Page UI",
		Icon: Square,
		color: "yellow",
	},
	{
		title: "Listing Page",
		Icon: Square,
		color: "green",
	},
];
