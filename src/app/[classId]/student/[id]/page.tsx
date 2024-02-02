"use client";
import Link from "next/link";

export default function StudentActionSelectPage({
	params,
}: {
	params: { classId: string; id: string };
}) {
	const currentPath = window.location.pathname;
	const studentId = params.id;

	return (
		<>
			<p>
				<Link
					href={{
						pathname: `${(() => {
							let splitPaths = currentPath.split("/");
							splitPaths[3] = studentId;
							splitPaths.push("view");
							return splitPaths.join("/");
						})()}`,
					}}
					shallow={true}>
					Guarda Osservazioni
				</Link>
			</p>
			<p>
				<Link
					href={{
						pathname: `${(() => {
							let splitPaths = currentPath.split("/");
							splitPaths[3] = studentId;
							splitPaths.push("create");
							return splitPaths.join("/");
						})()}`,
					}}
					shallow={true}>
					Fai Osservazione
				</Link>
			</p>
		</>
	);
}
