const areasAPI = {
	getAllAreas: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Areas",
			{
				mode: "cors",
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				accept: "/",
			}
		);
		console.log("response", response);
		return response.json();
	},

	createNewArea: async (areaName) => {
		const newArea = {
			areaName,
		};

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Areas",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newArea),
			}
		);

		return response;
	},

	deleteArea: async (areaNum) => {
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Areas?areaNum=${areaNum}`,
			{
				method: "DELETE",
			}
		);

		return response;
	},
};
export default areasAPI;
