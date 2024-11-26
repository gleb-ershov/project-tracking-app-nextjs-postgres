"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { BreadcrumbsNavigation } from "./BreadcrumbsNavigation";
import { Topbar } from "./Topbar";
import { Menu } from "lucide-react";

export const Header = () => {
	const { toggleSidebar } = useSidebar();
	return (
		<header
			className="py-4 bg-background dark:bg-backgroundD
		 flex md:flex-col h-24"
		>
			<Menu
				size={36}
				className="mr-4 md:hidden cursor-pointer"
				onClick={() => toggleSidebar()}
			/>
			<div className="hidden md:block mx-8">
				<Topbar />
			</div>
			<div className="hidden md:block mx-8 mt-4">
				<BreadcrumbsNavigation />
			</div>
		</header>
	);
};
