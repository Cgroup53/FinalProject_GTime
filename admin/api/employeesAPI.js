const employeesApi = {
	geAllEmployees: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees"
		);
		const data = response.json();
		return data;
	},
	register: async (id, fname, lname, phone, email, password) => {
		const userObj = {
			employeeID: parseInt(id),
			fname,
			lname,
			phone,
			email,
			isAdmin: true,
			areaNum: 2,
			password,
		};

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees/Register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "/",
				},
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				body: JSON.stringify(userObj),
			}
		);

		// console.log("response", response);

		return response;
	},

	login: async (email, password) => {
		const requestObj = {
			employeeID: 0,
			fName: "",
			lName: "",
			phone: "",
			email: email,
			isAdmin: true,
			areaNum: 0,
			password: password,
		};
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees/Login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "/",
				},

				body: JSON.stringify(requestObj),
			}
		);

		return response;
	},

	update: async (user) => {
		const userObj = {
			employeeID: user.employeeID,
			fName: user.fName,
			lName: user.lName,
			phone: user.phone,
			email: user.email,
			isAdmin: user.isAdmin,
			areaNum: parseInt(user.areaNum),
			password: user.password,
		};

		console.log("userObj", userObj);
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Employees/Update",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				accept: "/",
				body: JSON.stringify(userObj),
			}
		);

		return response;
	},
};

export default employeesApi;
