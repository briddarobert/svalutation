"use client";
import "/src/app/globals.css";
import "./student-nav.css";
import { getStudent } from "../../api";
import Link from "next/link";

export default function StudentSelector({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const currentPath = window.location.pathname;
	let studentId: number = Number(params.id);
	let [currentStudent] = getStudent(studentId);

	return (
		<>
			<section>
				<nav>
					<ol className='student-nav'>
						<li id='student-nav-arrow-left'>
							<Link
								href={{
									pathname: `${(() => {
										let splitPaths = currentPath.split("/");
										splitPaths[3] = (studentId - 1).toString();
										return splitPaths.join("/");
									})()}`,
								}}>
								🠜
							</Link>
						</li>
						<li id='student-nav-info'>
							<h2 id='student-nav-info-name'>
								{currentStudent && currentStudent.Name}{" "}
								{currentStudent && currentStudent.Surname}
							</h2>
							<h1 id='student-nav-info-class'>
								{currentStudent && currentStudent.Class.Name}
							</h1>
						</li>
						<li id='student-nav-arrow-right'>
							<Link
								href={{
									pathname: `${(() => {
										let splitPaths = currentPath.split("/");
										splitPaths[3] = (studentId + 1).toString();
										return splitPaths.join("/");
									})()}`,
								}}>
								🠞
							</Link>
						</li>
					</ol>
				</nav>
				{children}
			</section>
		</>
	);
}
