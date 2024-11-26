"use client";

import { logOut } from "@/utils/actions/auth/logOut";
import { Button } from "../ui/button";

export const LogoutButton = () => {
	return (
		<Button onClick={() => logOut()} variant="ghost">
			Log out
		</Button>
	);
};
