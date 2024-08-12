import React from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Text } from "@rneui/base";

const ActivityItem = ({ activity, cancelActivity }) => {
	const isFutureActivity = () => {
		const today = new Date();
		return new Date(activity.date) > today;
	};

	const handleCancelActivity = () => {
		cancelActivity(activity);
	};

	return (
		<View style={[mainStyles.elevatedPanel, styles.panel]}>
			<View>
				<Text style={[mainStyles.title]}>
					{activity.actName}{" "}
					{!isFutureActivity() && (
						<Text style={mainStyles.formLabel}>(פעילות עברה)</Text>
					)}
				</Text>

				<Text>
					<Text style={mainStyles.formLabel}>מועד: </Text>
					<Text style={{ fontWeight: "bold" }}>
						{new Date(activity.date).toLocaleDateString("he-IL")}🔹{" "}
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{activity.startHour.split("T")[1].split(":")[0]}:
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{activity.startHour.split("T")[1].split(":")[1]}-
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{activity.endHour.split("T")[1].split(":")[0]}:
					</Text>
					<Text style={{ fontWeight: "bold" }}>
						{activity.endHour.split("T")[1].split(":")[1]}
					</Text>
				</Text>
				<Text>
					<Text style={mainStyles.formLabel}>מיקום:</Text> {activity.location}
				</Text>
				<Text>
					<Text style={mainStyles.formLabel}>תיאור: </Text>
					{activity.shortDesc}
				</Text>
			</View>

			{isFutureActivity() && (
				<Button
					title="בטל רישום להתנדבות"
					buttonStyle={mainStyles.button}
					onPress={handleCancelActivity}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	activityContainer: {
		flex: 1,
	},
	panel: {
		display: "flex",
		flexDirection: "column",
		// flex: 1,
		width: "100%",
		padding: 20,
	},
});

export default ActivityItem;
