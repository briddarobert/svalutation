"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Remark, RemarkPost, postRemark } from "./[classId]/api";

export function remarkDialog(
	remarks: Remark[] | undefined,
	setRemarks: Dispatch<SetStateAction<Remark[] | undefined>>
) {
	const [skill, setSkill] = useState<string>("0");
	const [level, setLevel] = useState<string>("1");
	const [description, setDescription] = useState<string>("");

	return (
		<>
			<dialog>
				<div>
					<label>
						Selezionare competenza
						<select
							name="skill"
							onChange={(e) => {
								setSkill(e.target.value);
							}}
						>
							<option value="1">Comp1</option>
							<option value="2">Comp2</option>
							<option value="3">Comp3</option>
							<option value="4">Comp4</option>
						</select>
					</label>
					<label>
						Selezionare Livello
						<select
							name="level"
							onChange={(e) => {
								setLevel(e.target.value);
							}}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</label>
					<label>
						Inserire descrizione
						<input
							type="text"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						></input>
					</label>
					<button
						autoFocus
						onClick={async () => {
							const newRemarkPost: RemarkPost = {
								Skill: skill,
								Level: level,
								Description: description,
							};
							const id = await postRemark(newRemarkPost);

							const newRemarkView: Remark = {
								Id: id,
								Skill: Number(skill),
								Level: Number(level),
								Description: description,
							};
							setRemarks(remarks?.concat(newRemarkView));
						}}
					>
						Crea Remark
					</button>
				</div>

				<button
					autoFocus
					onClick={() => {
						document.querySelector("dialog")?.close();
					}}
				>
					Chiudi
				</button>
			</dialog>
			<button
				onClick={() => {
					document.querySelector("dialog")?.showModal();
				}}
			>
				Aggiungi remark
			</button>
		</>
	);
}
