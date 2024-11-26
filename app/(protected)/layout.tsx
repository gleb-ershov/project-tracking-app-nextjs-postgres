import { Sidebar } from "@/components/common/Sidebar";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./_components/Header";
import { Searchbar } from "@/components/common/Searchbar";
import AuthProvider from "@/components/providers/AuthProvider";
import { getCurrentUser } from "@/utils/data-access/getCurrentUser";

export default async function ProtectedRoutesLayout({
	children,
	projectInfoModal,
	createProject,
}: {
	children: ReactNode;
	projectInfoModal: ReactNode;
	createProject: ReactNode;
}) {
	const currentUser = await getCurrentUser();

	let providerProps;
	if ("data" in currentUser) {
		const name = currentUser.data?.name as string;
		const surname = currentUser.data?.surname as string;
		providerProps = {
			currentUser: {
				id: currentUser.data?.id as string,
				name: `${name} ${surname}`,
				imageUrl: currentUser.data?.imageUrl as string,
			},
			isAuthenticated: Boolean(currentUser.data?.id),
		};
	} else {
		providerProps = {
			currentUser: {
				id: "",
				name: "",
				imageUrl: "",
			},
			isAuthenticated: false,
		};
	}

	return (
		<AuthProvider
			currentUser={providerProps.currentUser}
			isAuthenticated={providerProps.isAuthenticated}
		>
			<SidebarProvider>
				<div className="flex w-full">
					<Sidebar />
					<div className="flex flex-col flex-1 h-screen">
						<Header />
						<div className="md:hidden w-[90%] mx-auto mt-4">
							<Searchbar />
						</div>
						<main className="flex-1">
							{children}
							{projectInfoModal}
							{createProject}
						</main>
					</div>
				</div>
			</SidebarProvider>
		</AuthProvider>
	);
}
