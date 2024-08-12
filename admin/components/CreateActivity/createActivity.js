import activitiesApi from "../../api/activitiesAPI.js";
import areasAPI from "../../api/areasAPI.js";
import professionsApi from "../../api/professionsAPI.js";
import { dataStore } from "../../dataStore.js";

const selectedProfessionsContainer = document.createElement("div");
const selectedProfessionsArr = [];
const createNewActivity = async (submitAction, closeAction) => {
	// const volunteeringContent = document.createElement("div");
	// if (!createEvent) return;

	const volunteeringContentPanel = document.createElement("div");
	volunteeringContentPanel.classList.add("createActivityPanel");
	volunteeringContentPanel.classList.add("shadow");

	// Header
	const headerContainer = document.createElement("div");
	headerContainer.classList.add("volunteeringHeaderContainer");
	const title = document.createElement("h2");
	title.innerText = "צור התנדבות חדשה";
	headerContainer.appendChild(title);
	volunteeringContentPanel.appendChild(headerContainer);

	// Form
	const formContainer = document.createElement("div");
	formContainer.classList.add("newActivityFormContainer");

	// Event name
	const nameLbl = document.createElement("label");
	nameLbl.innerText = "שם התנדבות:";
	const nameInput = document.createElement("input");
	formContainer.appendChild(nameLbl);
	formContainer.appendChild(nameInput);

	// Event date
	const dateLbl = document.createElement("label");
	dateLbl.innerText = "תאריך:";
	const dateInput = document.createElement("input");
	dateInput.type = "date";
	formContainer.appendChild(dateLbl);
	formContainer.appendChild(dateInput);

	// Event time
	const startLbl = document.createElement("label");
	startLbl.innerText = "שעת התחלה: ";
	formContainer.appendChild(startLbl);
	const startInput = document.createElement("input");
	startInput.type = "time";
	formContainer.appendChild(startInput);
	const endLbl = document.createElement("label");
	endLbl.innerText = "שעת סיום: ";
	formContainer.appendChild(endLbl);
	const endInput = document.createElement("input");
	endInput.type = "time";
	formContainer.appendChild(endInput);

	// Area
	const areaLbl = document.createElement("label");
	areaLbl.innerText = "איזור:";
	formContainer.appendChild(areaLbl);
	const areaInput = document.createElement("select");
	const allAreas = await areasAPI.getAllAreas();
	allAreas.map((area) => {
		const option = document.createElement("option");
		option.value = `${area.areaNum} - ${area.areaName}`;
		option.innerText = area.areaName;
		areaInput.appendChild(option);
	});

	formContainer.appendChild(areaInput);

	// Show selected professions
	// selectedProfessionsContainer = document.createElement("div");
	selectedProfessionsContainer.classList.add("selectedProfessionsContainer");
	// Professions:
	const professionLbl = document.createElement("label");
	professionLbl.innerText = "התמחויות:";
	formContainer.appendChild(professionLbl);
	const professionInput = document.createElement("select");
	const allProfessions = await professionsApi.getAllProfessions();
	professionInput.addEventListener("change", () => {
		selectedProfessionsArr.push({
			professionNum: professionInput.value,
			professionName:
				professionInput.options[professionInput.selectedIndex].text,
			shortDesc: "string",
		});
		refreshProfessionTags();
		// selectedProfessionsContainer.innerHTML = "";
		// selectedProfessionsArr.map((profession) => {
		// 	const professionSpan = document.createElement("span");
		// 	professionSpan.innerText = profession.professionName;
		// 	professionSpan.classList.add("professionTag");
		// 	professionSpan.onmouseenter = () => {
		// 		professionSpan.innerText = "x";
		// 	};
		// 	professionSpan.onmouseleave = () => {
		// 		professionSpan.innerText = profession.professionName;
		// 	};

		// 	professionSpan.addEventListener("click", () => {
		// 		selectedProfessionsArr.splice(
		// 			selectedProfessionsArr.indexOf(profession),
		// 			1
		// 		);
		// 		// refreshSelectedProfessions();
		// 	});
		// 	selectedProfessionsContainer.appendChild(professionSpan);
		// });
	});
	const choiceOption = document.createElement("option");
	choiceOption.value = "";
	choiceOption.innerText = "בחר";
	professionInput.appendChild(choiceOption);
	allProfessions.map((profession) => {
		const option = document.createElement("option");
		option.value = profession.professionNum;
		option.innerText =
			profession.professionName + " (" + profession.shortDesc + ")";
		professionInput.appendChild(option);
	});
	formContainer.appendChild(professionInput);

	// // Hospital
	// const hospitalLbl = document.createElement("label");
	// hospitalLbl.innerText = "בית חולים:";
	// formContainer.appendChild(hospitalLbl);
	// const hospitalSelect = document.createElement("select");
	// dataStore.getData().hospitals.map((hospital, index) => {
	// 	const option = document.createElement("option");
	// 	option.value = hospital.id;
	// 	option.innerText = hospital.name;
	// 	hospitalSelect.appendChild(option);
	// });
	// formContainer.appendChild(hospitalSelect);

	// Event notes
	const notesLbl = document.createElement("label");
	notesLbl.innerText = "תיאור:";
	formContainer.appendChild(notesLbl);
	const descriptionInput = document.createElement("textarea");
	formContainer.appendChild(descriptionInput);

	// Volunteers number
	const volunteersLbl = document.createElement("label");
	volunteersLbl.innerText = "מספר מתנדבים:";
	formContainer.appendChild(volunteersLbl);
	const volunteersNumberInput = document.createElement("input");
	formContainer.appendChild(volunteersNumberInput);

	volunteeringContentPanel.append(formContainer);
	volunteeringContentPanel.append(selectedProfessionsContainer);

	// Submit
	const submitBtn = document.createElement("button");
	submitBtn.classList.add("submitBtn");
	submitBtn.innerText = "צור התנדבות";
	submitBtn.addEventListener("click", async () => {
		const professionsToSend = [];
		for (let profession of selectedProfessionsArr) {
			professionsToSend.push(profession);
		}
		const actName = nameInput.value;
		const shortDesc = descriptionInput.value;
		const date = createDate(dateInput.value, "00:00");
		const startHour = createDate(dateInput.value, startInput.value);
		const endHour = createDate(dateInput.value, endInput.value);
		const amount = volunteersNumberInput.value;
		const areaNum = areaInput.value.split(" - ")[0];
		const location = areaInput.value.split(" - ")[1];
		const employeeID = dataStore.getData().employeeID;
		if (
			!fieldsVerified(
				actName,
				shortDesc,
				location,
				date,
				startHour,
				endHour,
				amount,
				areaNum,
				employeeID,
				professionsToSend
			)
		)
			return;

		const result = await activitiesApi.createAnActivity(
			professionsToSend,
			actName,
			shortDesc,
			location,
			date,
			startHour,
			endHour,
			amount,
			areaNum,
			employeeID
		);
		if (result.status === 200) {
			alert("ההתנדבות נוצרה בהצלחה");
			window.location.reload();
		} else alert("ההתנדבות לא נוצרה");

		submitAction();
		closeAction();
	});

	volunteeringContentPanel.appendChild(submitBtn);
	return volunteeringContentPanel;
	// volunteeringContentPanel.appendChild

	// volunteeringContent.appendChild(volunteeringContentPanel);
	// volunteeringContent.appendChild(selectedProfessionsContainer);
};

