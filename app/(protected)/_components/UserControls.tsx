"use client";
import { ChevronDown, Mail } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "../../../components/common/LogoutButton";
import { useCurrentUser } from "@/components/providers/AuthProvider";
import Image from "next/image";

export const UserControls = () => {
	const { currentUser } = useCurrentUser();
	return (
		<div className="flex items-center h-fit gap-8">
			<Mail size={20} color="gray" className="hidden lg:block" />
			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<div className="flex items-center gap-2">
						<Image
							src={currentUser.imageUrl || ""}
							width={32}
							height={32}
							alt=""
							className="rounded-full"
						/>
						<span className="font-semibold">
							{currentUser.name}
						</span>
						<ChevronDown size={20} color="gray" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						Team
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						Subscription
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<LogoutButton />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
