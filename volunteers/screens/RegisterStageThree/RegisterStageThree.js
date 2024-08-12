import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CameraComponent from "../../components/Camera";
import { Button, Image, Text } from "@rneui/base";
import mainStyles from "../../styles/mainStyles";
import volunteersApi from "../../api/volunteersApi";

const RegisterStageThree = ({ route, navigation }) => {
	const [pictureTaken, setPictureTaken] = useState(null);

	const showCameraComponent = () => {
		return (
			<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
				<Text style={[mainStyles.title, { color: "white" }]}>
					שלב אחרון ! ככה נכיר כמעט פנים אל פנים !
				</Text>
				<CameraComponent setTakenPicture={setPictureTaken} />
			</View>
		);
	};

	const submit = async () => {
		const userObj = {
			email: route.params.email.trim(),
			password: route.params.password,
			name: route.params.name,
			fname: route.params.fname,
			phone: route.params.phone.trim(),
			sign: "2024-05-27T11:43:21.201Z",
			sunday: route.params.sunday,
			monday: route.params.monday,
			tuesday: route.params.tuesday,
			wednesday: route.params.wednesday,
			thursday: route.params.thursday,
			friday: route.params.friday,
			saturday: route.params.saturday,
			areas: route.params.areas,
			professions: route.params.professions,
			imageBase64: pictureTaken.base64,
			volImage: "string",
		};

		const response = await volunteersApi.register(userObj);

		if (response.status === 200) {
			alert("הרשמתך הצליחה, כעת תוכל להתחבר לאתר");
			navigation.navigate("Login");
		} else {
			// console.log("response", await response.json());
			alert("הרשמתך נכשלה, נסה שוב");
		}
	};

	const showEndScreen = () => {
		return (
			<View
				style={[
					mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{ justifyContent: "space-between", gap: 10 },
				]}
			>
				<View
					style={[
						mainStyles.elevatedPanel,
						{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "95%",
							backgroundColor: "rgba(255, 255, 255, 0.7)",
							flex: 1,
						},
					]}
				>
					<Image
						source={{ uri: pictureTaken.uri }}
						containerStyle={styles.photoView}
						// borderRadius={"50%"}
					/>
					<Text style={[mainStyles.title]}>מושלם !</Text>
				</View>
				<View style={[styles.buttonContainer]}>
					<Button title="ניסיון חוזר" onPress={() => setPictureTaken(null)} />
					<Button title="סיים הרשמה" onPress={submit} />
				</View>
			</View>
		);
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			{pictureTaken ? showEndScreen() : showCameraComponent()}
			<Button
				title="חזרה"
				containerStyle={[mainStyles.button, { width: "100%" }]}
				onPress={handleBack}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		flexDirection: "column",
	},
	photoView: {
		width: 350,
		height: 350,
		borderRadius: 200,
		borderWidth: 10,
		borderColor: "rgba(0, 0, 255, 0.8)",
		elevation: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	buttonContainer: {
		width: "100%",
		display: "flex",
		backgroundColor: "rgba(255, 255, 255, 0.7)",
		gap: 10,
	},
});

export default RegisterStageThree;
