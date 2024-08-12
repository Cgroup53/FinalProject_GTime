const proposalApi = {
	getAllProposals: async () => {
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals",
			{
				mode: "cors",
				cors: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
				},
				accept: "/",
			}
		);

		const data = await response.json();

		return data;
		// const response = await fetch(
		// 	"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals"
		// ).then(function (response) {
		// 	console.log("response", response);
		// });
	},

	approveProposal: async (proposal) => {
		proposal.status = true;
		console.log("JSON.stringify(proposal)", JSON.stringify(proposal));
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(proposal),
			}
		);

		return response;
	},

	denyProposal: async (proposal) => {
		proposal.status = false;
		console.log("JSON.stringify(proposal)", JSON.stringify(proposal));
		const response = await fetch(
			"https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(proposal),
			}
		);

		return response;
	},

	deleteProposal: async (proposal) => {
		const response = await fetch(
			`https://proj.ruppin.ac.il/cgroup53/test2/tar1/api/Proposals?proposalNum=${proposal.proposalNum}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(proposal),
			}
		);

		return response;
	},
};

export default proposalApi;
