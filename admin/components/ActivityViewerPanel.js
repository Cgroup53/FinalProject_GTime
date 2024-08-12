import { createActivityModal } from "./ActivityModal/activityModal.js";

let calendar;

document.addEventListener("DOMContentLoaded", function () {
	refreshActivitiesTimetableView();
	// const calendarEl = document.getElementById("activityViewerPanel");
	// calendar = new FullCalendar.Calendar(calendarEl, {
	// 	initialView: "timeGridWeek",
	// 	editable: false,
	// 	eventClick: function (info) {
	// 		const activityID = info.event._def.publicId;
	// 		createActivityModal(activityID);
	// 	},
	// });

	// calendar.render();
});

export const refreshActivitiesTimetableView = () => {
	const calendarEl = document.getElementById("activityViewerPanel");

	calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "timeGridWeek",
		editable: false,
		direction: "rtl",
		eventClick: async function (info) {
			const activityID = info.event._def.publicId;
			const wrapper = document.getElementById("createActivityModal");
			if (wrapper) {
				wrapper.style.visibility = "visible";
				const modal = await createActivityModal(activityID, wrapper);
				// console.log("modal", modal);
				// wrapper.appendChild(modal);
			}
		},
	});

	calendar.render();
};

export const clearCalendarEvents = () => {
	calendar.getEvents().forEach((event) => event.remove());
};

export const changeCalendarDate = (newDate) => {
	calendar.changeView("timeGridWeek", newDate);
};

export const addCalendarEvent = (id, title, start, end, date) => {
	date = new Date(date);
	start = new Date(start);
	end = new Date(end);

	const startDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		start.getHours(),
		start.getMinutes(),
		start.getSeconds()
	);

	const endDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		end.getHours(),
		end.getMinutes(),
		end.getSeconds()
	);

	const newEvent = {
		id,
		title,
		start: startDate,
		end: endDate,
	};
	calendar.addEvent(newEvent);
};
