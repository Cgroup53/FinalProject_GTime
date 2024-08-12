import React, { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Input, Text } from "@rneui/base";

const Register = ({ navigation }) => {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleNext = () => {
		if (!verifyInputs()) return;
		navigation.navigate("RegisterStageTwo", {
			name: name.trim(),
			fname: lastName.trim(),
			phone: phone.trim(),
			email: email.trim(),
			password: password.trim(),
		});
	};

	const verifyInputs = () => {
		if (
			name === "" ||
			lastName === "" ||
			phone === "" ||
			email === "" ||
			password === ""
		) {
			alert("נא למלא את כל השדות");
			return false;
		}

		const nameRegex = /^.{1,}$/;

		const phoneRegex = /^[0-9]{10}$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/;

		if (!nameRegex.test(name)) {
			alert("נא להקלד שם תקין");
			return false;
		}
		if (!nameRegex.test(lastName.trim())) {
			alert("נא להקלד שם משפחה תקין");
			return false;
		}
		if (!emailRegex.test(email.trim())) {
			alert("נא להקלד אימייל תקין");
			return false;
		}
		if (!phoneRegex.test(phone.trim())) {
			alert("נא להקלד טלפון תקין");
			return false;
		}
		if (!passwordRegex.test(password.trim())) {
			alert("הסיסמא חייבת להכיל לפחות תו מיוחד אחד");
			return false;
		}
		return true;
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		// <KeyboardAvoidingView>
		<KeyboardAvoidingView
			style={[mainStyles.pageContainer, mainStyles.coloredBackground]}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={mainStyles.elevatedPanel}>
					<View
						style={[
							mainStyles.HorizontalContainerCentered,
							{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							},
						]}
					>
						<Button
							title="חזרה"
							buttonStyle={[mainStyles.button, { width: 80 }]}
							onPress={handleBack}
						/>
						<Text style={mainStyles.title}>הרשמה</Text>
					</View>
					<ScrollView style={mainStyles.form}>
						<Text style={mainStyles.formLabel}>שם פרטי:</Text>
						<Input style={mainStyles.formInput} onChangeText={setName} />
						<Text style={mainStyles.formLabel}>שם משפחה:</Text>
						<Input style={mainStyles.formInput} onChangeText={setLastName} />
						<Text style={mainStyles.formLabel}>טלפון:</Text>
						<Input style={mainStyles.formInput} onChangeText={setPhone} />
						<Text style={mainStyles.formLabel}>אימייל:</Text>
						<Input style={mainStyles.formInput} onChangeText={setEmail} />
						<Text style={mainStyles.formLabel}>סיסמא:</Text>
						<Input style={mainStyles.formInput} onChangeText={setPassword} />
						<Button
							title="המשך"
							buttonStyle={mainStyles.button}
							onPress={handleNext}
						/>
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
			{/* </View> */}
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({});

export default Register;
