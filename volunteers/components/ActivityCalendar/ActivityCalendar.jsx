import { Text } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";

const ActivityCalendar = ({
	selectedDay,
	setSelectedDay,
	activities,
	setShowDayActivities,
}) => {
	const daysOfWeekHebrew = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
	const [currentDate, setCurrentDate] = useState(new Date(selectedDay));

	const handleMonthChange = (month) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + month);
		setCurrentDate(newDate);
	};

	const renderMonthSelect = () => {
		return (
			<View
				style={[
					{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10,
						width: "100%",
						flex: 1,
					},
				]}
			>
				<Text
					style={[mainStyles.panelText, { fontWeight: "bold", fontSize: 20 }]}
					onPress={() => handleMonthChange(-1)}
				>
					&lt;
				</Text>
				<Text
					style={[
						mainStyles.panelText,
						{ fontWeight: "bold", textAlign: "center", fontSize: 20 },
					]}
				>
					{currentDate.toLocaleDateString("he-il", { month: "long" })}{" "}
					{currentDate.getFullYear()}
				</Text>
				<Text
					style={[mainStyles.panelText, { fontWeight: "bold", fontSize: 20 }]}
					onPress={() => handleMonthChange(1)}
				>
					&gt;
				</Text>
			</View>
		);
	};

	// const renderWeekDayHeaders = () => {
	// 	return (
	// 		<View
	// 			style={[
	// 				mainStyles.pageContainer,
	// 				mainStyles.coloredBackground,
	// 				{
	// 					gap: 10,
	// 					padding: 10,
	// 					flexDirection: "row",
	// 					flexWrap: "wrap",
	// 					width: "100%",
	// 					borderRadius: 15,
	// 				},
	// 			]}
	// 		>
	// 			<View
	// 				style={{
	// 					flexDirection: "row",
	// 					justifyContent: "space-between",
	// 					width: "100%",
	// 				}}
	// 			>
	// 				{daysOfWeekHebrew.map((day, index) => (
	// 					<Text key={index} style={{ padding: 5 }}>
	// 						{day}
	// 					</Text>
	// 				))}
	// 			</View>
	// 		</View>
	// 	);
	// };

	const findDayActivities = (date) => {
		return activities.filter((activity) => {
			const activityDate = new Date(activity.date);

			return (
				activityDate.getDate() === new Date(date).getDate() &&
				activityDate.getMonth() === new Date(date).getMonth()
			);
		});
	};

	const renderCalendar = () => {
		const firstDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);

		const firstSunday = firstDayOfMonth;
		let countExtraDays = 0;
		while (firstSunday.getDay() !== 0) {
			firstSunday.setDate(firstSunday.getDate() - 1);
			countExtraDays++;
		}

		const lastSaturday = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0
		);

		while (lastSaturday.getDay() !== 6) {
			lastSaturday.setDate(lastSaturday.getDate() + 1);
		}

		const days = [];

		for (let i = firstSunday; i <= lastSaturday; i.setDate(i.getDate() + 1)) {
			days.push(new Date(i));
		}

		return (
			<View style={[styles.gridContainer]}>
				{daysOfWeekHebrew.map((day, index) => {
					return (
						<View key={index} style={styles.gridColumn}>
							<Text style={{ fontWeight: "bold" }}>{day}</Text>
						</View>
					);
				})}
				{days.map((day, index) => {
					const dayActivities = findDayActivities(day);
					const cellStyle = [];
					const textStyle = [];
					const date = new Date(day);
					if (
						date.getDate() === new Date().getDate() &&
						date.getMonth() === new Date().getMonth() &&
						date.getFullYear() === new Date().getFullYear()
					) {
						cellStyle.push(styles.todayDate);
					}

					if (dayActivities.length > 0) {
						cellStyle.push(styles.activityDate);
					}

					if (new Date(selectedDay).getDate() === new Date(date).getDate()) {
						cellStyle.push(styles.selectedDate);
					}
					return (
						<TouchableOpacity
							key={index}
							style={[styles.gridColumn]}
							onPress={() => {
								setSelectedDay(date);
								if (dayActivities.length > 0) {
									setShowDayActivities(dayActivities);
								} else {
									setShowDayActivities([]);
								}
							}}
						>
							<Text style={cellStyle}>{new Date(day).getDate()}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
			// <View
			// 	style={[
			// 		{
			// 			gap: 10,
			// 			padding: 10,
			// 			flexDirection: "row",
			// 			flexWrap: "wrap",
			// 			borderRadius: 15,
			// 			backgroundColor: "rgba(109, 188, 203, 1)",
			// 		},
			// 	]}
			// >
			// 	{weeks.map((week, index) => {
			// 		return (
			// 			<View
			// 				key={index}
			// 				style={{
			// 					display: "flex",
			// 					flexDirection: "row",
			// 					width: "100%",
			// 					flexWrap: "wrap",
			// 					gap: 20,
			// 				}}
			// 			>
			// 				{week.map((date, index) => {
			// 					const dayActivities = findDayActivities(date);
			// 					const cellStyle = [styles.basicStyle];
			// 					date = new Date(date);
			// 					if (
			// 						date.getDate() === new Date().getDate() &&
			// 						date.getMonth() === new Date().getMonth() &&
			// 						date.getFullYear() === new Date().getFullYear()
			// 					) {
			// 						cellStyle.push(styles.todayDate);
			// 					}

			// 					if (dayActivities.length > 0) {
			// 						cellStyle.push(styles.activityDate);
			// 					}

			// 					if (
			// 						new Date(selectedDay).getDate() === new Date(date).getDate()
			// 					) {
			// 						cellStyle.push(styles.selectedDate);
			// 					}

			// 					return (
			// 						<TouchableOpacity
			// 							key={index}
			// 							style={{
			// 								display: "flex",
			// 								justifyContent: "center",
			// 								width: 23,
			// 							}}
			// 							onPress={() => {
			// 								setSelectedDay(date);
			// 								if (dayActivities.length > 0) {
			// 									setShowDayActivities(dayActivities);
			// 								} else {
			// 									setShowDayActivities([]);
			// 								}
			// 							}}
			// 						>
			// 							<Text style={cellStyle}>{new Date(date).getDate()}</Text>
			// 						</TouchableOpacity>
			// 					);
			// 				})}
			// 			</View>
			// 		);
			// 	})}
			// </View>
		);
	};
	return (
		<View
			style={[
				mainStyles.container,
				mainStyles.elevatedPanel,
				{
					width: "100%",
					backgroundColor: "rgba(109, 188, 203, 1)",
				},
			]}
		>
			{renderMonthSelect()}
			<View
				style={[
					mainStyles.coloredBackground,
					{ borderRadius: 15, backgroundColor: "rgba(109, 188, 203, 1)" },
				]}
			>
				{renderCalendar()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	basicStyle: {
		textAlign: "center",
		borderRadius: 50,
		fontSize: 15,
		padding: 0.16,
	},

	todayDate: {
		fontWeight: "900",
	},

	activityDate: {
		textDecorationLine: "underline",
		textDecorationColor: "rgb(151, 0, 131)",
	},

	selectedDate: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		// backgroundColor: "white",
	},
	gridContainer: {
		flexDirection: "row-reverse",
		flexWrap: "wrap",
		justifyContent: "space-between", // Distributes space between the children
	},
	gridColumn: {
		width: "14.28%", // Approximately 100% / 7 columns, adjust for margins/padding if needed
		alignItems: "center",
		paddingVertical: 10, // Optional: Adds some vertical spacing
		paddingHorizontal: 2, // Optional: Adds some horizontal spacing
	},
});

export default ActivityCalendar;
