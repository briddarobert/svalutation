"use client";
import { useEffect } from "react";
import { getStudentsByClass } from "./api";
import { getTeacher } from "./api";
import "./home.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home({ params }: { params: { classId: string } }) {
	sessionStorage.setItem("teacherId", "4"); // Temporary
	const router = useRouter();
	const classId = Number(params.classId);
	const [teacher] = getTeacher(Number(sessionStorage.getItem("teacherId")));
	const [students] = getStudentsByClass(classId);

	useEffect(() => {
		sessionStorage.setItem("students", JSON.stringify(students));
	}, [students]);
	useEffect(() => {
		sessionStorage.setItem("teacher", JSON.stringify(teacher));
	}, [teacher]);

	return (
		<>
			<h1>Pagina Home</h1>
			<div className="class-nav">
				<p
					onClick={() => {
						router.push(`/${classId - 1}`);
					}}
				>
					←
				</p>
				<p id="class-nav-info">
					{teacher && teacher.Classes[classId - 1].Name}
				</p>
				<p
					onClick={() => {
						router.push(`/${classId + 1}`);
					}}
				>
					→
				</p>
			</div>
			<ol className="students-list">
				{students &&
					students.map((student) => (
						<li key={student.Id}>
							<Link
								href={{
									pathname: `/${classId}/student/${student.Id}`,
								}}
								shallow={true}
							>
								{student.Name} {student.Surname}
							</Link>
						</li>
					))}
			</ol>
		</>
	);
}