const refreshProfessionTags = () => {
	selectedProfessionsContainer.innerHTML = "";
	selectedProfessionsArr.map((profession) => {
		const professionSpan = document.createElement("span");
		professionSpan.innerText = profession.professionName;
		professionSpan.classList.add("professionTag");
		professionSpan.onmouseenter = () => {
			professionSpan.innerText = "x";
		};
		professionSpan.onmouseleave = () => {
			professionSpan.innerText = profession.professionName;
		};

		professionSpan.addEventListener("click", () => {
			selectedProfessionsArr.splice(
				selectedProfessionsArr.indexOf(profession),
				1
			);
			refreshProfessionTags();
			// refreshSelectedProfessions();
		});
		selectedProfessionsContainer.appendChild(professionSpan);
	});
};

const fieldsVerified = (
	actName,
	shortDesc,
	location,
	date,
	startHour,
	endHour,
	amount,
	areaNum,
	employeeID,
	professions
) => {
	if (!actName || actName === "") {
		alert("שם התנדבות לא יכול להיות ריק");
		return false;
	}
	if (!shortDesc || shortDesc === "") {
		alert("תיאור התנדבות לא יכול להיות ריק");
		return false;
	}
	if (!location || location === "") {
		alert("מיקום התנדבות לא יכול להיות ריק");
		return false;
	}
	if (!date || date === "") {
		alert("תאריך התנדבות לא יכול להיות ריק");
		return false;
	}
	if (!startHour || startHour === "") {
		alert("נא למלא שעת התחלה");
		return false;
	}
	if (!endHour || endHour === "") {
		alert("נא למלא שעת סיום");
		return false;
	}

	const startDate = new Date(date);
	startDate.setHours(startHour.getHours());
	startDate.setMinutes(startHour.getMinutes());
	const endDate = new Date(date);
	endDate.setHours(endHour.getHours());
	endDate.setMinutes(endHour.getMinutes());
	if (startDate >= endDate) {
		alert("שעת הסיום חייבת להיות אחרי שעת התחלה");
		return false;
	}

	if (!amount || amount === "") {
		alert("נא למלא את שדה כמות המתנדבים הדרושים");
		return false;
	}
	if (!areaNum || areaNum === "") {
		alert("נא לבחור אזור");
		return false;
	}

	// if (!professions || professions.length === 0) {
	// 	alert("התנדבות חייבת לבחור לפחות התמחות אחת");
	// 	return false;
	// }
	// if (!employeeID || employeeID === "") {
	// 	alert("מספר עובד לא יכול להיות ריק");
	// 	return false;
	// }
	return true;
};

const createDate = (date, time) => {
	const dateString = `${date}T${time}:00.000+00:00`;
	return new Date(dateString);
};
export default createNewActivity;
