import activitiesApi from "../../api/activitiesAPI.js";
import volunteersAPI from "../../api/volunteersAPI.js";
import { getFittingVolunteers } from "../../logic/volunteersLogic.js";
import { closeActivityModal } from "../ActivityModal/activityModal.js";

export const createActivityPanel = async (selectedVolunteering) => {
	const volunteeringContentPanel = document.createElement("div");
	volunteeringContentPanel.classList.add("volunteeringContentPanel");
	volunteeringContentPanel.classList.add("shadow");

	// Header panel
	const headerContainer = document.createElement("div");
	headerContainer.classList.add("volunteeringHeaderContainer");

	// Title
	const title = document.createElement("h2");
	title.innerText = selectedVolunteering.actName;
	headerContainer.appendChild(title);

	// Buttons
	const buttonsContainer = document.createElement("div");
	const deleteBtn = document.createElement("button");
	deleteBtn.innerText = "מחק פעילות";
	deleteBtn.addEventListener("click", async () => {
		await activitiesApi.deleteActivity(selectedVolunteering);
		window.location.reload();
	});
	headerContainer.appendChild(deleteBtn);

	// Profession tags
	const professionTagsContainer = document.createElement("div");
	professionTagsContainer.classList.add("professionTagsContainer");
	for (let i = 0; i < selectedVolunteering.activitiesProfessions.length; i++) {
		const professionTag = document.createElement("div");
		// Profession name
		const professionName = document.createElement("label");
		professionName.innerText =
			selectedVolunteering.activitiesProfessions[i].professionName;
		professionTag.appendChild(professionName);
		// Profession Description
		const professionDescription = document.createElement("p");
		professionDescription.innerText =
			selectedVolunteering.activitiesProfessions[i].shortDesc;
		professionTag.appendChild(professionDescription);
		professionTag.classList.add("professionTag");
		professionTagsContainer.appendChild(professionTag);
	}

	if (selectedVolunteering.activitiesProfessions.length === 0) {
		const noProfessionTag = document.createElement("div");
		noProfessionTag.innerText = "לפעילות זו אין התמחות נדרשת :)";
		professionTagsContainer.appendChild(noProfessionTag);
	}

	// Details container
	const detailsContainer = document.createElement("div");
	detailsContainer.classList.add("volunteeringDetailsContainer");

	// Location
	const locationContainer = document.createElement("div");
	locationContainer.classList.add("detailsItem");
	const locationHeader = document.createElement("label");
	locationHeader.innerText = "מיקום:";
	locationContainer.appendChild(locationHeader);
	const location = document.createElement("label");
	location.innerText = selectedVolunteering.location;
	locationContainer.appendChild(location);
	detailsContainer.appendChild(locationContainer);

	// Date
	const dateInfoContainer = document.createElement("div");
	dateInfoContainer.classList.add("detailsItem");
	const dateHeder = document.createElement("label");
	dateHeder.innerText = "תאריך:";
	dateInfoContainer.appendChild(dateHeder);
	const date = document.createElement("label");
	date.innerText =
		new Date(selectedVolunteering.date).toLocaleDateString("he-IL") +
		" 🔹 " +
		new Date(selectedVolunteering.endHour)
			.toLocaleTimeString("he-IL")
			.split(":")[0] +
		":" +
		new Date(selectedVolunteering.endHour)
			.toLocaleTimeString("he-IL")
			.split(":")[1] +
		" - " +
		new Date(selectedVolunteering.startHour)
			.toLocaleTimeString("he-IL")
			.split(":")[0] +
		":" +
		new Date(selectedVolunteering.startHour)
			.toLocaleTimeString("he-IL")
			.split(":")[1];

	dateInfoContainer.appendChild(date);
	detailsContainer.appendChild(dateInfoContainer);

	// Volunteer status
	const volunteerStatusContainer = document.createElement("div");
	volunteerStatusContainer.classList.add("detailsItem");
	const volunteerStatusHeader = document.createElement("label");
	volunteerStatusHeader.innerText = "מתנדבים / מאוייש:";
	volunteerStatusContainer.appendChild(volunteerStatusHeader);
	const volunteerAmount = document.createElement("label");
	const manned = selectedVolunteering.status === true ? "מאוייש" : "לא מאוייש";
	volunteerAmount.innerText = selectedVolunteering.amount + " 🔹 " + manned;
	volunteerStatusContainer.appendChild(volunteerAmount);
	detailsContainer.appendChild(volunteerStatusContainer);

	// Description
	const descriptionContainer = document.createElement("div");
	const description = document.createElement("p");
	description.innerText = selectedVolunteering.shortDesc;
	descriptionContainer.appendChild(description);

	// Volunteers Info
	const volunteersInfoContainer = document.createElement("div");
	volunteersInfoContainer.classList.add("volunteersInfoContainer");
	const volunteersInfoHeader = document.createElement("h3");
	volunteersInfoHeader.innerText = "מתנדבים רשומים:";
	volunteersInfoContainer.appendChild(volunteersInfoHeader);
	const volunteersInfo = document.createElement("div");
	volunteersInfo.classList.add("volunteersInfoTable");
	volunteersInfoContainer.appendChild(volunteersInfo);
	selectedVolunteering.volunteerEmails.map(async (email) => {
		const volunteerDetails = await volunteersAPI.getVolunteerByEmail(email);

		const volunteerRow = document.createElement("div");
		volunteerRow.classList.add("volunteerRow");
		const volunteerName = document.createElement("h4");
		volunteerName.innerText =
			volunteerDetails.name + " " + volunteerDetails.fname;
		volunteerRow.appendChild(volunteerName);
		const volunteerEmail = document.createElement("p");
		volunteerEmail.innerText = volunteerDetails.email;
		volunteerRow.appendChild(volunteerEmail);
		const volunteerPhone = document.createElement("p");
		volunteerPhone.innerText = volunteerDetails.phone;
		volunteerRow.appendChild(volunteerPhone);
		volunteersInfo.appendChild(volunteerRow);
	});

	// List of suitable volunteers
	const potentialVolunteers = document.createElement("div");
	potentialVolunteers.classList.add("volunteersInfoContainer");
	volunteeringContentPanel.appendChild(potentialVolunteers);
	const potentialVolunteersHeader = document.createElement("h3");
	potentialVolunteersHeader.innerText = "מתנדבים מתאימים:";
	volunteersInfoContainer.appendChild(potentialVolunteersHeader);
	const potentialVolunteersInfo = document.createElement("div");
	potentialVolunteersInfo.classList.add("volunteersInfoTable");
	volunteersInfoContainer.appendChild(potentialVolunteersInfo);
	let suitableVolunteersList = await findVolunteersForActivity(
		selectedVolunteering
	);

	const alreadyVolunteering = selectedVolunteering.volunteerEmails;
	suitableVolunteersList = suitableVolunteersList.filter(
		(suitableVolunteer) =>
			!alreadyVolunteering.includes(suitableVolunteer.email)
	);

	suitableVolunteersList.map(async (suitableVolunteer) => {
		const suitableVolunteerRow = document.createElement("div");
		suitableVolunteerRow.classList.add("volunteerRow");
		const suitableVolunteerName = document.createElement("h4");
		suitableVolunteerName.innerText =
			suitableVolunteer.name + " " + suitableVolunteer.fname;
		suitableVolunteerRow.appendChild(suitableVolunteerName);
		const suitableVolunteerEmail = document.createElement("p");
		suitableVolunteerEmail.innerText = suitableVolunteer.email;
		suitableVolunteerRow.appendChild(suitableVolunteerEmail);
		const suitableVolunteerPhone = document.createElement("p");
		suitableVolunteerPhone.innerText = suitableVolunteer.phone;
		suitableVolunteerRow.appendChild(suitableVolunteerPhone);
		potentialVolunteersInfo.appendChild(suitableVolunteerRow);
	});

	volunteeringContentPanel.appendChild(headerContainer);
	volunteeringContentPanel.appendChild(detailsContainer);
	volunteeringContentPanel.appendChild(descriptionContainer);
	volunteeringContentPanel.appendChild(professionTagsContainer);
	// volunteeringContentPanel.appendChild(buttonsContainer);

	volunteeringContentPanel.appendChild(volunteersInfoContainer);

	return volunteeringContentPanel;
};

