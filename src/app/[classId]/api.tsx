"use client";
import { useState, useEffect } from "react";

export const serverUrl = "http://localhost:8080";
export const userName = "prof";
export const password = "uaupassword1233";
const auth = Buffer.from(`${userName}:${password}`).toString("base64");

export interface Student {
	Id: number;
	Name: string;
	Surname: string;
	Class: Class;
}

export interface Teacher {
	Id: number;
	Name: string;
	Surname: string;
	Classes: Class[];
}

export interface Remark {
	Id: number;
	Skill: number;
	Level: number;
	Description: string;
}

export interface Observation {
	Id: number;
	Teacher: Teacher;
	Student: Student;
	Remark: Remark;
	Achieved: boolean;
}

export interface ObservationPost {
	Id?: number;
	Teacher: string;
	Student: string;
	Remark: string;
	Achieved: string;
}

export interface Class {
	Id: number;
	Name: string;
}

const getStudent = (id: number) => {
	const [data, setData] = useState<Student>();

	useEffect(() => {
		fetch(serverUrl + "/api/students/" + id, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllStudents = () => {
	const [data, setData] = useState<Student[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/students", {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getStudentsByClass = (classId: number) => {
	const [data, setData] = useState<Student[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/students/class/" + classId, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, [classId]);

	return [data];
};

const getTeacher = (id: number) => {
	const [data, setData] = useState<Teacher>();

	useEffect(() => {
		fetch(serverUrl + "/api/teachers/" + id, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getRemark = (id: number) => {
	const [data, setData] = useState<Remark>();

	useEffect(() => {
		fetch(serverUrl + "/api/remarks/" + id, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllRemarks = () => {
	const [data, setData] = useState<Remark[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/remarks", {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const postRemark = (remark: Remark) => {
	fetch(serverUrl + "/api/remarks", {
		method: "POST",
		body: JSON.stringify(remark),
		headers: {
			"Content-type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${auth}`,
		},
	}).then((res) => res.json());
};

const patchRemark = (remark: Remark) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/remarks/" + remark.Id, {
			method: "PATCH",
			body: JSON.stringify(remark),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${auth}`,
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
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getObservation = (id: number) => {
	const [data, setData] = useState<Observation>();

	useEffect(() => {
		fetch(serverUrl + "/api/observations/" + id, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllObservationsForStudent = (studentId: number) => {
	const [data, setData] = useState<Observation[]>();

	useEffect(() => {
		fetch(serverUrl + "/api/observations/student/" + studentId, {
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const getAllObservationsByTeacherOnStudent = (
	teacherId: number,
	studentId: number,
) => {
	const [data, setData] = useState<Observation[]>();

	useEffect(() => {
		fetch(
			serverUrl +
				"/api/observations/teacher/student/" +
				teacherId +
				"/" +
				studentId,
			{
				headers: {
					Authorization: `Basic ${auth}`,
				},
			},
		)
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

const postObservation = (observation: ObservationPost) => {
	var data = new URLSearchParams();
	data.append("teacher", observation.Teacher);
	data.append("student", observation.Student);
	data.append("remark", observation.Remark);
	data.append("achieved", observation.Achieved);

	fetch(serverUrl + "/api/observations", {
		method: "POST",
		body: data,
		headers: {
			"Content-type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${auth}`,
		},
	}).then((res) => res.json());
};

const patchObservation = (observation: Observation) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(serverUrl + "/api/observations/" + observation.Id, {
			method: "PATCH",
			body: JSON.stringify(observation),
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${auth}`,
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
			headers: {
				Authorization: `Basic ${auth}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return [data];
};

export {
	getStudent,
	getAllStudents,
	getStudentsByClass,
	getTeacher,
	getRemark,
	getAllRemarks,
	postRemark,
	patchRemark,
	deleteRemark,
	getObservation,
	getAllObservationsForStudent,
	getAllObservationsByTeacherOnStudent,
	postObservation,
	patchObservation,
	deleteObservation,
};
