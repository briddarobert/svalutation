"use client";
import {
	Observation,
	deleteObservation,
	getAllObservationsForStudent,
} from "@/app/[classId]/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./view.css";

export default function StudentViewPage({
	params,
}: {
	params: { classId: string; id: string; skillId: string };
}) {
	const currentPath = usePathname();
	const studentId = params.id;
	const skillId = params.skillId;
	const [tempObservations] = getAllObservationsForStudent(Number(studentId));
	const [observations, setObservations] = useState<Observation[]>();
	const [currentSkill, setCurrentSkill] = useState<number>();
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		setCurrentSkill(Number(skillId));
	}, [hasMounted]);

	useEffect(() => {
		setObservations(tempObservations);
	}, [tempObservations]);

	return (
		<>
			<h1>Guarda Osservazioni</h1>
			<div className="skill-nav">
				<Link
					href={{
						pathname: `${(() => {
							if (currentSkill != undefined) {
								let splitPaths = currentPath.split("/");

								if (currentSkill > 1)
									splitPaths[5] = (
										currentSkill - 1
									).toString();
								else splitPaths[5] = "4";
								return splitPaths.join("/");
							} else return "/";
						})()}`,
					}}
				>
					←
				</Link>
				<p id="class-nav-info">
					{currentSkill != undefined &&
						(() => {
							switch (currentSkill) {
								case 1:
									return "Comp1";
								case 2:
									return "Comp2";
								case 3:
									return "Comp3";
								case 4:
									return "Comp4";
								default:
									return "Not good";
							}
						})()}
				</p>
				<Link
					href={{
						pathname: `${(() => {
							if (currentSkill != undefined) {
								let splitPaths = currentPath.split("/");

								if (currentSkill < 4)
									splitPaths[5] = (
										currentSkill + 1
									).toString();
								else splitPaths[5] = "1";

								return splitPaths.join("/");
							} else return "/";
						})()}`,
					}}
				>
					→
				</Link>
			</div>
			<table>
				<thead>
					<tr>
						<th>Livello</th>
						<th>Descrizione</th>
						<th>Raggiunto</th>
					</tr>
				</thead>
				{observations &&
					observations.map((observation) => {
						if (observation.Remark.Skill == currentSkill)
							return (
								<tbody>
									<tr key={observation.Id}>
										<td>{observation.Remark.Level}</td>
										<td>
											{observation.Remark.Description}
										</td>
										<td>
											{observation.Achieved ? "Si" : "No"}
										</td>
										<td>
											<button
												onClick={() => {
													deleteObservation(
														observation.Id
													);
													let filteredObservations =
														observations.filter(
															(obs) =>
																obs.Id !==
																observation.Id
														);
													setObservations(
														filteredObservations
													);
												}}
											>
												Rimuovi osservazione
											</button>
										</td>
									</tr>
								</tbody>
							);
					})}
			</table>
		</>
	);
}
