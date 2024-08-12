const professionsApi = {
	getAllProfessions: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions"
		);
		return response.json();
	},
	createNewProfession: async (professionName, shortDesc) => {
		const newProfession = {
			professionName,
			shortDesc,
		};

		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProfession),
			}
		);

		return response.status === 200;
	},

	deleteProfession: async (professionNum) => {
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Professions?professionNum=${professionNum}`,
			{
				method: "DELETE",
			}
		);
		return response;
	},
};

export default professionsApi;
