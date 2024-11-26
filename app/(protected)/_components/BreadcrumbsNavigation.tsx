"use client";
import { usePathname } from "next/navigation";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export const BreadcrumbsNavigation = () => {
	const createBreadcrumbs = (path: string) => {
		if (path === "/") {
			return ["Home"];
		}
		const pathElements: string[] = path.split("/");
		return ["Home", ...pathElements];
	};

	const pathname = usePathname();
	const breadcrumbValues = createBreadcrumbs(pathname);

	return (
		<>
			{pathname === "/" ? null : (
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbValues.map((item, index) =>
							item !== "" ? (
								<div
									key={item}
									className="flex items-center gap-3"
								>
									<BreadcrumbItem>
										<Link
											href={item === "Home" ? "/" : item}
										>
											{item.slice(0, 1).toUpperCase() +
												item.slice(1)}
										</Link>
									</BreadcrumbItem>
									{index !== breadcrumbValues.length - 1 ? (
										<BreadcrumbSeparator>
											/
										</BreadcrumbSeparator>
									) : null}
								</div>
							) : null
						)}
					</BreadcrumbList>
				</Breadcrumb>
			)}
		</>
	);
};
