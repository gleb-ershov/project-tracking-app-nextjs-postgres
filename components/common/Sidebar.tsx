"use client";

import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";

import {
	House,
	Bell,
	Folders,
	Calendar,
	SquareUserRound,
	Boxes,
	Cog,
	CircleAlert,
	Flag,
} from "lucide-react";
import { CustomSidebarHeader } from "./CustomSidebarHeader";
import { SidebarFavoritesSection } from "./SidebarFavoritesSection";
import { useState } from "react";
import { Input } from "../ui/input";

export const Sidebar = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	return (
		<ShadcnSidebar
			className="border-none text-grayDark dark:text-grayRedular bg-sidebarL dark:bg-sidebarD"
			collapsible="icon"
		>
			<CustomSidebarHeader />
			{/* <Input
				type="search"
				onChange={(e) => setSearchValue(e.currentTarget.value)}
				value={searchValue}
				className="bg-transparent my-4 mx-auto w-[95%]"
			/> */}
			<SidebarContent className="text-base">
				{sidebarContent.map(({ key, label, items }, index) => (
					<div key={index}>
						<SidebarSeparator
							key={`key_${index}`}
							className="w-full bg-gray-200 m-0 p-0 h-[1px]"
						/>
						<SidebarGroup key={key}>
							<SidebarGroupContent>
								{label && (
									<SidebarGroupLabel className="font-semibold mb-2 text-grayLight text-sm">
										{label}
									</SidebarGroupLabel>
								)}
								<SidebarMenu className="gap-4">
									{items
										.filter((item) =>
											item.title.includes(searchValue)
										)
										.map(({ title, link, Icon }) => (
											<SidebarMenuItem key={title}>
												<SidebarMenuButton>
													<Link
														href={link}
														className="flex items-center gap-2 text-[15px] font-medium"
													>
														<Icon
															size={20}
															strokeWidth={1}
														/>
														{title}
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</div>
				))}
				<SidebarFavoritesSection />
			</SidebarContent>
		</ShadcnSidebar>
	);
};

const sidebarContent = [
	{
		key: "group-home",
		items: [
			{
				title: "Home",
				Icon: House,
				link: "/",
			},
			{
				title: "Notifications",
				Icon: Bell,
				link: "/notifications",
			},
			{
				title: "Projects",
				Icon: Folders,
				link: "/projects",
			},
			{
				title: "Calendar",
				Icon: Calendar,
				link: "/calendar",
			},
		],
	},
	{
		key: "group-reporting",
		label: "Reporting",
		items: [
			{
				title: "Portfolio",
				Icon: SquareUserRound,
				link: "/portfolio",
			},
			{
				title: "Goals",
				Icon: Boxes,
				link: "/goals",
			},
		],
	},
	{
		key: "group-general",
		label: "General",
		items: [
			{
				title: "Settings",
				Icon: Cog,
				link: "/settings",
			},
			{
				title: "Support",
				Icon: CircleAlert,
				link: "/support",
			},
			{
				title: "Report",
				Icon: Flag,
				link: "/report",
			},
		],
	},
];
