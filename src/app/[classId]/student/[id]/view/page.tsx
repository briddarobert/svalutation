"use client";
import { getAllObservationsForStudent } from "@/app/[classId]/api";

export default function StudentViewPage({
	params,
}: {
	params: { classId: string; id: string };
}) {
	const studentId = params.id;
	const [observations] = getAllObservationsForStudent(Number(studentId));

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
