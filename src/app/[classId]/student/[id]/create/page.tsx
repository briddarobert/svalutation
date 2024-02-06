"use client";
import {
	ObservationPost,
	Remark,
	getAllRemarks,
	postObservation,
} from "@/app/[classId]/api";
import { remarkDialog } from "@/app/remark";
import { useEffect, useState } from "react";
import "./page.css";

export default function StudentCreatePage({
	params,
}: {
	params: { classId: string; id: string };
}) {
	const studentId = params.id;
	let [tempRemarks] = getAllRemarks();
	const [remarks, setRemarks] = useState<Remark[]>();
	const [selectedRemark, setSelectedRemark] = useState<Remark>();
	const [achieved, setAchieved] = useState<boolean>(true);

	useEffect(() => {
		setRemarks(tempRemarks);
	}, [tempRemarks]);

	return (
		<>
			<h1>Pagina Student Create</h1>
			<ol className="remarks-list">
				{remarks &&
					remarks.map((remark) => (
						<li
							key={remark.Id}
							onClick={() => {
								const listItem = document.getElementById(
									`${remark.Id}`
								) as HTMLInputElement;
								if (listItem) listItem.checked = true;
								setSelectedRemark(remark);
							}}
						>
							<label>
								<input
									type="radio"
									name="remark-selector"
									id={`${remark.Id}`}
								/>
								ID:{remark.Id} Skill:{remark.Skill} Level:
								{remark.Level} Description:
								{remark.Description}
							</label>
						</li>
					))}
			</ol>
			<label>
				Sì
				<input
					type="radio"
					name="achieved"
					defaultChecked={true}
					onChange={(e) => {
						if (e.target.checked) {
							setAchieved(true);
						}
					}}
				></input>
			</label>
			<label>
				No
				<input
					type="radio"
					name="achieved"
					onChange={(e) => {
						if (e.target.checked) {
							setAchieved(false);
						}
					}}
				></input>
			</label>
			<button
				onClick={() => {
					if (selectedRemark) {
						const newObservation: ObservationPost = {
							Teacher: Number(
								sessionStorage.getItem("teacherId")
							).toString(),
							Student: studentId,
							Remark: selectedRemark.Id.toString(),
							Achieved: achieved.toString(),
						};
						postObservation(newObservation);
					}
				}}
			>
				Inserisci osservazione
			</button>
			<hr />
			{remarkDialog(remarks, setRemarks)}
		</>
	);
}
