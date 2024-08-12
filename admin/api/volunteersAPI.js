// volunteer:
// Get-  https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers
// Put-  https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers
// Post (register) - https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Register
// Post (login)- https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Login

const volunteersAPI = {
	getAllVolunteers: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers"
		);
		const data = await response.json();
		return data;
	},

	getVolunteerByEmail: async (email) => {
		const requestObject = {
			email,
			password: "string",
			name: "string",
			fname: "string",
			phone: "string",
			sign: "2024-07-06T18:35:38.185Z",
			sunday: true,
			monday: true,
			tuesday: true,
			wednesday: true,
			Thursday: true,
			friday: true,
			saturday: true,
			areas: [{ areaNum: 0, areaName: "string" }],
			professions: [
				{ professionNum: 0, professionName: "string", shortDesc: "string" },
			],
			activities: [
				{
					activitiesProfessions: [
						{ professionNum: 0, professionName: "string", shortDesc: "string" },
					],
					actNum: 0,
					actName: "string",
					shortDesc: "string",
					location: "string",
					date: "2024-07-06T18:35:38.185Z",
					startHour: "2024-07-06T18:35:38.185Z",
					endHour: "2024-07-06T18:35:38.185Z",
					amount: 0,
					areaNum: 0,
					employeeID: 0,
					status: true,
					volunteerEmails: ["string"],
				},
			],
			imageBase64: "string",
			volImage: "string",
			status: true,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/VolByEmail`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestObject),
			}
		);

		const data = await response.json();
		return data;
	},

	updateNonActiveVolunteer: async (volunteer) => {
		volunteer.status = false;
		if (
			volunteer.imageBase64 === null ||
			volunteer.imageBase64 === undefined ||
			volunteer.imageBase64 === ""
		) {
			volunteer.imageBase64 = "";
		}
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(volunteer),
			}
		);
		return response;
	},
};

export default volunteersAPI;
