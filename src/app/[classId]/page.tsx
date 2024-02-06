"use client";
import { useEffect, useState } from "react";
import { getStudentsByClass } from "./api";
import { getTeacher } from "./api";
import "./home.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home({ params }: { params: { classId: string } }) {
	const currentPath = usePathname();
	const classId = Number(params.classId);
	const [teacher] = getTeacher(4);
	const [classIndex, setClassIndex] = useState<number>(0);
	const [students] = getStudentsByClass(classId);
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		sessionStorage.setItem("teacherId", "4"); // Temporary
	}, [hasMounted]);

	useEffect(() => {
		if (hasMounted) {
			sessionStorage.setItem("students", JSON.stringify(students));
		}
	}, [students]);

	useEffect(() => {
		if (hasMounted && teacher) {
			sessionStorage.setItem("teacher", JSON.stringify(teacher));
			setClassIndex(
				teacher?.Classes.findIndex((classN) => classN.Id == classId)
			);
		}
	}, [teacher]);

	return (
		<>
			<h1>Studenti</h1>
			<div className="class-nav">
				<Link
					href={{
						pathname: `${(() => {
							if (teacher) {
								let splitPaths = currentPath.split("/");

								if (classIndex > 0)
									splitPaths[1] =
										teacher.Classes[
											classIndex - 1
										].Id.toString();
								else
									splitPaths[1] =
										teacher.Classes[
											teacher.Classes.length - 1
										].Id.toString();
								return splitPaths.join("/");
							} else return currentPath;
						})()}`,
					}}
				>
					←
				</Link>
				<p id="class-nav-info">
					{teacher && teacher.Classes[classIndex].Name}
				</p>
				<Link
					href={{
						pathname: `${(() => {
							if (teacher) {
								let splitPaths = currentPath.split("/");

								if (classIndex < teacher.Classes.length - 1)
									splitPaths[1] =
										teacher.Classes[
											classIndex + 1
										].Id.toString();
								else
									splitPaths[1] =
										teacher.Classes[0].Id.toString();
								return splitPaths.join("/");
							} else return currentPath;
						})()}`,
					}}
				>
					→
				</Link>
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
