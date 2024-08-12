const proposalsApi = {
	getProposals: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals"
		);
		const data = await response.json();
		return data;
	},

	createProposal: async (proposalObj) => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(proposalObj),
			}
		);
		return response;
	},
};
export default proposalsApi;
