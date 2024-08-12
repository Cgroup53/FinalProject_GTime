const professionsApi = {
	getProfessions: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions"
		);
		const professions = await response.json();
		return professions;
	},
};

export default professionsApi;
