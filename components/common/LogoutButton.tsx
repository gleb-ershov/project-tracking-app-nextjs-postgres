"use client";

import { logOut } from "@/utils/actions/auth/logOut";
import { Button, ButtonProps } from "../ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = (props: ButtonProps) => {
	return (
		<Button onClick={() => logOut()} variant="ghost" {...props}>
			Log out
			<LogOut />
		</Button>
	);
};
