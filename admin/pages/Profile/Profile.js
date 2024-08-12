import employeesApi from "../../api/employeesAPI.js";
import areasAPI from "../../api/areasAPI.js";
import { dataStore } from "../../dataStore.js";

const user = dataStore.getData();

const profileContainer = document.getElementById("profileContainer");

let editMode = false;

const allAreas = await areasAPI.getAllAreas();

const renderEditMode = async () => {
	const result = `
        <div class="profileInfo" id="editProfile">
            <label for="fNameInput">שם פרטי:</label>
            <input id="fNameInput" type="text" value="${user.fName}" />
            <label for="lNameInput">שם משפחה:</label>
            <input id="lNameInput" type="text" value="${user.lName}" />
            <label for="emailInput">דואר אלקטרוני:</label>
            <input id="emailInput" type="email" value="${user.email}" />
            <label for="phoneInput">מספר טלפון:</label>
            <input id="phoneInput" type="text" value="${user.phone}" />
			<label id="passwordInput" for="passwordInput">סיסמא חדשה:</label>
			<input id="newPassword" type="password" placeholder="במידה והנך רוצה לשנות סיסמא, יש להקליד אותה בשדה זה" />
        </div>
        <button class="submitBtn" id="submitBtn">שמור</button>
    `;

	return result;
};

const addAreaSelect = async () => {
	// const areaSelect = document.getElementById("areaSelect");
	// allAreas.forEach((area) => {
	// 	const option = document.createElement("option");
	// 	option.value = area.areaNum;
	// 	option.textContent = area.areaName;
	// 	if (area.areaNum === user.areaNum) option.selected = true;
	// 	areaSelect.appendChild(option);
	// });
};

const submitChanges = async () => {
	user.fName = document.getElementById("fNameInput").value;
	user.lName = document.getElementById("lNameInput").value;
	user.email = document.getElementById("emailInput").value;
	user.phone = document.getElementById("phoneInput").value;
	// user.areaNum = document.getElementById("areaSelect").value;
	const newPassword = document.getElementById("newPassword").value;
	if (newPassword && newPassword !== "") user.password = newPassword;
	const response = await employeesApi.update(user);

	if (response.status === 200) {
		alert("הפרופיל עודכן בהצלחה");

		const allEmployees = await employeesApi.geAllEmployees();

		for (const employee of allEmployees) {
			if (employee.employeeID === user.employeeID) {
				dataStore.setData(employee);
				dataStore.loadData();
				break;
			}
		}
		window.location.reload();
	} else {
		alert("שגיאה בעדכון");
	}

	editMode = false;
	refreshProfileContainer();
};

const renderViewMode = () => {
	const area = allAreas.find((a) => a.areaNum === user.areaNum);
	const areaName = area ? area.areaName : "";
	return `
        <div class="profileInfo" id="viewProfile">
            <label>שם פרטי:</label>
            <label>${user.fName}</label>
            <label>שם משפחה:</label>
            <label>${user.lName}</label>
            <label>דואר אלקטרוני:</label>
            <label>${user.email}</label>
            <label>מספר טלפון:</label>
            <label>${user.phone}</label>
        </div>
    `;
};

const refreshProfileContainer = async () => {
	profileContainer.innerHTML = `
        <div class="profileForm shadow">
            <h1>פרטי עובד:</h1>
            ${editMode ? await renderEditMode() : renderViewMode()}
            <button class="submitBtn" id="editBtn">
                ${editMode ? "בטל עריכה" : "ערוך"}
            </button>
        </div>
        
    `;

	document.getElementById("editBtn").addEventListener("click", async () => {
		editMode = !editMode;
		await refreshProfileContainer();
	});

	if (editMode) {
		document
			.getElementById("submitBtn")
			.addEventListener("click", submitChanges);

		await addAreaSelect();
	}
};

refreshProfileContainer();
