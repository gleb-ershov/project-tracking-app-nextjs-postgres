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
	const {
		currentUser: { name, imageUrl },
	} = useCurrentUser();
	return (
		<div className="flex items-center h-fit gap-8">
			<Mail size={20} color="gray" className="hidden lg:block" />
			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<div className="flex items-center gap-2">
						<Image
							src={imageUrl || ""}
							width={32}
							height={32}
							alt={`${name} profile picture`}
							className="max-h-8 max-w-8 rounded-full object-cover"
						/>
						<span className="font-semibold">{name}</span>
						<ChevronDown size={20} color="gray" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer font-medium">
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer font-medium">
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer font-medium">
						Team
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer font-medium">
						Subscription
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<LogoutButton className="p-0 h-fit lex items-center justify-between w-full font-medium" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
