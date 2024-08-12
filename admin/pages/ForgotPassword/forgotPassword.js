import employeesApi from "../../api/employeesAPI.js";
import emailServiceConfig from "../../util/mailServiceConfig.js";

const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit");
const backBtn = document.getElementById("back");

emailjs.init({
	publicKey: emailServiceConfig.public_key,
});

const mailService = emailjs;

function generatePassword() {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const specialChars = "!@#$%^&*";

	let password = "";

	// first 3 symbols - random letters
	for (let i = 0; i < 3; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	// next 2 symbols - random numbers
	for (let i = 0; i < 2; i++) {
		password += numbers.charAt(Math.floor(Math.random() * numbers.length));
	}

	// last symbol - random special char
	password += specialChars.charAt(
		Math.floor(Math.random() * specialChars.length)
	);

	return password;
}

const submitRequest = async () => {
	const email = emailInput.value;
	if (!email || email === "") {
		alert("אנא הזן דואר אלקטרוני");
		return;
	}

	const allEmployees = await employeesApi.geAllEmployees();
	const employee = allEmployees.find((emp) => emp.email === email);
	if (!employee) {
		alert("דואל אלקטרוני זה לא קיים במערכת");
		return;
	}

	const newPassword = generatePassword();
	employee.password = newPassword;

	const response = await employeesApi.update(employee);
	const templateParams = {
		toName: employee.fName + " " + employee.lName,
		email: email,
		newPassword: newPassword,
	};

	mailService
		.send(
			emailServiceConfig.service_id,
			emailServiceConfig.template_id,
			templateParams
		)
		.then(
			(response) => {
				console.log("SUCCESS!", response.status, response.text);
				alert("הסיסמה נשלחה לדואר אלקטרוני");
			},
			(error) => {
				console.log("FAILED...", error);
			}
		);
};

submitBtn.addEventListener("click", submitRequest);
backBtn.addEventListener("click", () => {
	window.location.href = "../Login/login.html";
});
