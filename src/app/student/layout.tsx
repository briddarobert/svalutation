"use client";
import "/src/app/globals.css";
import "/src/app/student/student-nav.css";
import { createContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStudent } from "../api";

export const StudentContext = createContext(0);

export default function StudentSelector({
	children,
}: {
	children: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	let studentId: number;

	if (searchParams.has("id")) {
		studentId = Number(searchParams.get("id"));
	} else {
		useEffect(() => {
			router.replace("/");
		}, []);
		return;
	}

	const [currentStudent] = getStudent(studentId);

	const changeStudent = (next: boolean) => {
		if (next) {
			alert("NextStudent");
		} else {
			alert("prev");
		}
	};

	return (
		<section>
			<StudentContext.Provider value={studentId}>
				<nav>
					<ol className='student-nav'>
						<li onClick={() => changeStudent(false)}>
							<img id='student-nav-arrow-left' src='/arrow-left.svg' />
						</li>
						<li id='student-nav-info'>
							<h2 id='student-nav-info-name'>
								{currentStudent && currentStudent.Name}{" "}
								{currentStudent && currentStudent.Surname}
							</h2>
							<h1 id='student-nav-info-class'>
								{currentStudent && currentStudent.Class}
							</h1>
						</li>
						<li onClick={() => changeStudent(true)}>
							<img id='student-nav-arrow-right' src='/arrow-right.svg' />
						</li>
					</ol>
				</nav>
				{children}
			</StudentContext.Provider>
		</section>
	);
}
