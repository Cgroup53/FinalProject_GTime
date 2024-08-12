import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "LTLKEY";
const ACT_KEY = "ACTKEY";

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
	sync: {},
});

export const saveData = async (value) => {
	const response = await storage.save({
		key: KEY,
		data: value,
		expires: 1000 * 3600 * 24,
	});
};

export const getData = async () => {
	try {
		const value = await storage.load({
			key: KEY,
		});
		return value;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const saveActivities = async (value) => {
	const response = await storage.save({
		key: ACT_KEY,
		data: value,
		expires: 1000 * 3600 * 24,
	});
};

export const getActivities = async () => {
	try {
		const value = await storage.load({
			key: ACT_KEY,
		});
		return value;
	} catch (e) {
		console.log(e);
		saveActivities([]);
		return null;
	}
};

export default storage;
