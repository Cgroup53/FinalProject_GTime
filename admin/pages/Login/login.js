import employeesApi from "../../api/employeesAPI.js";
import { dataStore } from "../../dataStore.js";

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", async () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const response = await employeesApi.login(username, password);
	console.log("response", response);
	if (response.status != 200) {
		alert("שם משתמש או סיסמה אינם תקינים");
		return;
	}
	const responseData = await response.json();

	if (responseData.employeeID !== 0) {
		dataStore.setData(responseData);
		window.location.href = "../Home/home.html";
	} else {
		alert("שם משתמש או סיסמה אינם תקינים");
	}
});

const registerButton = document.getElementById("register");
registerButton.addEventListener("click", () => {
	window.location.href = "../Register/register.html";
});
