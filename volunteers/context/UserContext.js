import { useState, createContext, useEffect } from "react";
import {
	getActivities,
	getData,
	saveActivities,
	saveData,
} from "../utils/LocalStorage";
import activitiesApi from "../api/activitiesApi";
import { volunteerFits } from "../logic/volunteersLogic";
import { useNotifications } from "../hooks/useNotifications";
import smartComponent from "../logic/smartElement";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	// const [savedActivities, setSavedActivities] = useState([]);
	const { schedulePushNotification } = useNotifications();

	const [smartFilteredActivities, setSmartFilteredActivities] = useState([]);

	useEffect(() => {
		getUser();
		// getActivitiesFromStorage();
	}, []);

	async function notifyAboutNewActivity() {
		const activities = await activitiesApi.getActivities();

		const savedActivities = await getActivitiesFromStorage();

		const notSavedActivities = [];

		for (const activity of activities) {
			let activityExists = false;
			for (const savedActivity of savedActivities) {
				if (savedActivity.actNum === activity.actNum) {
					activityExists = true;
					break;
				}
			}
			if (!activityExists) {
				notSavedActivities.push(activity);
			}
		}

		for (const activity of notSavedActivities) {
			if (
				volunteerFits(user, activity) &&
				new Date(activity.date).getDate() >= new Date().getDate()
			) {
				await schedulePushNotification(
					"גדולים מהחיים - התראת התנדבות חדשה",
					activity.actName +
						" " +
						new Date(activity.date).toLocaleDateString("he-il"),
					`123`
				);
			}
		}
		saveActivitiesToStorage(activities);
		// setSavedActivities(activities);
		// setSavedActivities([]);
		return notSavedActivities;
	}

	const checkBySmartFilter = async (activities) => {
		if (!activities || activities.length === 0)
			activities = await activitiesApi.getActivities();

		const result = await smartComponent.checkForNearActivity(user, activities);

		if (result && result.smartFilter.length > 0) {
			await schedulePushNotification(
				"גדולים מהחיים - התראת התנדבות",
				`ישנן ${result.smartFilter.length} התנדבויות שזקוקות לך `,
				`123`
			);
		}

		setSmartFilteredActivities(result.smartFilter);
	};

	const tenMinutes = 1000 * 60 * 10; // 10 minutes
	const oneDay = 1000 * 60 * 60 * 24; // 24 hours

	useEffect(() => {
		if (!user) return;

		// Function to run every 10 minutes
		const runFrequentTasks = async () => {
			const newActivities = await notifyAboutNewActivity();
			if (newActivities.length > 0) await checkBySmartFilter(newActivities);
		};

		// Function to run daily
		const runDailyTasks = async () => {
			await checkBySmartFilter([]);
		};

		const runNotificationsCheckNoSmartFilter = async () => {
			const newActivities = await notifyAboutNewActivity();
		};

		// Run both tasks immediately when the component mounts
		runNotificationsCheckNoSmartFilter();
		runDailyTasks();

		// Set up interval for frequent tasks (every 10 minutes)
		const frequentInterval = setInterval(runFrequentTasks, tenMinutes);

		// Set up interval for daily tasks
		const dailyInterval = setInterval(runDailyTasks, oneDay);

		// Clean up function
		return () => {
			clearInterval(frequentInterval);
			clearInterval(dailyInterval);
		};
	}, [user]);

	const getActivitiesFromStorage = async () => {
		const activitiesFromStorage = await getActivities();
		return activitiesFromStorage;
		// setSavedActivities(activities);
	};

	const saveActivitiesToStorage = async (activities) => {
		await saveActivities(activities);
		const updatedActivities = await getActivitiesFromStorage();
		// setSavedActivities(updatedActivities);
	};

	const getUser = async () => {
		const user = await getData();
		setUser(user);
	};

	const saveUser = async (userObj) => {
		if (!userObj.imageBase64) userObj.imageBase64 = "string";
		await saveData(userObj);
		await getUser();
	};

	const removeUser = async () => {
		await saveData(null);
		await getUser();
		await saveActivitiesToStorage([]);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				saveUser,
				removeUser,
				saveActivitiesToStorage,
				smartFilteredActivities,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
