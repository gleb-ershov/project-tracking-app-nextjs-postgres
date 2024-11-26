"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const CloseModalButton = ({ path }: { path?: string }) => {
	const router = useRouter();
	const closeModalRedirect = () => {
		if (path) {
			router.push(path);
			return;
		}
		router.back();
	};
	return (
		<button onClick={() => closeModalRedirect()}>
			<X strokeWidth={1} />
		</button>
	);
};
