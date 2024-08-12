import areasAPI from "../../api/areasAPI.js";
import employeesApi from "../../api/employeesAPI.js";

const registerBtn = document.getElementById("register");
const backBtn = document.getElementById("back");
backBtn.addEventListener("click", () => {
	window.location.href = "../Login/login.html";
});
const areasSelect = document.getElementById("area");

// const fetchAreas = async () => {
// 	const response = await areasAPI.getAllAreas();
// 	response.forEach((area) => {
// 		const option = document.createElement("option");
// 		option.value = area.areaNum;
// 		option.textContent = area.areaName;
// 		areasSelect.appendChild(option);
// 	});
// };

// fetchAreas();

const validateFields = () => {
	const id = document.getElementById("id").value;
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const phone = document.getElementById("phone").value;
	// const area = document.getElementById("area").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if (
		!id ||
		!firstName ||
		!lastName ||
		!phone ||
		// !area ||
		!email ||
		!password
	) {
		alert("חובה למלא את כל השדות");
		return false;
	}

	if (isNaN(id) || id.length !== 9) {
		alert("תעודת זהות חייבת להיות מספר בעל 9 ספרות");
		return false;
	}

	if (!/^\d{10}$/.test(phone)) {
		alert("מספר טלפון חייב להיות מספר בעל 10 ספרות");
		return false;
	}

	if (!/^\w+([.-]?-\w+)*@\w+([.-]?-\w+)*(\.\w{2,3})+$/.test(email)) {
		alert("דואר אלקטרוני לא חוקי");
		return false;
	}

	return true;
};

registerBtn.addEventListener("click", async () => {
	if (!validateFields()) {
		return;
	}

	const id = document.getElementById("id").value;
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const phone = document.getElementById("phone").value;
	// const area = document.getElementById("area").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const allEmployees = await employeesApi.geAllEmployees();
	const prevEmployee = allEmployees.find(
		(employee) => employee.email === email || employee.id === id
	);

	if (prevEmployee) {
		alert("המשתמש כבר קיים במערכת");
		return;
	}

	const response = await employeesApi.register(
		id,
		firstName,
		lastName,
		phone,
		email,
		// area,
		password
	);

	console.log("response", response);
	if (response.status !== 200) {
		alert("שגיאה בחיבור לשרת");
		return;
	}

	// const responseData = await response.json();
	if (response.status === 200) {
		alert("נרשמת בהצלחה");
		window.location.href = "../Login/login.html";
	}
});
