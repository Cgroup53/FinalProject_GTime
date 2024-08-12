import volunteersAPI from "../../api/volunteersAPI.js";
import activitiesAPI from "../../api/activitiesAPI.js";
import {
	addCalendarEvent,
	clearCalendarEvents,
	refreshActivitiesTimetableView,
} from "../../components/ActivityViewerPanel.js";
import createNewActivity from "../../components/CreateActivity/createActivity.js";
import smartComponent from "../../logic/smartElement.js";
import { showActivityModal } from "../../components/ShowActivityModal/ShowActivityModal.js";

let volunteersData = [];
let activitiesData = [];
let hospitalsData = [];
let selectedDate = new Date();

const showNewEventModal = async () => {
	newEventModal.innerHTML = "";
	newEventModal.style.visibility = "visible";
	const closeBtn = document.createElement("button");
	closeBtn.classList.add("closeBtn");
	closeBtn.innerText = "✖️";
	closeBtn.addEventListener("click", closeNewActivityModal);
	newEventModal.appendChild(closeBtn);
	newEventModal.appendChild(
		await createNewActivity(refreshActivitiesViewer, closeNewActivityModal)
	);
};

const createNewEventButton = document.getElementById("createNewEventButton");
createNewEventButton.addEventListener("click", showNewEventModal);
// if (createNewEventButton) {
// }

const newEventModal = document.getElementById("createActivityModal");

export const closeNewActivityModal = () => {
	newEventModal.style.visibility = "collapse";
};

export const closeModal = () => {
	if (newEventModal) newEventModal.style.visibility = "collapse";
};

const refreshVolunteersData = async () => {
	volunteersData = await volunteersAPI.getAllVolunteers();
};

export const refreshActivitiesData = async () => {
	activitiesData = await activitiesAPI.getAllActivities();
	if (!activitiesData) return;
	activitiesData.forEach((activity, index) => {
		const isManned = activity.status ? "מאויישת" : "לא מאויישת";
		const activityText =
			activity.actName +
			" - " +
			activity.shortDesc +
			", (" +
			activity.amount +
			") " +
			isManned;

		addCalendarEvent(
			activity.actNum,
			activityText,
			activity.startHour,
			activity.endHour,
			activity.date
		);
	});
};

export const setSelectedDate = (newSelectedDate) => {
	selectedDate = newSelectedDate;
};

export const refreshActivitiesViewer = () => {
	clearCalendarEvents();
	refreshActivitiesData();
};

const smartAlert = document.getElementById("smartAlert");

const showVolunteers = (data) => {
	showActivityModal(data);
};

const showSmartAlert = (data) => {
	data = data.filter((dataItem) => dataItem !== undefined);
	smartAlert.style.visibility = "visible";
	smartAlert.classList.add("shadow");
	const smartAlertHeader = document.createElement("div");
	smartAlertHeader.classList.add("smartAlertHeader");
	const smartAlertHeaderTitle = document.createElement("h4");
	smartAlertHeaderTitle.innerText =
		"לתשומת לבך, ישנן התנדבויות לא מאוישות המתקיימות מחר";
	const smartAlertCloseBtn = document.createElement("button");
	smartAlertCloseBtn.id = "smartAlertCloseBtn";
	smartAlertCloseBtn.innerText = "סגור";
	smartAlertCloseBtn.addEventListener("click", () => {
		smartAlert.style.visibility = "collapse";
	});
	smartAlertHeader.appendChild(smartAlertHeaderTitle);
	smartAlertHeader.appendChild(smartAlertCloseBtn);
	smartAlert.appendChild(smartAlertHeader);

	data.forEach((dataItem) => {
		const smartAlertItem = document.createElement("div");
		smartAlertItem.classList.add("smartAlertItem");
		const activityNameLabel = document.createElement("label");
		activityNameLabel.innerText = dataItem.activity.actName;
		const amountLabel = document.createElement("label");
		amountLabel.innerText = `כמות מתנדבים נחוצה: ${dataItem.activity.amount}`;
		const volunteersAmountLabel = document.createElement("label");
		volunteersAmountLabel.innerText = `נשלחה התראה ל ${dataItem.volunteers.length} מתנדבים`;
		const button = document.createElement("button");
		button.value = JSON.stringify(dataItem.activity);
		button.id = "smartAlertItemBtn";
		button.innerText = "צפייה";
		button.addEventListener("click", () => {
			showVolunteers(dataItem);
		});
		smartAlertItem.appendChild(activityNameLabel);
		smartAlertItem.appendChild(amountLabel);
		smartAlertItem.appendChild(volunteersAmountLabel);
		smartAlertItem.appendChild(button);
		smartAlert.appendChild(smartAlertItem);
	});

	// const smartAlertCloseBtn = document.getElementById("smartAlertCloseBtn");
	// smartAlertCloseBtn.addEventListener("click", () => {
	// 	smartAlert.style.visibility = "collapse";
	// });
};

refreshActivitiesData();
refreshVolunteersData();
document.addEventListener("DOMContentLoaded", async function () {
	const smartResult = await smartComponent.checkForNearActivity();
	if (smartResult.activitiesFound) {
		showSmartAlert(smartResult.smartFilter);
	} else {
		smartAlert.style.visibility = "collapse";
	}
});

const checkInactiveVolunteers = async () => {
	const volunteers = await volunteersAPI.getAllVolunteers();

	volunteers.forEach(async (volunteer) => {
		const volunteerActivities = volunteer.activities;
		const halfAYearAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000); // 6 months in milliseconds
		if (volunteerActivities.length === 0) {
			if (new Date(volunteer.sign) <= halfAYearAgo) {
				if (volunteer.status)
					await volunteersAPI.updateNonActiveVolunteer(volunteer);
			}
			return;
		}
		const mostRecentActivity = volunteerActivities.reduce(
			(prev, current) =>
				new Date(current.date) > new Date(prev.date) ? current : prev,
			volunteerActivities[0]
		);
		const mostRecentActivityDate = new Date(mostRecentActivity.date);
		if (
			new Date(volunteer.sign) <= new Date(halfAYearAgo) &&
			new Date(mostRecentActivityDate) <= new Date(halfAYearAgo)
		) {
			if (volunteer.status)
				await volunteersAPI.updateNonActiveVolunteer(volunteer);
			// console.log("volunteer", volunteer);
		}
	});
};

checkInactiveVolunteers();
