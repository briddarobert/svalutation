"use client";
import { useState, useEffect } from "react";

const serverUrl = "http://localhost:8080";

export interface Student {
	Id?: number;
	Name: string;
	Surname: string;
	Class: string;
}

export interface Teacher {
	Id?: number;
	Name: string;
	Surname: string;
}

export interface Remark {
	Id?: number;
	Skill: number;
	Level: number;
	Description: string;
}

export interface Observation {
	Id?: number;
	Teacher: Teacher;
	Student: Student;
	Remark: Remark;
	Achieved: boolean;
}

const getStudent = (id: number) => {
	const [data, setData] = useState<Student>();

	useEffect(() => {
		fetch(serverUrl + "/api/students/" + id)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllStudents = () => {
	const [data, setData] = useState<Student[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/students")
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getRemark = (id: number) => {
	const [data, setData] = useState<Remark>();

	useEffect(() => {
		fetch(serverUrl + "/api/remarks/" + id)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllRemarks = () => {
	const [data, setData] = useState<Remark[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/remarks")
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const postRemark = (remark: Remark) => {
	const [data, setData] = useState<number>();

	useEffect(() => {
		fetch(serverUrl + "/api/remarks", {
			method: "POST",
			body: JSON.stringify(remark),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const patchRemark = (remark: Remark) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/remarks/" + remark.Id, {
			method: "PATCH",
			body: JSON.stringify(remark),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const deleteRemark = (id: number) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/remarks/" + id, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getObservation = (id: number) => {
	const [data, setData] = useState<Observation>();

	useEffect(() => {
		fetch(serverUrl + "/api/observations/" + id)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);
	return [data];
};

const getAllObservationsForStudent = (studentId: number) => {
	const [data, setData] = useState<Observation[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/observations/student/" + studentId)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const postObservation = (observation: Observation) => {
	const [data, setData] = useState<number>();

	useEffect(() => {
		fetch(serverUrl + "/api/observations", {
			method: "POST",
			body: JSON.stringify(observation),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const patchObservation = (observation: Observation) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/observations/" + observation.Id, {
			method: "PATCH",
			body: JSON.stringify(observation),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const deleteObservation = (id: number) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/observations/" + id, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

export {
	getStudent,
	getAllStudents,
	getRemark,
	getAllRemarks,
	postRemark,
	patchRemark,
	deleteRemark,
	getObservation,
	getAllObservationsForStudent,
	postObservation,
	patchObservation,
	deleteObservation,
};
