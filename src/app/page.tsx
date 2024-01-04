"use client";
import { getAllStudents } from "./api";
import Link from "next/link";

export default function Home() {
	const [students] = getAllStudents();

	return (
		<>
			<h1>Pagina Home</h1>
			<ol>
				{students &&
					students.map((student) => (
						<li key={student.Id}>
							<Link
								href={{ pathname: "/student", query: { id: student.Id } }}
								shallow={true}>
								{student.Name} {student.Surname}
							</Link>
						</li>
					))}
			</ol>
		</>
	);
}
