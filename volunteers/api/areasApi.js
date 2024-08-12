const areasApi = {
	getAreas: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Areas"
		);
		const areas = await response.json();
		return areas;
	},
};

export default areasApi;
