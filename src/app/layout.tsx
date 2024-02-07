import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const serverUrl = "http://localhost:8080";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Svalutation",
	description: "",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	try {
		if (await fetch(serverUrl + "/status").then((res) => res.status == 204))
			return (
				<html lang="it">
					<body className={inter.className}>{children}</body>
				</html>
			);
		else return serverUnreachable();
	} catch (err) {
		return serverUnreachable();
	}
}

function serverUnreachable() {
	return (
		<html lang="it">
			<body className={inter.className}>
				<h1>No connection to server</h1>
			</body>
		</html>
	);
}
