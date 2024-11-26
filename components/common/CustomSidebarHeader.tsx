"use client";
import { PanelLeft } from "lucide-react";
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "../ui/sidebar";

export const CustomSidebarHeader = () => {
	const { state, toggleSidebar } = useSidebar();
	const isCollapsed = state === "collapsed";
	return (
		<SidebarHeader className="py-4">
			<SidebarMenu>
				<SidebarMenuItem className="flex items-center justify-between">
					<SidebarMenuButton
						className={isCollapsed ? "hidden" : "block"}
					>
						<span className="font-bold">Acme</span>
					</SidebarMenuButton>
					<PanelLeft
						onClick={() => toggleSidebar()}
						size={25}
						strokeWidth={1}
						className={`cursor-pointer ml-auto`}
					/>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
};
