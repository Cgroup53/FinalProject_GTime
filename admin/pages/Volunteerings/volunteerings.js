import activitiesApi from "../../api/activitiesAPI.js";
import { createActivityPanel } from "../../components/ActivityPanel/activityPanel.js";
import createNewActivity from "../../components/CreateActivity/createActivity.js";

let selectedVolunteering = null;
let createEvent = false;

const sidebar = document.getElementById("volunteeringsSideBar");
const volunteeringContent = document.getElementById("volunteeringsContent");
const refreshSidebar = async () => {
	sidebar.innerHTML = "";
	const newEventRow = document.createElement("div");
	newEventRow.classList.add("activityRow");
	const activityTitle = document.createElement("h4");
	activityTitle.innerText = "צור התנדבות חדשה ➕";
	newEventRow.addEventListener("click", () => {
		createEvent = true;
		selectedVolunteering = null;
		showCreateEvent();
	});
	newEventRow.appendChild(activityTitle);
	sidebar.appendChild(newEventRow);

	const allActivities = await activitiesApi.getAllActivities();

	allActivities.map((activity, index) => {
		const activityRow = document.createElement("div");
		activityRow.classList.add("activityRow");

		const activityTitle = document.createElement("h4");
		activityTitle.innerText = activity.actName;
		activityRow.addEventListener("click", () => {
			selectedVolunteering = activity;
			showActivity();
		});
		activityRow.appendChild(activityTitle);
		sidebar.appendChild(activityRow);
	});
};

const showActivity = async () => {
	volunteeringContent.innerHTML = "";
	if (!selectedVolunteering) return null;
	volunteeringContent.appendChild(
		await createActivityPanel(selectedVolunteering)
	);
};

const clearVolunteeringContent = () => {
	volunteeringContent.innerHTML = "";
};

const showCreateEvent = async () => {
	volunteeringContent.innerHTML = "";

	volunteeringContent.appendChild(
		await createNewActivity(refreshSidebar, clearVolunteeringContent)
	);
};

refreshSidebar();
