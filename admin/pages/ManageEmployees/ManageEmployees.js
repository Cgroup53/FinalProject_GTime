import employeesApi from "../../api/employeesAPI.js";

const employeesContainer = document.getElementById("employeesContainer");

const refreshEmployees = async () => {
	const allEmployees = await employeesApi.geAllEmployees();
	employeesContainer.innerHTML = "";
	allEmployees.map((employee) => {
		const employeeCard = document.createElement("div");
		employeeCard.classList.add("employeeCard");
		employeeCard.classList.add("shadow");
		const employeeImage = document.createElement("h3");
		employeeImage.innerText = "👤";
		employeeCard.innerHTML = `
            <div class="cardDetails"> 
                <div class="employeeImage">👤</div>
                <div class="employeesInfoContainer">
                    <p>שם: ${employee.fName} ${employee.lName}</p>
                    <p>טלפון: ${employee.phone}</p>
                    <p>דוא"ל: ${employee.email}</p>
                </div>
            </div>
        `;
		employeesContainer.appendChild(employeeCard);
	});
};

refreshEmployees();
