import { dataStore } from "../../dataStore.js";

const container = document.getElementById("hospitalsContainer");
const showHospitals = () => {
	container.innerHTML = "";
	container.classList.add("hospitalsContainer");
	const headerContainer = document.createElement("div");
	headerContainer.classList.add("headerContainer");
	const headerTitle = document.createElement("h4");
	headerTitle.innerText = "סינון לפי בתי חולים:";
	headerContainer.appendChild(headerTitle);
	const clearBtn = document.createElement("button");
	clearBtn.classList.add("clearBtn");
	clearBtn.innerText = "נקה הכל";
	headerContainer.appendChild(clearBtn);
	container.appendChild(headerContainer);
	const hospitals = dataStore.getData().hospitals;
	for (let i = 0; i < hospitals.length; i++) {
		const hospital = hospitals[i];
		const hospitalContainer = document.createElement("div");
		hospitalContainer.classList.add("hospitalItem");
		const checkbox = document.createElement("input");
		checkbox.classList.add("hospitalCheckbox");
		checkbox.type = "checkbox";
		checkbox.checked = true;
		hospitalContainer.appendChild(checkbox);
		const hospitalName = document.createElement("div");
		hospitalName.classList.add("hospitalName");
		const hospitalIcon = document.createElement("img");
		hospitalIcon.src = "../../assets/hospital.png";
		hospitalIcon.classList.add("hospitalIcon");
		hospitalIcon.alt = "🏥";
		hospitalContainer.appendChild(hospitalIcon);
		hospitalName.innerText = hospital.name;
		hospitalContainer.appendChild(hospitalName);
		container.appendChild(hospitalContainer);
	}
};

// showHospitals();
