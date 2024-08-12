import activitiesApi from "../api/activitiesApi.js";
import volunteersApi from "../api/volunteersApi.js";
import { volunteerFits } from "./volunteersLogic.js";

import axios from "axios";

import { PermissionsAndroid, Platform } from "react-native";

import * as Location from "expo-location";

const smartComponent = {
	checkForNearActivity: async (user, allActivities) => {
		const now = new Date();

		const tomorrow = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1
		);
		tomorrow.setHours(0, 0, 0, 0);

		let tomorrowActivities = [];

		for (let i = 0; i < allActivities.length; i++) {
			const activity = allActivities[i];
			if (
				new Date(activity.date).getDate() === tomorrow.getDate() &&
				new Date(activity.date).getMonth() === tomorrow.getMonth() &&
				new Date(activity.date).getFullYear() === tomorrow.getFullYear()
			) {
				tomorrowActivities.push(activity);
			}
		}

		tomorrowActivities = tomorrowActivities.filter((activity) => {
			return !activity.volunteerEmails.includes(user.email);
		});

		if (tomorrowActivities.length == 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

		const unMannedActivities = [];
		for (let activity of tomorrowActivities) {
			if (activity.status === false) unMannedActivities.push(activity);
		}

		if (unMannedActivities.length === 0) {
			return {
				activitiesFound: false,
				smartFilter: [],
			};
		}

		const smartFilter = [];
		const nonFittingActivities = [];

		for (let i = 0; i < unMannedActivities.length; i++) {
			if (volunteerFits(user, tomorrowActivities[i]))
				smartFilter.push(tomorrowActivities[i]);
			else nonFittingActivities.push(tomorrowActivities[i]);
		}

		const allVolunteers = await volunteersApi.getAllVolunteers();

		for (let vacantActivity of nonFittingActivities) {
			const volunteerScoreMap = new Map();
			for (let volunteer of allVolunteers) {
				if (!vacantActivity.volunteerEmails.includes(volunteer.email)) {
					const score = calculateSmartScore(
						volunteer,
						allActivities,
						vacantActivity
					);
					volunteerScoreMap.set(volunteer.email, score);
				}
			}
			const peopleNeeded =
				vacantActivity.amount - vacantActivity.volunteerEmails.length + 10;
			const top10Volunteers = [...volunteerScoreMap]
				.sort((a, b) => b[1] - a[1])
				.slice(0, peopleNeeded);
			if (top10Volunteers.includes(user.email))
				smartFilter.push(vacantActivity);
		}

		return {
			activitiesFound: true,
			smartFilter: smartFilter,
		};
	},
};

const calculateSmartScore = (volunteer, activities, checkedActivity) => {
	const disScore = 0.3 * distanceScore(volunteer, checkedActivity);
	const profScore =
		0.5 * professionScore(volunteer, activities, checkedActivity);
	const dayScore = 0.2 * weekDayScore(volunteer, activities, checkedActivity);
	return disScore + profScore + dayScore;
};

const professionScore = (volunteer, activities, checkedActivity) => {
	if (volunteer.professions.length === 0) return 0;
	if (checkedActivity.activitiesProfessions.length === 0) return 0;
	try {
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
	} catch (error) {
		console.log(error);

		return 0;
	}
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

const getGPSLocation = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		setErrorMsg("Permission to access location was denied");
		return;
	}

	let location = await Location.getCurrentPositionAsync({});
	return location;
};

const requestLocationPermission = async () => {
	if (Platform.OS === "android") {
		try {
			if (PermissionsAndroid.RESULTS.GRANTED === "granted") return true;
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Location Permission",
					message: "This app needs access to your location",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				}
			);

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	}
	return true;
};

const distanceScore = async (volunteer, checkedActivity) => {
	const areaName = checkedActivity.areaName;

	let userLocation;
	const hasPermission = await requestLocationPermission();

	if (hasPermission) {
		try {
			userLocation = await getGPSLocation();
		} catch (error) {
			console.error("Error getting GPS location:", error);
			return 1; // Default score if GPS location fails
		}
	} else {
		console.error("Location permission denied");
		return 1; // Default score if permission denied
	}

	return 1;

	const prompt = `Calculate the approximate distance between the coordinates (${userLocation.latitude}, ${userLocation.longitude}) and ${areaName} in kilometers.`;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-4-turbo",
				messages: [
					{
						role: "system",
						content: "You are a helpful assistant.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
			},
			{
				headers: {
					Authorization: `Bearer YOUR_API_KEY`,
					"Content-Type": "application/json",
				},
			}
		);

		const distance = parseFloat(response.data.choices[0].message.content);
		if (distance <= 10) return 3;
		if (distance <= 40) return 2;
		if (distance <= 50) return 1;
		return 0;
	} catch (error) {
		console.error("Error fetching distance from ChatGPT API:", error);
		return 1; // Default score if API call fails
	}
};

// const distanceScore = (volunteer, activities, checkedActivity) => {
// 	// const activityLocation = findLocation(checkedActivity)
// 	// const volunteerLocation = findLocation(volunteer);
// 	// const distance = calculateDistance(activityLocation, volunteerLocation);
// 	// if(distance <= 10) return 3
// 	// if(distance <= 40) return 2
// 	// if(distance <= 50) return 1
// 	// return 0
// 	return 1; // default
// };

export default smartComponent;
