"use client";
import Link from "next/link";
import { useContext } from "react";
import { StudentContext } from "./layout";

export default function StudentActionSelectPage() {
	const studentId = useContext(StudentContext);

	return (
		<>
			<p>
				<Link
					href={{
						pathname: "/student/view",
						query: { id: studentId?.toString() },
					}}
					shallow={true}>
					Guarda Osservazioni
				</Link>
			</p>
			<p>
				<Link
					href={{
						pathname: "/student/create",
						query: { id: studentId?.toString() },
					}}
					shallow={true}>
					Fai Osservazione
				</Link>
			</p>
		</>
	);
}
