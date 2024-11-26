import type { Metadata } from "next";
import "./globals.css";

import { Quicksand } from "next/font/google";

const font = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TrelloClone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.className} antialiased`}>{children}</body>
		</html>
	);
}
