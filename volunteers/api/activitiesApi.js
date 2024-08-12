const activitiesApi = {
	getActivities: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Activities"
		);
		let data = await response.json();
		data = data.filter((activity) => activity.isDone === false);
		return data;
	},
};
export default activitiesApi;
