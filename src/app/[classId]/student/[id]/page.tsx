"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function StudentActionSelectPage({
	params,
}: {
	params: { classId: string; id: string };
}) {
	const currentPath = usePathname();
	const studentId = params.id;

	return (
		<ol className="maximized-list">
			<li>
				<Link
					href={{
						pathname: `${(() => {
							let splitPaths = currentPath.split("/");
							splitPaths[3] = studentId;
							splitPaths.push("view/1");
							return splitPaths.join("/");
						})()}`,
					}}
					shallow={true}
				>
					Guarda Osservazioni
				</Link>
			</li>
			<li>
				<Link
					href={{
						pathname: `${(() => {
							let splitPaths = currentPath.split("/");
							splitPaths[3] = studentId;
							splitPaths.push("create/useless");
							return splitPaths.join("/");
						})()}`,
					}}
					shallow={true}
				>
					Fai Osservazione
				</Link>
			</li>
		</ol>
	);
}
