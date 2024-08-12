import { Input, Text } from "@rneui/themed";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Image } from "@rneui/base";
import { UserContext } from "../../context/UserContext";
import mainStyles from "../../styles/mainStyles";
import volunteersApi from "../../api/volunteersApi";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, saveUser } = useContext(UserContext);
	const goToRegister = () => {
		navigation.navigate("Register");
	};

	const goToForgotPassword = () => {
		navigation.navigate("ForgotPassword");
	};

	const login = async () => {
		if (!verifyLoginInputs()) return;
		const response = await volunteersApi.login(email, password);

		if (response.status === 200) {
			const userData = await response.json();
			const allVolunteers = await volunteersApi.getAllVolunteers();
			const actualUser = allVolunteers.find(
				(volunteer) => volunteer.email === userData.email
			);
			actualUser.imageBase64 = "string";
			saveUser(actualUser);
		} else {
			alert("המשתמש או הסיסמה אינם תקינים");
		}
	};

	const verifyLoginInputs = () => {
		if (email === "" || password === "") {
			alert("נא למלא את כל השדות");
			return false;
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{1,}$/;

		if (!emailRegex.test(email)) {
			alert("נא להקלד אימייל תקין");
			return false;
		}

		// if (!passwordRegex.test(password.trim())) {
		// 	alert("הסיסמה חייבת להכיל לפחות אות אחת וסימן מיוחד");
		// 	return false;
		// }

		return true;
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>
				<View style={[mainStyles.HorizontalContainerCentered]}>
					<Image
						source={require("../../assets/logo.jpg")}
						style={[mainStyles.logo]}
					/>
					<View>
						<Text style={mainStyles.title}>גדולים מהחיים</Text>
						<Text style={mainStyles.title}>מתנדבים</Text>
					</View>
				</View>
				<View style={mainStyles.form}>
					<Text style={mainStyles.formLabel}>אימייל:</Text>
					<Input
						defaultValue={email}
						style={mainStyles.formInput}
						onChangeText={(text) => setEmail(text.trim())}
					/>
					<Text style={mainStyles.formLabel}>סיסמא:</Text>
					<Input
						secureTextEntry={true}
						defaultValue={password}
						style={mainStyles.formInput}
						onChangeText={(text) => setPassword(text.trim())}
					/>
				</View>

				<TouchableOpacity
					onPress={goToForgotPassword}
					style={{ marginBottom: 10 }}
				>
					<Text style={mainStyles.link}>שכחתי סיסמא</Text>
				</TouchableOpacity>

				<Button
					onPress={login}
					title="התחברות"
					buttonStyle={mainStyles.button}
				/>
				<View>
					<Text style={{ textAlign: "center" }}>
						אין לך חשבון ?{" "}
						<Text onPress={goToRegister} style={mainStyles.link}>
							הרשם
						</Text>
					</Text>
					{/* <Button
						title="הרשמה"
						buttonStyle={mainStyles.button}
						onPress={() => navigation.navigate("Register")}
					/> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Login;
