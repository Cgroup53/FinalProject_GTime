import volunteersAPI from "../../api/volunteersAPI.js";

const volunteersContainer = document.getElementById("volunteersContainer");

const refreshVolunteers = async () => {
	const allVolunteers = await volunteersAPI.getAllVolunteers();
	volunteersContainer.innerHTML = "";
	allVolunteers.map((volunteer) => {
		const volunteerCard = document.createElement("div");
		volunteerCard.classList.add("volunteerCard");
		volunteerCard.classList.add("shadow");
		const volunteerImage = document.createElement("h3");
		volunteerImage.innerText = "👤";
		volunteerCard.innerHTML = `
            <div class="cardDetails">
                <div class="volunteerImage">👤</div>
                <div class="volunteersInfoContainer">
                    <p>שם: ${volunteer.name} ${volunteer.fname}</p>
                    <p>טלפון: ${volunteer.phone}</p>
                    <p>דוא"ל: ${volunteer.email}</p>
                </div>
            </div>
            <div class="areasContainer">
            ${volunteer.areas.map((area) => {
							return `<div class="areaTag">${area.areaName}</div>`;
						})}
            </div>
            <div class="weekDaysContainer">
                <span class="${volunteer.sunday ? "workDay" : ""}">א</span>
                <span class="${volunteer.monday ? "workDay" : ""}">ב</span>
                <span class="${volunteer.tuesday ? "workDay" : ""}">ג</span>
                <span class="${volunteer.wednesday ? "workDay" : ""}">ד</span>
                <span class="${volunteer.thursday ? "workDay" : ""}">ה</span>
                <span class="${volunteer.friday ? "workDay" : ""}">ו</span>
                <span class="${volunteer.saturday ? "workDay" : ""}">ש</span>
            </div>
            <div class="professionsContainer">
                ${volunteer.professions.map((profession) => {
									return `<div class="areaTag">${profession.professionName}</div>`;
								})}
            </div>

        `;

		volunteersContainer.appendChild(volunteerCard);
	});
};

refreshVolunteers();