const findVolunteersForActivity = async (activity) => {
	const volunteers = await volunteersAPI.getAllVolunteers();
	const suitableVolunteers = await getFittingVolunteers(volunteers, activity);
	return suitableVolunteers;
	// if (suitableVolunteers.length === 0)
	// 	alert("לא נמצאו מתנדבים מתאימים לאיוש ההתנדבות");
	// else {
	// 	let messageText = `נמצאו ${suitableVolunteers.length} מתנדבים מתאימים לאיוש ההתנדבות: \n`;
	// 	for (let i = 0; i < suitableVolunteers.length; i++) {
	// 		messageText +=
	// 			suitableVolunteers[i].name + " " + suitableVolunteers[i].fname + "\n";
	// 	}
	// 	alert(messageText);
	// }
	// closeActivityModal();
};

// const volunteerFits = (volunteer, activity) => {
// 	// for (let volAct of volunteer.activities) {
// 	// 	if (volAct.actNum === activity.actNum) return false;
// 	// }
// 	if (!areaSuitable(activity.areaNum, volunteer.areas)) return false;
// 	if (!dateSuitable(activity.date, volunteer)) return false;
// 	if (!professionFits(activity.activitieProfessions, volunteer.professions))
// 		return false;
// 	return true;
// };

// const areaSuitable = (activityArea, volunteerAreas) => {
// 	for (let i = 0; i < volunteerAreas.length; i++) {
// 		if (volunteerAreas[i].areaNum === activityArea) return true;
// 	}
// 	return false;
// };

// const dateSuitable = (activityDate, volunteer) => {
// 	const activityWeekDay = new Date(activityDate).getDay();
// 	if (activityWeekDay === 0) return volunteer.sunday;
// 	if (activityWeekDay === 1) return volunteer.monday;
// 	if (activityWeekDay === 2) return volunteer.tuesday;
// 	if (activityWeekDay === 3) return volunteer.wednesday;
// 	if (activityWeekDay === 4) return volunteer.thursday;
// 	if (activityWeekDay === 5) return volunteer.friday;
// 	if (activityWeekDay === 6) return volunteer.saturday;
// };

// const professionFits = (activityProfessions, volunteerProfessions) => {
// 	for (let i = 0; i < volunteerProfessions.length; i++) {
// 		for (let j = 0; j < activityProfessions.length; j++) {
// 			if (
// 				activityProfessions[j].professionNum ===
// 				volunteerProfessions[i].professionNum
// 			)
// 				return true;
// 		}
// 	}
// 	return false;
// };
