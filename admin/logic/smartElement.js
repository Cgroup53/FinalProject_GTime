import activitiesApi from "../api/activitiesAPI.js";
import volunteersAPI from "../api/volunteersAPI.js";
import { getFittingVolunteers } from "./volunteersLogic.js";

const smartComponent = {
	checkForNearActivity: async () => {
		const allActivities = await activitiesApi.getAllActivities();
		const now = new Date();

		const tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		);
		tomorrow.setHours(0, 0, 0, 0);

		const tomorrowActivities = allActivities.filter((activity) => {
			return (
				new Date(activity.date).getDate() === tomorrow.getDate() &&
				new Date(activity.date).getMonth() === tomorrow.getMonth() &&
				new Date(activity.date).getFullYear() === tomorrow.getFullYear()
			);
		});
		if (tomorrowActivities.length == 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

		const unMannedActivities = [];

		for (let i = 0; i < tomorrowActivities.length; i++) {
			if (tomorrowActivities[i].status === false)
				unMannedActivities.push(tomorrowActivities[i]);
		}

		if (unMannedActivities.length == 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

		const allVolunteers = await volunteersAPI.getAllVolunteers();

		const smartFilter = [];

		for (let unMannedActivity of unMannedActivities) {
			const volunteerScoreMap = new Map();
			for (let volunteer of allVolunteers) {
				// console.log("volunteer.email", volunteer.email);

				let volunteerSignedUp = false;
				for (let volunteerActivity of volunteer.activities) {
					if (volunteerActivity.actNum === unMannedActivity.actNum) {
						volunteerSignedUp = true;
					}
				}

				// if (!unMannedActivity.volunteerEmails.includes(volunteer.email)) {
				if (volunteerSignedUp === false) {
					const score = calculateSmartScore(
						volunteer,
						allActivities,
						unMannedActivity
					);
					volunteerScoreMap.set(volunteer.email, score);
				}
			}
			const peopleNeeded =
				unMannedActivity.amount - unMannedActivity.volunteerEmails.length + 10;

			const top10Volunteers = [...volunteerScoreMap]
				.sort((a, b) => b[1] - a[1])
				.slice(0, peopleNeeded);

			const topVolunteers = top10Volunteers.map((item) => item[0]);

			const volunteerData = await Promise.all(
				topVolunteers.map((email) => volunteersAPI.getVolunteerByEmail(email))
			);

			smartFilter.push({
				activity: unMannedActivity,
				volunteers: volunteerData,
			});

			// for (let top10Volunteer of top10Volunteers) {
			// 	const volunteer = allVolunteers.find(
			// 		(volunteer) => volunteer.email === top10Volunteer
			// 	);
			// 	smartFilter.push(volunteer);
			// }
		}

		return {
			activitiesFound: true,
			smartFilter: smartFilter,
		};

		// let allManned = true;
		// let i = 0;
		// while (i < tomorrowActivities.length && allManned) {
		// 	if (tomorrowActivities[i].status === false) allManned = false;
		// 	i++;
		// }
		// if (allManned) {
		// 	return {
		// 		activitiesFound: false,
		// 		smartFilter: [],
		// 	};
		// }

		// const smartFilter = tomorrowActivities.map((activity) => {
		// 	// if (activity.status === true) return;
		// 	const fittingVolunteers = getFittingVolunteers(allVolunteers, activity);
		// 	return {
		// 		activity,
		// 		volunteers: fittingVolunteers,
		// 	};
		// });
		// return {
		// 	activitiesFound: true,
		// 	smartFilter: smartFilter,
		// };
	},
};

const professionScore = (volunteer, activities, checkedActivity) => {
	if (volunteer.professions.length === 0) return 0;
	if (checkedActivity.activitiesProfessions.length === 0) return 0;
	for (let volunteerProfession of volunteer.professions) {
		for (let activityProfession of checkedActivity.activitiesProfessions) {
			if (
				volunteerProfession.professionNum === activityProfession.professionNum
			) {
				return 2;
			}
		}
	}

	const professionSet = new Set();
	for (let someActivity of activities) {
		if (someActivity.volunteerEmails.includes(volunteer.email)) {
			for (let activityProfession of someActivity.activitiesProfessions) {
				professionSet.add(activityProfession.professionNum);
			}
		}
	}
	for (let volunteerProfession of checkedActivity.activitiesProfessions) {
		if (professionSet.has(volunteerProfession.professionNum)) {
			return 1;
		}
	}

	return 0;
};

const weekDayScore = (volunteer, activities, checkedActivity) => {
	const volunteerWeekDays = [
		volunteer.sunday ? true : false,
		volunteer.monday ? true : false,
		volunteer.tuesday ? true : false,
		volunteer.wednesday ? true : false,
		volunteer.thursday ? true : false,
		volunteer.friday ? true : false,
		volunteer.saturday ? true : false,
	];

	const checkedActivityWeekDay = new Date(checkedActivity.date).getDay();
	if (volunteerWeekDays[checkedActivityWeekDay]) {
		return 3;
	}

	for (let someActivity of activities) {
		const activityDay = new Date(someActivity.date).getDay();
		if (someActivity.volunteerEmails.includes(volunteer.email)) {
			if (checkedActivityWeekDay === activityDay) {
				return 2;
			}
		}
	}

	for (let someActivity of activities) {
		const activityDay = new Date(someActivity.date).getDay();
		if (someActivity.volunteerEmails.includes(volunteer.email)) {
			if (volunteerWeekDays[activityDay] === false) {
				return 1;
			}
		}
	}

	return 0;
};

const calculateSmartScore = (volunteer, activities, checkedActivity) => {
	// const distanceScore =
	// 	0.3 * distanceScore(volunteer, activities, checkedActivity);
	const profScore =
		0.5 * professionScore(volunteer, activities, checkedActivity);
	const dayScore = 0.2 * weekDayScore(volunteer, activities, checkedActivity);
	// return distanceScore + professionScore + weekDayScore;
	return profScore + dayScore;
};

export default smartComponent;
