import activitiesApi from "../../api/activitiesAPI.js";
import { createActivityPanel } from "../ActivityPanel/activityPanel.js";

const container = document.getElementById("activityModal");

export const createActivityModal = async (activityNumber, container) => {
	container.innerHTML = "";
	const activities = await activitiesApi.getAllActivities();
	let activityObj = null;
	for (let i = 0; i < activities.length; i++) {
		if (parseInt(activities[i].actNum) === parseInt(activityNumber)) {
			activityObj = activities[i];
		}
	}
	if (!activityObj) return;
	const closeBtn = document.createElement("button");
	closeBtn.classList.add("closeBtn");
	closeBtn.innerText = "❌";
	closeBtn.addEventListener("click", () => {
		closeActivityModal(container);
	});
	container.appendChild(closeBtn);
	container.appendChild(await createActivityPanel(activityObj));
	container.style.visibility = "visible";
};

export const closeActivityModal = (container) => {
	container.style.visibility = "collapse";
};
