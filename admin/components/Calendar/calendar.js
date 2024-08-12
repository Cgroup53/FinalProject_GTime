import { changeCalendarDate } from "../ActivityViewerPanel.js";

changeCalendarDate;

let selectedDate = new Date();

const addMonthSelector = (container) => {
	const monthSelector = document.createElement("div");
	monthSelector.classList.add("monthSelector");
	const selectPrev = document.createElement("button");
	selectPrev.classList.add("monthArrow");
	selectPrev.innerText = "‹";
	selectPrev.addEventListener("click", choosePrevMonth);
	const currentMonth = document.createElement("p");
	currentMonth.classList.add("current-month");
	const monthNames = [
		"ינואר",
		"פברואר",
		"מרס",
		"אפריל",
		"מאי",
		"יוני",
		"יולי",
		"אוגוסט",
		"ספטמבר",
		"אוקטובר",
		"נוואבר",
		"דצמבר",
	];
	currentMonth.innerText = `${
		monthNames[selectedDate.getMonth()]
	} ${selectedDate.getFullYear()}`;
	const selectNext = document.createElement("button");
	selectNext.classList.add("monthArrow");
	selectNext.innerText = "›";
	selectNext.addEventListener("click", chooseNextMonth);

	monthSelector.appendChild(selectPrev);
	monthSelector.appendChild(currentMonth);
	monthSelector.appendChild(selectNext);
	container.appendChild(monthSelector);
};

const choosePrevMonth = () => {
	selectedDate.setMonth(selectedDate.getMonth() - 1);
	createCalendar();
};

const chooseNextMonth = () => {
	selectedDate.setMonth(selectedDate.getMonth() + 1);
	createCalendar();
};

const addCalendarView = (container) => {
	const calendarView = document.createElement("div");
	calendarView.classList.add("calendarView");

	const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
	for (let i = 0; i < dayNames.length; i++) {
		const dayName = document.createElement("div");
		dayName.classList.add("dayName");
		dayName.innerText = dayNames[i];
		calendarView.appendChild(dayName);
	}

	const firstDay = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		1
	);
	const lastDay = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth() + 1,
		0
	);

	const firstDayIndex = firstDay.getDay();
	const lastDayIndex = lastDay.getDate();

	let dayIndex = 0;
	for (let i = firstDayIndex; i > 0; i--) {
		const day = document.createElement("div");
		day.classList.add("day");
		day.innerText = "";
		calendarView.appendChild(day);
		dayIndex++;
	}

	for (let i = 1; i <= lastDayIndex; i++) {
		const day = document.createElement("div");
		if (
			i === selectedDate.getDate() &&
			selectedDate.getMonth() === new Date().getMonth()
		) {
			day.classList.add("today");
		}
		day.addEventListener("click", () => {
			selectedDate = new Date(
				selectedDate.getFullYear(),
				selectedDate.getMonth(),
				i
			);
			createCalendar();
			changeCalendarDate(selectedDate);
		});
		day.classList.add("day");
		day.innerText = i;
		calendarView.appendChild(day);
		dayIndex++;
	}

	while (dayIndex % 7 !== 0) {
		const day = document.createElement("div");
		day.classList.add("day");
		day.innerText = "";
		calendarView.appendChild(day);
		dayIndex++;
	}

	container.appendChild(calendarView);
};

const createCalendar = () => {
	const calendarContainer = document.getElementById("calendarContainer");
	calendarContainer.innerHTML = "";
	while (calendarContainer.firstChild) {
		calendarContainer.removeChild(calendarContainer.firstChild);
	}
	calendarContainer.classList.add("calendarContainer");
	addMonthSelector(calendarContainer);
	addCalendarView(calendarContainer);
};
createCalendar();
