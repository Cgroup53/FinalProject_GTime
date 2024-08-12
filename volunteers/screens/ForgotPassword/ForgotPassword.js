import { Button, Input, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import emailjs from "@emailjs/react-native";
import volunteersApi from "../../api/volunteersApi";
import emailServiceConfig from "../../utils/mailServiceConfig";

const ForgotPassword = ({ navigation }) => {
	const [email, setEmail] = useState("");

	function generatePassword() {
		const chars = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const specialChars = "!@#$%^&*";

		let password = "";

		// first 3 symbols - random letters
		for (let i = 0; i < 3; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		// next 2 symbols - random numbers
		for (let i = 0; i < 2; i++) {
			password += numbers.charAt(Math.floor(Math.random() * numbers.length));
		}

		// last symbol - random special char
		password += specialChars.charAt(
			Math.floor(Math.random() * specialChars.length)
		);

		return password;
	}

	const sendEmail = async () => {
		if (!email || email === "") {
			alert("נא להזין כתובת דואר אלקטרוני");
			return;
		}

		tempObject.email = email.trim();

		const user = await volunteersApi.getVolunteer(tempObject);

		if (!user) {
			alert("לא נמצא משתמש עם כתובת דואר אלקטרוני זו");
			return;
		}

		const newPassword = generatePassword();
		user.password = newPassword;

		const updatedUser = await volunteersApi.updateUser(user);
		tempObject.password = newPassword;

		const templateParams = {
			toName: user.name + " " + user.fname,
			email: email,
			newPassword: newPassword,
		};

		emailjs
			.send(
				emailServiceConfig.service_id,
				emailServiceConfig.template_id,
				templateParams,
				{
					publicKey: emailServiceConfig.public_key,
				}
			)
			.then(
				(response) => {
					console.log("SUCCESS!", response.status, response.text);
					alert("הסיסמה נשלחה לדואר אלקטרוני");
				},
				(error) => {
					console.log("FAILED...", error);
				}
			);
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>
				<View>
					<Text style={mainStyles.title}>שחזור סיסמא</Text>
					<Text>הכנס\י כתובת דוא"ל אליו לשלוח סיסמא חדשה:</Text>
				</View>
				<Input onChangeText={setEmail} />
				<Button
					title="שלח סיסמא חדשה"
					buttonStyle={mainStyles.button}
					onPress={sendEmail}
				/>
				<Button
					title="חזור"
					buttonStyle={mainStyles.button}
					onPress={() => {
						navigation.navigate("Login");
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

const tempObject = {
	email: "piter95555@gmail.com",
	password: "e18d20c33fc1860873b0ab34a1915f138d6134141b9bf6a4310340ed2f2d92df",
	name: "star 12345 5",
	fname: "string",
	phone: "string",
	sign: "0001-01-01T00:00:00",
	sunday: false,
	monday: false,
	tuesday: false,
	wednesday: false,
	thursday: false,
	friday: false,
	saturday: false,
	areas: [
		{
			areaNum: 2,
			areaName: "תל-אביב",
		},
	],
	professions: [
		{
			professionNum: 2,
			professionName: "מוזיקה",
			shortDesc: "נגן/זמר",
		},
	],
	activities: [
		{
			activitiesProfessions: [
				{
					professionNum: 1,
					professionName: "צילום",
					shortDesc: "צילום ילדים יפים",
				},
				{
					professionNum: 2,
					professionName: "מוזיקה",
					shortDesc: "נגן/זמר",
				},
				{
					professionNum: 4,
					professionName: "ריקודים",
					shortDesc: "רקדן מקצועי/חובבן",
				},
				{
					professionNum: 9,
					professionName: "איפור",
					shortDesc: "איפור מקצועי/חובבני",
				},
				{
					professionNum: 11,
					professionName: "מורה פרטי",
					shortDesc: "מורה פרטי למקצועות הליבה",
				},
			],
			actNum: 1,
			actName: "צילום",
			shortDesc: "צילום ילדים",
			location: "אילת",
			date: "2024-05-26T00:00:00",
			startHour: "1900-01-01T16:30:00",
			endHour: "1900-01-01T12:00:00",
			amount: 2,
			areaNum: 1,
			employeeID: 1,
			status: false,
			volunteerEmails: [],
		},
		{
			activitiesProfessions: [
				{
					professionNum: 9,
					professionName: "איפור",
					shortDesc: "איפור מקצועי/חובבני",
				},
				{
					professionNum: 10,
					professionName: "שיער",
					shortDesc: "מעצבת פאות",
				},
			],
			actNum: 25,
			actName: "שיער",
			shortDesc: "פאה אישית לכל ילד וילדה",
			location: "חיפה העלייה השנייה 8",
			date: "2024-05-30T00:00:00",
			startHour: "1900-01-01T16:18:24",
			endHour: "1900-01-01T16:18:24",
			amount: 3,
			areaNum: 1,
			employeeID: 1,
			status: true,
			volunteerEmails: [],
		},
	],
	imageBase64: "string",
	volImage: "string",
	status: true,
};

export default ForgotPassword;
