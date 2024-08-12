import activitiesApi from "../../api/activitiesAPI.js";
import areasAPI from "../../api/areasAPI.js";
import employeesApi from "../../api/employeesAPI.js";
import volunteersAPI from "../../api/volunteersAPI.js";

const activityReportsBtn = document.getElementById("activityReportBtn");
const volunteerReportsBtn = document.getElementById("volunteerReportBtn");
const employeeReportsBtn = document.getElementById("employeeReportBtn");
const periodicReportsBtn = document.getElementById("periodicReportsBtn");

periodicReportsBtn.addEventListener("click", () => {
	showPeriodicReports();
});

const dashboardContent = document.getElementById("dashboardContent");

activityReportsBtn.addEventListener("click", () => {
	showActivityReport();
});

volunteerReportsBtn.addEventListener("click", () => {
	showVolunteerReport();
});

employeeReportsBtn.addEventListener("click", () => {
	showEmployeeReport();
});

const showVolunteerReport = async () => {
	const allVolunteers = await volunteersAPI.getAllVolunteers();
	const activeVolunteers = allVolunteers.filter(
		(volunteer) => volunteer.status
	);
	dashboardContent.innerHTML = `
        <h1>דוח התנדבויות</h1>
        <div id="volunteerReport">
            <div class="volunteerReportHeader">
                <label>מספר מתנדבים כולל: ${allVolunteers.length}</label>
                <label>מספר מתנדבים פעילים: ${activeVolunteers.length}</label>
                <button id="exportBtn" class="exportBtn">יצוא לאקסל</button>
            </div>
            <div id="volunteerReportTable">
                <label>#</label>
                <label>שם מלא</label>
                <label>דואר אלקטרוני</label>
                <label>מספר טלפון</label>
                <label>ימי התנדבות</label>
                <label>התמחויות</label>
                <label>אזורי התנדבות</label>
                <label>סטטוס</label>
            </div>
        </div>
    `;

	const volunteerReportTable = document.getElementById("volunteerReportTable");
	const exportBtn = document.getElementById("exportBtn");

	exportBtn.addEventListener("click", () => {
		exportVolunteersToCSV(allVolunteers);
	});

	volunteerReportTable.classList.add("volunteerReportTable");

	if (activeVolunteers.length === 0) {
		volunteerReportTable.innerHTML += "<div>אין מתנדבים פעילים</div>";
	} else {
		activeVolunteers.forEach((volunteer, index) => {
			const volunteerDays = [];
			const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
				volunteer;
			if (sunday) volunteerDays.push("א");
			if (monday) volunteerDays.push("ב");
			if (tuesday) volunteerDays.push("ג");
			if (wednesday) volunteerDays.push("ד");
			if (thursday) volunteerDays.push("ה");
			if (friday) volunteerDays.push("ו");
			if (saturday) volunteerDays.push("ש");
			const volunteerDaysString = volunteerDays.join(", ");
			const volunteerProfessionsString = volunteer.professions
				.map((profession) => profession.professionName)
				.join(", ");
			const volunteerStatus = volunteer.status ? "פעיל" : "לא פעיל";
			const volunteerAreasString = volunteer.areas
				.map((area) => area.areaName)
				.join(", ");
			volunteerReportTable.innerHTML += `
                <label>${index + 1}</label>
                <label>${volunteer.name} ${volunteer.fname}</label>
                <label>${volunteer.email}</label>
                <label>${volunteer.phone}</label>
                <label class="volunteerProfessionLabel">${volunteerDaysString}</label>
                <label class="volunteerProfessionLabel">${volunteerProfessionsString}</label>
                <label class="volunteerProfessionLabel">${volunteerAreasString}</label>
                <label>${volunteerStatus}</label>
            `;
		});
	}
};

