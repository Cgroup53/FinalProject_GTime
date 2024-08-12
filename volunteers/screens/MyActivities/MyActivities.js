import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { Text } from "@rneui/base";
import { UserContext } from "../../context/UserContext";
import volunteersApi from "../../api/volunteersApi";
import ActivityView from "../Activities/ActivityView";
import ActivityItem from "./ActivityItem";
import activitiesApi from "../../api/activitiesApi";

const MyActivities = ({ navigation }) => {
	const { user, saveUser } = useContext(UserContext);
	const [activities, setActivities] = useState([]);

	const findUserActivities = async () => {
		const allActivities = await activitiesApi.getActivities();
		const filtered = allActivities.filter((activity) =>
			activity.volunteerEmails.includes(user.email)
		);
		setActivities(filtered);
	};

	useEffect(() => {
		findUserActivities();
	}, []);

	const cancelActivity = async (activity) => {
		const response = await volunteersApi.cancelActivity(user, activity);
		if (response.status == 200) {
			alert("ההתנדבות נמחקה בהצלחה");
			await findUserActivities();
			const updatedUser = await volunteersApi.getVolunteer(user);
			saveUser(updatedUser);
		} else {
			alert("ההתנדבות לא נמחקה");
		}
	};

	const renderActivities = () => {
		return activities.map((activity) => {
			return (
				<ActivityItem
					key={activity.actNum}
					activity={activity}
					cancelActivity={cancelActivity}
				/>
			);
		});
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<MobileHeader navigation={navigation} />
			<View style={mainStyles.headerPanel}>
				<Text style={mainStyles.title}>ההתנדבויות שלי</Text>
			</View>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{renderActivities()}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// flex: 1,
		gap: 10,
		padding: 10,
	},
});

export default MyActivities;
