const volunteersApi = {
	login: async (email, password) => {
		const dataObj = {
			email: email.trim(),
			password: password.trim(),
			name: "string",
			fname: "string",
			phone: "string",
			imageBase64: "string",
			volImage: "string",
		};
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataObj),
			}
		);

		return response;
	},
	register: async (userObj) => {
		userObj.status = true;

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/Register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObj),
			}
		);

		return response;
	},

	signUpForActivity: async (userObj, activity) => {
		userObj.activities = [activity];
		if (userObj.volImage == null) userObj.volImage = "string";
		if (userObj.imageBase64 == null) userObj.imageBase64 = "string";

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/VolAct",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userObj),
			}
		);

		return response;
	},

	updateUser: async (user) => {
		if (user.volImage == null) user.volImage = "string";
		if (user.imageBase64 == null) user.imageBase64 = "string";

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				// body: JSON.stringify(userObjectToUpdate),
				body: JSON.stringify(user),
			}
		);
		return response;
	},

	addProfession: async (user, profession) => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/VolAct",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(profession),
			}
		);
	},

	getVolunteer: async (user) => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/VolByEmail",
			{
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			}
		);

		if (response.status !== 200) return null;

		const data = await response.json();
		return data;
	},

	cancelActivity: async (user, activity) => {
		if (user.volImage == null) user.volImage = "string";
		if (user.imageBase64 == null) user.imageBase64 = "string";
		const requestObject = {
			actNum: activity.actNum,
			email: user.email,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers?actNum=${requestObject.actNum}&email=${requestObject.email}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response;
	},

	getAllVolunteers: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers"
		);
		const data = await response.json();
		return data;
	},

	addVolunteerProfession: async (user, profession) => {
		const userCopy = { ...user };
		userCopy.professions = profession;

		const sendObject = {
			email: user.email,
			profNum: profession,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/InsertProfToVol?email=${user.email}&profNum=${profession}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendObject),
			}
		);
		return response;
	},

	removeVolunteerProfession: async (user, profession) => {
		const sendObject = {
			email: user.email,
			profNum: profession,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/DeleteVolProf?email=${user.email}&profNum=${profession}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendObject),
			}
		);

		return response;
	},

	addVolunteerArea: async (user, area) => {
		const sendObject = {
			email: user.email,
			areaNum: area,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/InsertAreaToVol?email=${user.email}&areaNum=${area}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendObject),
			}
		);
		return response;
	},

	removeVolunteerArea: async (user, area) => {
		const sendObject = {
			email: user.email,
			areaNum: area,
		};
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Volunteers/DeleteVolArea?email=${user.email}&areaNum=${area}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendObject),
			}
		);
		return response;
	},
};

export default volunteersApi;