const exportVolunteersToCSV = (volunteers) => {
	const headers = [
		"שם פרטי",
		"שם משפחה",
		"דואר אלקטרוני",
		"מספר טלפון",
		"א'",
		"ב'",
		"ג'",
		"ד'",
		"ה'",
		"ו'",
		"ש'",
		"אזורי התנדבות",
		"התמחויות",
		"סטטוס",
	];
	const csvContent = [
		headers.join(","),
		...volunteers.map((volunteer) => {
			const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
				volunteer;
			const volunteerProfessionsString = volunteer.professions
				.map((profession) => profession.professionName)
				.join(" ");
			const volunteerAreasString = volunteer.areas
				.map((area) => area.areaName)
				.join(" ");
			const volunteerStatus = volunteer.status === true ? "פעיל" : "לא פעיל";
			return [
				volunteer.name,
				volunteer.fname,
				volunteer.email,
				volunteer.phone,
				sunday ? "כן" : "לא",
				monday ? "כן" : "לא",
				tuesday ? "כן" : "לא",
				wednesday ? "כן" : "לא",
				thursday ? "כן" : "לא",
				friday ? "כן" : "לא",
				saturday ? "כן" : "לא",
				volunteerProfessionsString,
				volunteerAreasString,
				volunteerStatus,
			].join(",");
			// return `${volunteer.name},${volunteer.fname},
			//         ${volunteer.email},
			//         ${volunteer.phone},
			//         ${sunday ? "כן" : "לא"},
			//         ${monday ? "כן" : "לא"},
			//         ${tuesday ? "כן" : "לא"},
			//         ${wednesday ? "כן" : "לא"},
			//         ${thursday ? "כן" : "לא"},
			//         ${friday ? "כן" : "לא"},
			//         ${saturday ? "כן" : "לא"},
			//         ${volunteerProfessionsString},
			//         ${volunteerStatus}`;
		}),
	].join("\n");

	const BOM = "\uFEFF";
	const csvContentWithBOM = BOM + csvContent;
	const blob = new Blob([csvContentWithBOM], {
		type: "text/csv;charset=utf-16le;",
	});
	const link = document.createElement("a");
	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "volunteers.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

const showActivityReport = async () => {
	const activities = await activitiesApi.getAllActivities();
	dashboardContent.innerHTML = `
        <h1>דוח פעילויות</h1>
        <div class="reportHeader">
            <label>מספר פעילויות: ${activities.length}</label>
            <button id="exportBtn" class="exportBtn">יצוא לאקסל</button>
        </div>
        <div id="activityReport">
            <label>מספר פעילות</label>
            <label>שם פעילות</label>
            <label>מיקום פעילות</label>
            <label>תאריך פעילות</label>
            <label>מספר עובד</label>
            <label>מאויישת</label>
            <label>מספר מתנדבים</label>
            <label>תחומי פעילות</label>
        </div>
    `;
	const activityReport = document.getElementById("activityReport");
	const exportBtn = document.getElementById("exportBtn");

	exportBtn.addEventListener("click", () => {
		exportActivitiesToCSV(activities);
	});

	activityReport.classList.add("activityReport");

	if (activities.length === 0) {
		activityReport.innerHTML += "<div>אין פעילויות</div>";
	} else {
		activities.forEach((activity) => {
			const actNum = activity.actNum;
			const actName = activity.actName;
			const location = activity.location;
			const date = new Date(activity.date).toLocaleDateString("he-IL");
			const employeeID = activity.employeeID;
			const status = activity.status === true ? "מאויישת" : "לא מאויישת";
			const amount = activity.amount;
			const activitiesProfessionsString = activity.activitiesProfessions
				.map((profession) => profession.professionName)
				.join(", ");
			activityReport.innerHTML += `
                <label>${actNum}</label>
                <label>${actName}</label>
                <label>${location}</label>
                <label>${date}</label>
                <label>${employeeID}</label>
                <label>${status}</label>
                <label>${amount}</label>
                <label class="activityProfessionLabel">${activitiesProfessionsString}</label>
            `;
		});
	}
};

const exportActivitiesToCSV = (activities, totalVolunteeringTime) => {
	const headers = [
		"מספר פעילות",
		"שם פעילות",
		"מיקום פעילות",
		"תאריך פעילות",
		"מספר עובד",
		"מאויישת",
		"מספר מתנדבים",
		"תחומי פעילות",
	];
	const csvContent = [
		totalVolunteeringTime ? `סך הכל: ${totalVolunteeringTime}` : "",
		headers.join(","),
		...activities.map((activity) => {
			const date = new Date(activity.date).toLocaleDateString("he-IL");
			const status = activity.status ? "מאויישת" : "לא מאויישת";
			const activitiesProfessionsString = activity.activitiesProfessions
				.map((profession) => profession.professionName)
				.join(" ");
			return `${activity.actNum},${activity.actName},${activity.location},${date},${activity.employeeID},${status},${activity.amount},${activitiesProfessionsString}`;
		}),
	].join("\n");

	const BOM = "\uFEFF";
	const csvContentWithBOM = BOM + csvContent;
	const blob = new Blob([csvContentWithBOM], {
		type: "text/csv;charset=utf-16le;",
	});
	const link = document.createElement("a");
	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "activities.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};
const showEmployeeReport = async () => {
	const employees = await employeesApi.geAllEmployees();

	dashboardContent.innerHTML = `
        <h1>דוח עובדים</h1>
        <div id="employeeReport">
            <div class="reportHeader">
                <label>מספר עובדים: ${employees.length}</label>
                <button id="exportBtn" class="exportBtn">יצוא לאקסל</button>
            </div>
            <div id="employeeReportTable">
                <label>מספר עובד</label>
                <label>שם פרטי</label>
                <label>שם משפחה</label>
                <label>דואר אלקטרוני</label>
                <label>מספר טלפון</label>
            </div>
        </div>
    `;

	const employeeReportTable = document.getElementById("employeeReportTable");
	employeeReportTable.classList.add("employeeReportTable");
	const exportBtn = document.getElementById("exportBtn");

	exportBtn.addEventListener("click", () => {
		exportEmployeesToCSV(employees);
	});

	if (employees.length === 0) {
		employeeReportTable.innerHTML += "<div>אין עובדים</div>";
	} else {
		employees.forEach((employee, index) => {
			employeeReportTable.innerHTML += `
                <label>${employee.employeeID}</label>
                <label>${employee.fName}</label>
                <label>${employee.lName}</label>
                <label>${employee.email}</label>
                <label>${employee.phone}</label>
            `;
		});
	}
};

const exportEmployeesToCSV = (employees) => {
	const headers = [
		"מספר עובד",
		"שם פרטי",
		"שם משפחה",
		"מספר טלפון",
		"דואר אלקטרוני",
	];
	const csvContent = [
		headers.join(","),
		...employees.map((employee) => {
			return `${employee.employeeID.toString()},${employee.fName},${
				employee.lName
			},${employee.phone},${employee.email}`;
		}),
	].join("\n");

	const BOM = "\uFEFF";
	const csvContentWithBOM = BOM + csvContent;
	const blob = new Blob([csvContentWithBOM], {
		type: "text/csv;charset=utf-16le;",
	});
	const link = document.createElement("a");
	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "employees.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
};

let startDate = null;
let endDate = null;

const showPeriodicReports = async () => {
	const activities = await activitiesApi.getAllActivities();
	dashboardContent.innerHTML = `
		<h1>דוח שעות לפי תקופה</h1>
		<div id="periodicReports">
			<div id="periodicReportsHeader">
				<label>תאריך התחלה</label>
				<input id="startDateInput" type="date" />
				<label>תאריך סיום</label>
				<input id="endDateInput" type="date" />
				<button id="searchBtn" class="searchBtn">חיפוש</button>
				<button id="exportBtn" class="exportBtn">יצוא לאקסל</button>
				<div id="totalVolunteeringTime"> 
					<label id="totalVolunteeringTimeLabel"></label>
				</div>
			</div>
			<div id="activityReportTable" >
        	</div>
			</div>
			`;

	// <div id="activityReportTable" class="activityReport">

	// </div>
	// const activityReport = document.getElementById("activityReport");
	// activityReport.classList.add("activityReport");
	const startDateInput = document.getElementById("startDateInput");
	const endDateInput = document.getElementById("endDateInput");
	const searchBtn = document.getElementById("searchBtn");
	const exportBtn = document.getElementById("exportBtn");

	exportBtn.style.visibility = "collapse";

	searchBtn.addEventListener("click", () => {
		startDate = startDateInput.value;
		endDate = endDateInput.value;
		const filteredActivities = activities.filter((activity) => {
			const activityDate = new Date(activity.date);
			return (
				activityDate >= new Date(startDate) && activityDate <= new Date(endDate)
			);
		});
		const totalVolunteeringTime = filteredActivities.reduce(
			(total, activity) => {
				const activityStart = new Date(activity.startHour);
				const activityEnd = new Date(activity.endHour);
				const activityDuration =
					(activityEnd - activityStart) / (1000 * 60 * 60); // convert to hours
				const activityVolunteerHours =
					activityDuration * activity.volunteerEmails.length;
				return total + activityVolunteerHours;
			},
			0
		);

		const totalVolunteeringTimeLabel = document.getElementById(
			"totalVolunteeringTimeLabel"
		);
		totalVolunteeringTimeLabel.textContent = `סה"כ זמן פעילות: ${totalVolunteeringTime} שעות`;

		updateActivityReport(filteredActivities);
		exportBtn.style.visibility = "visible";
		exportBtn.removeEventListener("click", () => {});
		exportBtn.addEventListener("click", () => {
			exportActivitiesToCSV(filteredActivities, totalVolunteeringTime);
		});
	});
};

const updateActivityReport = (activities) => {
	const activityReportTable = document.getElementById("activityReportTable");
	activityReportTable.innerHTML = "";
	activityReportTable.innerHTML += `
			<label class="reportHeaderLabel">מספר פעילות</label>
			<label class="reportHeaderLabel">שם פעילות</label>
			<label class="reportHeaderLabel">תיאור קצר</label>
			<label class="reportHeaderLabel">מיקום פעילות</label>
			<label class="reportHeaderLabel">תאריך פעילות</label>
			<label class="reportHeaderLabel">שעת התחלה</label>
			<label class="reportHeaderLabel">שעת סיום</label>
			<label class="reportHeaderLabel">משך פעילות בשעות</label>
			<label class="reportHeaderLabel">שעות התנדבות בפועל</label>
			<label class="reportHeaderLabel">מספר עובד</label>
			<label class="reportHeaderLabel">מאויישת</label>
			<label class="reportHeaderLabel">מספר מתנדבים</label>
			<label class="reportHeaderLabel">מספר מתנדבים רשומים</label>
			<label class="reportHeaderLabel">תחומי פעילות</label>`;
	activities.forEach((activity, index) => {
		const activityDurationInHours = (
			(new Date(activity.endHour).getTime() -
				new Date(activity.startHour).getTime()) /
			(1000 * 60 * 60)
		).toFixed(2);

		activityReportTable.innerHTML += `
			<label>${activity.actNum}</label>
			<label>${activity.actName}</label>
			<label>${activity.shortDesc}</label>
			<label>${activity.location}</label>
			<label>${new Date(activity.date).toLocaleDateString("he-IL")}</label>
			<label>${new Date(activity.startHour).toLocaleTimeString("he-IL", {
				hour: "numeric",
				minute: "numeric",
			})}</label>
			<label>${new Date(activity.endHour).toLocaleTimeString("he-IL", {
				hour: "numeric",
				minute: "numeric",
			})}</label>
			<label class="activityDuration">
	 			${activityDurationInHours}
			</label>
			<label>${activity.volunteerEmails.length * activityDurationInHours}</label>
			<label>${activity.employeeID}</label>
			<label>${activity.status === true ? "מאויישת" : "לא מאויישת"}</label>
			<label>${activity.amount}</label>
			<label>${activity.volunteerEmails.length}</label>
			<label>${activity.activitiesProfessions
				.map((profession) => profession.professionName)
				.join(", ")}</label>

		`;
	});
};
