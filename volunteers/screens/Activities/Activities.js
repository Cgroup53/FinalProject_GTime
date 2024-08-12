import React, { useContext, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import activitiesApi from "../../api/activitiesApi";
import { Button, Text } from "@rneui/base";
import MobileHeader from "../../components/MobileHeader";
import ActivityView from "./ActivityView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserContext";
import { volunteerFits } from "../../logic/volunteersLogic";

const Activities = ({ navigation }) => {
	const { user } = useContext(UserContext);
	const [activities, setActivities] = useState([]);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [useVolunteerFilter, setUseVolunteerFilter] = useState(true);

	const getActivities = async () => {
		const allActivities = await activitiesApi.getActivities();
		const filtered = allActivities.filter(
			(activity) => new Date(activity.date) > new Date()
		);
		setActivities(filtered);
	};

	const filterFittingActivities = () => {
		if (!useVolunteerFilter) return activities;
		const filteredActivities = [];
		for (const activity of activities) {
			const fits = volunteerFits(user, activity);
			if (fits) {
				filteredActivities.push(activity);
			}
		}

		return filteredActivities;
	};

	const filteredActivities = useMemo(
		() => filterFittingActivities(activities),
		[activities]
	);

	useEffect(() => {
		if (!selectedActivity) getActivities();
		return () => {};
	}, [useVolunteerFilter, selectedActivity]);

	const renderSelectedActivity = () => {
		return (
			<ActivityView
				activity={selectedActivity}
				close={() => setSelectedActivity(null)}
			/>
		);
	};

	const renderActivities = () => {
		const filteredActivities = filterFittingActivities(activities) || [];

		return filteredActivities.map((activity) => {
			return (
				<View
					key={activity.actNum}
					style={[styles.activityContainer, { flex: 1 }]}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row-reverse",
							justifyContent: "space-between",
						}}
					>
						<Text style={mainStyles.formLabel}>{activity.actName}</Text>
						<Text>{activity.location}</Text>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row-reverse",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
							}}
						>
							<Text>{new Date(activity.date).toLocaleDateString("he-il")}</Text>
							<Text style={[mainStyles.plainText, { flex: 1 }]}>
								{activity.shortDesc}
							</Text>
						</View>
						<Button
							buttonStyle={[mainStyles.button]}
							title="צפיה"
							onPress={() => {
								setSelectedActivity(activity);
							}}
						/>
					</View>
				</View>
			);
		});
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<MobileHeader navigation={navigation} />
			<View style={mainStyles.headerPanel}>
				<Text style={mainStyles.title}>התנדבויות</Text>
			</View>
			<View style={[mainStyles.headerPanel, { justifyContent: "flex-end" }]}>
				<Button
					title={useVolunteerFilter ? "הסר סינון" : "סנן"}
					containerStyle={{ width: 150, backgroundColor: "yellow" }}
					titleStyle={{ fontSize: 12, color: "white", fontWeight: "bold" }}
					onPress={() => setUseVolunteerFilter(!useVolunteerFilter)}
				/>
			</View>
			{!selectedActivity && (
				<ScrollView
					style={styles.scrollViewStyle}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[
						{
							display: "flex",
							flexDirection: "column",
							gap: 20,
							padding: 10,
						},
						selectedActivity && styles.activityCenter,
					]}
				>
					{renderActivities()}
				</ScrollView>
			)}
			{selectedActivity && renderSelectedActivity()}
		</View>
	);
};

const styles = StyleSheet.create({
	scrollViewStyle: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		paddingBottom: 70,
	},
	activityCenter: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	activityContainer: {
		flexWrap: "wrap",
		maxWidth: "100%",
		minWidth: 300,
		padding: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		backgroundColor: "white",
		// display: "flex",
		// flexDirection: "row-reverse",
		// justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export default Activities;
