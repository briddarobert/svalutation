"use client";
import { getAllObservationsForStudent } from "@/app/api";
import { useContext } from "react";
import { StudentContext } from "../layout";

export default function StudentViewPage() {
	const [observations] = getAllObservationsForStudent(
		useContext(StudentContext)
	);

	return (
		<>
			<h1>Pagina Student View</h1>
			{observations &&
				observations.map((observation) => {
					return (
						<p key={observation.Id}>
							ID:{observation.Id} Level:{observation.Remark.Level} Description:
							{observation.Remark.Description} Achieved:
							{observation.Achieved ? "Sì" : "No"}
						</p>
					);
				})}
		</>
	);
}
