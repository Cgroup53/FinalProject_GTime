export const showActivityModal = (activityData) => {
	const backdrop = document.createElement("div");
	backdrop.classList.add("backdrop");
	const container = document.createElement("div");
	container.classList.add("activityModal");
	container.classList.add("shadow");

	container.style.visibility = "visible";

	// Header
	const header = document.createElement("div");
	header.classList.add("activityModalHeader");
	const closeBtn = document.createElement("button");
	closeBtn.classList.add("closeActivityModalBtn");
	closeBtn.innerText = "❌";
	closeBtn.addEventListener("click", () => {
		backdrop.remove();
	});
	// title
	const title = document.createElement("h3");
	title.innerText = activityData.activity.actName;
	header.appendChild(title);
	header.appendChild(closeBtn);
	container.appendChild(header);

	// description
	const content = document.createElement("div");
	const description = document.createElement("p");
	description.innerText = activityData.activity.shortDesc;
	content.appendChild(description);

	// date
	const date = document.createElement("p");
	date.innerText = new Date(activityData.activity.date).toLocaleDateString(
		"he-IL"
	);
	content.appendChild(date);

	// start \ end
	const startHour = new Date(activityData.activity.startHour).toLocaleString(
		"en-US",
		{ hour: "numeric", minute: "numeric", hour12: false }
	);
	const endHour = new Date(activityData.activity.endHour).toLocaleString(
		"en-US",
		{ hour: "numeric", minute: "numeric", hour12: false }
	);
	const time = document.createElement("p");
	time.innerText = startHour + " - " + endHour;
	content.appendChild(time);

	// location
	const location = document.createElement("p");
	location.innerText = activityData.activity.location;
	content.appendChild(location);
	console.log("activityData", activityData);

	// volunteer info
	const volunteerInfo = document.createElement("div");
	volunteerInfo.classList.add("volunteerInfo");
	const nameHeader = document.createElement("p");
	nameHeader.style.fontWeight = "bold";
	nameHeader.innerText = "שם מלא";
	const emailHeader = document.createElement("p");
	emailHeader.style.fontWeight = "bold";

	emailHeader.innerText = "דואר אלקטרוני";
	const phoneHeader = document.createElement("p");
	phoneHeader.style.fontWeight = "bold";
	phoneHeader.innerText = "טלפון";

	volunteerInfo.appendChild(nameHeader);
	volunteerInfo.appendChild(emailHeader);
	volunteerInfo.appendChild(phoneHeader);

	for (let volunteer of activityData.volunteers) {
		const volunteerName = document.createElement("p");
		volunteerName.innerText = volunteer.name + " " + volunteer.fname;
		volunteerInfo.appendChild(volunteerName);
		const volunteerEmail = document.createElement("p");
		volunteerEmail.innerText = volunteer.email;
		volunteerInfo.appendChild(volunteerEmail);
		const volunteerPhone = document.createElement("p");
		volunteerPhone.innerText = volunteer.phone;
		volunteerInfo.appendChild(volunteerPhone);
	}
	content.appendChild(volunteerInfo);

	container.appendChild(content);
	backdrop.appendChild(container);

	document.body.appendChild(backdrop);
};
