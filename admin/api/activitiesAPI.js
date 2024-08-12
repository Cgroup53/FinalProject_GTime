const activitiesApi = {
	getAllActivities: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities"
		);
		let data = await response.json();

		data = data.filter((activity) => activity.isDone === false);
		return data;
	},
	createAnActivity: async (
		activitiesProfessions,
		actName,
		shortDesc,
		location,
		date,
		startHour,
		endHour,
		amount,
		areaNum,
		employeeID
	) => {
		const activity = {
			activitiesProfessions: activitiesProfessions,
			actNum: 0,
			actName,
			shortDesc,
			location,
			date: new Date(date),
			startHour: new Date(startHour),
			endHour: new Date(endHour),
			amount,
			areaNum,
			employeeID,
			status: false,
		};

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(activity),
			}
		);

		return response;
	},

	deleteActivity: async (activity) => {
		activity.isDone = true;
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities/Update`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(activity),
			}
		);
		return response;
	},
};

export default activitiesApi;
