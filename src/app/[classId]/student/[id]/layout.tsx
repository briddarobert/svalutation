"use client";
import "/src/app/globals.css";
import "./student-nav.css";
import { Student, getStudent } from "../../api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function StudentSelector({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const router = useRouter();
	const currentPath = usePathname();
	const [hasMounted, setHasMounted] = useState<boolean>(false);
	let studentId: number = Number(params.id);
	let [currentStudent] = getStudent(studentId);
	const [students, setStudents] = useState<Student[]>();
	const [currentIndex, setCurrentIndex] = useState<number>();

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		setStudents(JSON.parse(sessionStorage.getItem("students") ?? ""));
	}, [hasMounted]);

	useEffect(() => {
		if (students)
			setCurrentIndex(
				students.findIndex((student) => student.Id == studentId)
			);
	}, [students]);

	return (
		<>
			<section>
				<Link href={"../"} style={{ fontSize: "xxx-large" }}>
					&times;
				</Link>
				<nav className="student-nav">
					<span id="student-nav-arrow-left">
						<Link
							href={{
								pathname: `${(() => {
									if (students && currentIndex != undefined) {
										let splitPaths = currentPath.split("/");

										if (currentIndex > 0)
											splitPaths[3] =
												students[
													currentIndex - 1
												].Id.toString();
										else
											splitPaths[3] =
												students[
													students.length - 1
												].Id.toString();

										return splitPaths.join("/");
									}
								})()}`,
							}}
						>
							<Image
								src="/arrow-left.svg"
								alt="Go left"
								height={80}
								width={80}
							/>
						</Link>
					</span>
					<span id="student-nav-info">
						<h2 id="student-nav-info-name">
							{currentStudent && currentStudent.Name}{" "}
							{currentStudent && currentStudent.Surname}
						</h2>
						<h1 id="student-nav-info-class">
							{currentStudent && currentStudent.Class.Name}
						</h1>
					</span>
					<span id="student-nav-arrow-right">
						<Link
							href={{
								pathname: `${(() => {
									if (students && currentIndex != undefined) {
										let splitPaths = currentPath.split("/");
										if (currentIndex < students.length - 1)
											splitPaths[3] =
												students[
													currentIndex + 1
												].Id.toString();
										else
											splitPaths[3] =
												students[0].Id.toString();

										return splitPaths.join("/");
									}
								})()}`,
							}}
						>
							<Image
								src="/arrow-right.svg"
								alt="Go right"
								height={80}
								width={80}
							/>
						</Link>
					</span>
				</nav>
				{children}
			</section>
		</>
	);
}
