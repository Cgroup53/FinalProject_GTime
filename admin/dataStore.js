let default_data = {
	users: [
		{
			id: 1,
			name: "אדמין",
			username: "admin",
			password: "admin",
			role: "admin",
			token: "1234567890",
		},
		{
			id: 2,
			name: "רכזת",
			username: "center",
			password: "center",
			role: "center",
			token: "12345678901",
		},
	],
	hospitals: [
		{
			id: 1,
			name: "בלינסון",
			city: "פתח-תקווה",
			address: "ז'בוטינסקי 39",
		},
		{
			id: 1,
			name: "בלינסון",
			city: "פתח-תקווה",
			address: "ז'בוטינסקי 39",
		},
		{
			id: 1,
			name: "בלינסון",
			city: "פתח-תקווה",
			address: "ז'בוטינסקי 39",
		},
		{
			id: 1,
			name: "בלינסון",
			city: "פתח-תקווה",
			address: "ז'בוטינסקי 39",
		},
	],
	ideaSuggestions: [
		{
			id: 1,
			title: "יום פיצה",
			content: "יום פיצה כאות הוכרה למתמדברים",
			author: {
				id: 3,
				firstName: "משתמש 1",
				lastName: "שם משפחה שלו",
				photo: "👤",
			},
			created: new Date(),
			read: false,
		},
		{
			id: 3,
			title: "סדנת אומנות",
			content: "הצטרפו אלינו לסדנת אומנות מרגשת במרכז התרבות!",
			author: {
				id: 5,
				firstName: "משתמש 3",
				lastName: "שם משפחה שלו",
				photo: "👤",
			},
			created: new Date(),
			read: false,
		},
		{
			id: 4,
			title: "ימי ספורט",
			content: "היום נפתח ימי הספורט במגרש המקומי!",
			author: {
				id: 6,
				firstName: "משתמש 4",
				lastName: "שם משפחה שלו",
				photo: "👤",
			},
			created: new Date(),
			read: false,
		},
		{
			id: 5,
			title: "תערוכת ספרים",
			content: "אל תחמיצו את התערוכה המרתקת של ספרים בספריית העיר!",
			author: {
				id: 7,
				firstName: "משתמש 5",
				lastName: "שם משפחה שלו",
				photo: "👤",
			},
			created: new Date(),
			read: false,
		},

		{
			id: 6,
			title: "שיעורי קורס אנגלית",
			content: "מחכים לראות אתכם היום בשיעורי הקורס השבועי של אנגלית!",
			author: {
				id: 8,
				firstName: "משתמש 6",
				lastName: "שם משפחה שלו",
				photo: "👤",
			},
			created: new Date(),
			read: false,
		},
	],
	volunteer_activities: [
		{
			id: 1,
			name: "פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "2פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "3פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "4פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,
			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
		{
			id: 1,
			name: "פסטיבל שירי ילדים",
			type: "music",
			date: "15.04.2024",
			start: "08:30",
			end: "10:00",
			hospital: {
				id: 1,
				name: "בלינסון",
				city: "פתח-תקווה",
				address: "ז'בוטינסקי 39",
				logo: "🏥",
			},
			event_notes: `פסטיבל שירי ילדים יתקיים בחדר המשחקים של אשפוז הילדים להתנדבות יש צורך במערכת הגברה ותאורה`,

			department: "אשפוז ילדים",
			subDepartment: "אנקולוגיה",
		},
	],
};

let appData = null;

const DATA_KEY = "LTL";

export const dataStore = {
	getDataFromLocalStorage: () => {
		try {
			const storedData = localStorage.getItem(DATA_KEY);
			appData = JSON.parse(storedData);
		} catch (error) {
			console.log(error);
			// return null;
		}
	},
	saveData: () => {
		try {
			localStorage.setItem(DATA_KEY, JSON.stringify(appData));
		} catch (error) {
			console.log(error);
		}
	},

	getData: () => {
		// const dataFromStorage = getDataFromLocalStorage();
		// return {...dataFromStorage};
		return appData;
	},

	loadData: () => {
		dataStore.getDataFromLocalStorage();

		if (appData === null) {
			console.log("[STORE]\t\t NO DATA FOUND, USING DEFAULT DATA");
			// appData = default_data;
		} else {
			console.log("[STORE]\t\tDATA FROM LOCAL STORAGE LOADED", appData);
		}
	},
	setData: (data) => {
		appData = data;
		dataStore.saveData();
	},
};

// dataStore.saveData();
dataStore.loadData();
console.log(dataStore.getData());
