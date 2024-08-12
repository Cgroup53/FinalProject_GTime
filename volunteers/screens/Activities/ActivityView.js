import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Text } from "@rneui/base";
import volunteersApi from "../../api/volunteersApi";
import { UserContext } from "../../context/UserContext";
import { ScrollView } from "react-native-gesture-handler";

const ActivityView = ({ activity, close }) => {
	const { user, saveUser } = useContext(UserContext);
	const submit = async () => {
		const res = await volunteersApi.signUpForActivity(user, activity);
		if (res.status === 200) {
			alert("נרשמת בהצלחה !");
			const userUpdate = await volunteersApi.getVolunteer(user);

			saveUser(await volunteersApi.getVolunteer(user));
			close();
		} else {
			alert("שגיאה בהרשמה");
		}
	};

	const renderSubmitButton = () => {
		if (new Date(activity.date) < new Date() || activity.status === true)
			return <></>;
		if (user.activities.find((act) => act.actNum === activity.actNum))
			return <></>;
		return (
			<Button
				onPress={submit}
				title="הרשם להתנדבות"
				buttonStyle={mainStyles.button}
			/>
		);
	};

	const renderActivityVolunteerInfo = () => {
		if (!activity) return <></>;
		return (
			<View>
				<Text style={{ fontWeight: "bold" }}>
					להתנדבות זו נדרשים: {activity.amount} מתנדבים
				</Text>
				<Text style={{ fontWeight: "bold" }}>
					נדרשים {activity.amount - activity.volunteerEmails.length} מתנדבים
					נוספים
				</Text>
			</View>
		);
	};

	const renderActivityProfessions = () => {
		if (activity.activitiesProfessions.length === 0)
			return (
				<View style={{ display: "flex", flexDirection: "column" }}>
					<Text style={{ fontWeight: "bold" }}>
						לפעילות זו אין התמחות נדרשת :)
					</Text>
				</View>
			);
		return (
			<View style={{ display: "flex", flexDirection: "column" }}>
				<Text style={{ fontWeight: "bold" }}>התמחויות נדרשות:</Text>
				<ScrollView>
					{activity.activitiesProfessions.map((profession) => {
						return (
							<Text
								key={profession.professionNum}
								style={{ fontWeight: "bold" }}
							>
								{profession.professionName}
							</Text>
						);
					})}
				</ScrollView>
			</View>
		);
	};

	const renderCancelButton = () => {
		if (new Date(activity.date) < new Date()) return <></>;
		if (!user.activities.find((act) => act.actNum === activity.actNum))
			return <></>;
		return (
			<Button
				onPress={() => {
					cancelVolunteering(activity);
				}}
				title="בטל רישום להתנדבות"
				buttonStyle={mainStyles.button}
			/>
		);
	};

	const cancelVolunteering = async (activity) => {
		const res = await volunteersApi.cancelActivity(user, activity);
		if (res.status === 200) {
			alert("ההתנדבות נמחקה בהצלחה");
			const userUpdate = await volunteersApi.getVolunteer(user);
			saveUser(userUpdate);
			close();
		} else {
			console.log(res.json());
		}
	};

	return (
		<View style={[mainStyles.pageContainer, styles.activityContainer]}>
			<View style={[mainStyles.elevatedPanel, styles.panel]}>
				<View>
					<Button
						onPress={close}
						title="x"
						containerStyle={[
							mainStyles.button,
							{
								width: 50,
								height: 50,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						]}
						titleStyle={{
							width: "100%",
							height: "100%",
							fontSize: 20,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
					<Text style={[mainStyles.title]}>{activity.actName}</Text>

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
				{renderSubmitButton()}
				{renderCancelButton()}
				{renderActivityVolunteerInfo()}
				{renderActivityProfessions()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	activityContainer: {
		// flex: 1,
	},
	panel: {
		display: "flex",
		flexDirection: "column",
		height: 500,
		// flex: 0.5,
		width: "90%",
		// padding: 50,
	},
});

export default ActivityView;
