import { dataStore } from "./dataStore.js";

const goToLogin = () => {
	window.location.href = "http://127.0.0.1:5500/pages/Login/login.html";
};

const goToHome = () => {
	window.location.href = "http://127.0.0.1:5500/pages/Home/home.html";
};

const isBasePage = () => {
	return (
		window.location.href === "http://127.0.0.1:5500/" ||
		window.location.href === "http://127.0.0.1:5500/index.html"
	);
};

const isLoginPage = () => {
	return (
		window.location.href === "http://127.0.0.1:5500/pages/Login/login.html"
	);
};

const isForgotPasswordPage = () => {
	return (
		window.location.href ===
		"http://127.0.0.1:5500/pages/ForgotPassword/forgotPassword.html"
	);
};

const isRegisterPage = () => {
	return (
		window.location.href ===
		"http://127.0.0.1:5500/pages/Register/register.html"
	);
};

console.log("dataStore.getData()", window.location.href);
if (
	dataStore.getData() === null &&
	!isLoginPage() &&
	!isRegisterPage() &&
	!isForgotPasswordPage()
)
	goToLogin();
else if (isBasePage()) {
	goToHome();
}

// console.log("dataStore.getData()", dataStore.getData());
