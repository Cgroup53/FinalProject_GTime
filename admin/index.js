import { dataStore } from "./dataStore.js";

const BASE_URL = 'https://proj.ruppin.ac.il/cgroup53/test2/tar2';

const goToLogin = () => {
	window.location.href = `${BASE_URL}/pages/Login/login.html`;
};

const goToHome = () => {
	window.location.href = `${BASE_URL}/pages/Home/home.html`;
};

const isBasePage = () => {
	return window.location.href == '/' || window.location.href == '/index.html'
};

const isLoginPage = () => {
	return window.location.href.indexOf('login.html') != -1;  
};

const isForgotPasswordPage = () => {
	return window.location.href.indexOf('forgotPassword.html') != -1;
};

const isRegisterPage = () => {
	return window.location.href.indexOf('register.html') != -1;
};


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
