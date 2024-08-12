import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { UserContext } from "../../context/UserContext";
import { Text } from "@rneui/base";
import smartComponent from "../../logic/smartElement";
import { useNotifications } from "../../hooks/useNotifications";
import ActivityCalendar from "../../components/ActivityCalendar";
import activitiesApi from "../../api/activitiesApi";
import ActivityView from "../Activities/ActivityView";

const Home = ({ navigation }) => {
	const { user, smartFilteredActivities } = useContext(UserContext);
	const [smartFiltered, setSmartFiltered] = useState([]);
	const { schedulePushNotification } = useNotifications();
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [activities, setActivities] = useState([]);
	const [showDayActivities, setShowDayActivities] = useState([]);

	const [selectedActivity, setSelectedActivity] = useState(null);
	const getActivities = async () => {
		const result = await activitiesApi.getActivities();
		setActivities(result);
	};

	useEffect(() => {
		getActivities();
	}, []);

	const renderSmartFilter = () => {
		if (smartFilteredActivities.length === 0) return <></>;
		return (
			<ScrollView
				contentContainerStyle={[styles.container, styles.activitiesContainer]}
			>
				{smartFilteredActivities.map((activity, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={styles.activityRow}
							onPress={() => {
								setSelectedActivity(activity);
							}}
						>
							<Text style={{ fontWeight: "bold" }}>
								{new Date(activity.date).toLocaleDateString("he-il")}
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 12 }}>
								{activity.location}
							</Text>
							<Text style={{ fontWeight: "bold" }}>{activity.actName}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const renderActivities = () => {
		const futureActivities = activities.filter(
			(activity) =>
				new Date(activity.date) > new Date() &&
				activity.volunteerEmails.includes(user.email)
		);
		return (
			<ScrollView
				contentContainerStyle={[styles.container, styles.activitiesContainer]}
			>
				{futureActivities.map((activity, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={styles.activityRow}
							onPress={() => setSelectedActivity(activity)}
						>
							<Text style={{ fontWeight: "bold" }}>
								{new Date(activity.date).toLocaleDateString("he-il")}
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 12 }}>
								{activity.location}
							</Text>
							<Text style={{ fontWeight: "bold" }}>{activity.actName}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const renderSelectedDayActivities = () => {
		if (showDayActivities.length === 0) return <></>;
		return (
			<ScrollView
				contentContainerStyle={[
					styles.container,
					styles.activitiesContainer,
					mainStyles.coloredBackground,
				]}
			>
				{showDayActivities.map((activity, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={styles.activityRow}
							onPress={() => {
								setSelectedActivity(activity);
							}}
						>
							<Text style={{ fontWeight: "bold" }}>
								{new Date(activity.date).toLocaleDateString("he-il")}
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 12 }}>
								{activity.location}
							</Text>
							<Text style={{ fontWeight: "bold" }}>{activity.actName}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const showHomeScreen = () => {
		return (
			<ScrollView
				contentContainerStyle={[
					// mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{ flexGrow: 1 },
				]}
			>
				<MobileHeader navigation={navigation} />

				<ScrollView
					contentContainerStyle={[
						mainStyles.pageContainer,
						mainStyles.coloredBackground,
						{ gap: 10, padding: 10 },
					]}
				>
					<View style={styles.header}>
						<Text style={mainStyles.title}>
							שלום {user.name} {user.fname}
						</Text>
						<Text style={mainStyles.title}>
							{new Date().toLocaleDateString("he-il")}
						</Text>
					</View>

					{
						<ActivityCalendar
							setSelectedDay={setSelectedDay}
							selectedDay={selectedDay}
							activities={activities}
							setShowDayActivities={setShowDayActivities}
						/>
					}

					{renderSelectedDayActivities()}

					<View style={[mainStyles.elevatedPanel, styles.container]}>
						<Text
							style={[mainStyles.title, { textAlign: "right", width: "100%" }]}
						>
							ההתנדבויות הקרובות שלך:
						</Text>
						{renderActivities()}
					</View>
					<View style={[mainStyles.elevatedPanel, styles.container]}>
						<Text
							style={[
								mainStyles.title,
								{ backgroundColor: "white", fontSize: 15 },
							]}
						>
							התנדבויות קרובות שצריכות אותך:
						</Text>
						{renderSmartFilter()}
					</View>
				</ScrollView>
			</ScrollView>
		);
	};

	const renderSelectedActivity = () => {
		return (
			<ActivityView
				activity={selectedActivity}
				close={() => setSelectedActivity(null)}
			/>
		);
	};

	return <>{selectedActivity ? renderSelectedActivity() : showHomeScreen()}</>;
};

const styles = StyleSheet.create({
	container: {
		flex: 0.8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},
	header: {
		width: "100%",
		// height: 50,
		backgroundColor: "rgba(255, 255, 255, 1)",
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 5,
		borderRadius: 10,
	},

	activityRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		backgroundColor: "rgb(229, 233, 255)",
		borderRadius: 10,
	},
	activitiesContainer: {
		gap: 10,
	},
});

export default Home;
