import areasAPI from "../../api/areasAPI.js";
import professionsApi from "../../api/professionsAPI.js";

const managementListContainer = document.getElementById("managementList");
const managementContentContainer = document.getElementById("managementContent");

const createProfession = async () => {
	const professionName = document.getElementById("professionNameInput").value;
	const professionDescription = document.getElementById(
		"professionDescriptionInput"
	).value;

	if (!professionName || !professionDescription) {
		alert("לא ניתן להוסיף התמחות ללא שם");
		return;
	}
	const allProfessions = await professionsApi.getAllProfessions();
	const existProfession = allProfessions.find(
		(profession) => profession.professionName === professionName
	);
	if (existProfession) {
		alert("התמחות כבר קיימת במערכת");
		return;
	}

	const res = await professionsApi.createNewProfession(
		professionName,
		professionDescription
	);

	if (res) {
		alert("התמחות נוצרה בהצלחה");
		await refreshProfessionsContent();
	}
};

const createArea = async () => {
	const areaName = document.getElementById("areaNameInput").value;

	if (!areaName) {
		alert("לא ניתן להוסיף אזור ללא שם");
		return;
	}
	const allAreas = await areasAPI.getAllAreas();
	let existArea = false;

	allAreas.forEach((area) => {
		if (area.areaName === areaName) {
			existArea = true;
		}
	});

	if (existArea) {
		alert("האזור כבר קיים במערכת");
		return;
	}

	const res = await areasAPI.createNewArea(areaName);

	if (res.status === 200) {
		alert("האזור נוצר בהצלחה");
		await refreshAreasContent();
	}
};

const refreshProfessionsContent = async () => {
	managementContentContainer.innerHTML = "";

	const allProfessions = await professionsApi.getAllProfessions();

	managementContentContainer.innerHTML += `
    <h1>התמחויות</h1>
    <div id="addProfessionSection">
        <div class="formInput">
            <label for="professionNameInput">שם התמחות:</label>
            <input id="professionNameInput" type="text" />
            
        </div>
        <div class="formInput">
            <label for="professionDescriptionInput">תיאור התמחות:</label>
            <textarea id="professionDescriptionInput"></textarea>
        </div>
       
    </div>
    `;

	const addProfessionButton = document.createElement("button");
	addProfessionButton.innerText = "הוספת התמחות";
	addProfessionButton.addEventListener("click", createProfession);
	managementContentContainer.appendChild(addProfessionButton);

	const professionsGrid = document.createElement("div");
	professionsGrid.id = "professionsGrid";

	allProfessions.forEach((profession) => {
		const professionItem = document.createElement("div");
		professionItem.classList.add("professionItem");
		const deleteButton = document.createElement("button");
		deleteButton.innerText = "✖️";
		deleteButton.addEventListener("click", async () => {
			const res = await professionsApi.deleteProfession(
				profession.professionNum
			);
			if (res.status === 200) {
				alert("התמחות נמחקה בהצלחה");
				await refreshProfessionsContent();
			}
		});

		professionItem.innerText = profession.professionName;
		professionItem.appendChild(deleteButton);
		professionsGrid.appendChild(professionItem);
	});

	managementContentContainer.appendChild(professionsGrid);
};

const refreshAreasContent = async () => {
	managementContentContainer.innerHTML = "";

	const allAreas = await areasAPI.getAllAreas();
	managementContentContainer.innerHTML += `
    <h1>אזורים</h1>
    <div id="addAreaSection">
        <div class="formInput">
            <label for="areaNameInput">שם האזור:</label>
            <input id="areaNameInput" type="text" />
            
        </div>
    </div>
    `;

	const addAreaButton = document.createElement("button");
	addAreaButton.innerText = "הוספת האזור";
	addAreaButton.addEventListener("click", createArea);
	managementContentContainer.appendChild(addAreaButton);

	const areasGrid = document.createElement("div");
	areasGrid.id = "areasGrid";

	allAreas.forEach((area) => {
		const areaItem = document.createElement("div");
		areaItem.classList.add("areaItem");
		areaItem.innerText = area.areaName;
		const deleteButton = document.createElement("button");
		deleteButton.innerText = "✖️";
		deleteButton.addEventListener("click", async () => {
			const res = await areasAPI.deleteArea(area.areaNum);
			if (res.status === 200) {
				alert("האזור נמחק בהצלחה");
				await refreshAreasContent();
			}
		});

		areaItem.appendChild(deleteButton);
		areasGrid.appendChild(areaItem);
	});

	managementContentContainer.appendChild(areasGrid);
};

const managementItems = [
	{
		name: "אזורים",
		function: refreshAreasContent,
	},
	{
		name: "תחומים",
		function: refreshProfessionsContent,
	},
];

const refreshManagementList = () => {
	managementListContainer.innerHTML = "";
	managementItems.forEach((item) => {
		const managementItem = document.createElement("div");
		managementItem.classList.add("managementItem");
		managementItem.innerText = item.name;
		managementItem.addEventListener("click", item.function);
		managementListContainer.appendChild(managementItem);
	});
};

refreshManagementList();
refreshAreasContent();
