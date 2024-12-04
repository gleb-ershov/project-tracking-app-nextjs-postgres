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
		const pathElements: string[] = path.slice(1).split("/");

		return pathElements;
	};

	let url = "";
	const pathname = usePathname();
	const breadcrumbValues = createBreadcrumbs(pathname);

	return (
		<Breadcrumb separator="/">
			<BreadcrumbList>
				{breadcrumbValues.map((item, index) => {
					url += `/${item}`;
					return (
						<div key={item} className="flex items-center gap-3">
							<BreadcrumbItem>
								<Link href={url}>
									{`${item
										.slice(0, 1)
										.toUpperCase()}${item.slice(1)}`}
								</Link>
							</BreadcrumbItem>
							{index !== breadcrumbValues.length - 1 ? (
								<BreadcrumbSeparator separator="/" />
							) : null}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
