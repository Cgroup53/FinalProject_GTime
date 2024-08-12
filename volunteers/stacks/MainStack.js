import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Activities from "../screens/Activities";
import MobileHeader from "../components/MobileHeader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Proposals from "../screens/Proposals";
import MyActivities from "../screens/MyActivities";

import clockIcon from "../assets/icons/clock.jpg";
import heartShake from "../assets/icons/heartShake.jpg";
import settingsIcon from "../assets/icons/settings.jpg";

import { Image } from "@rneui/base";

const MainStack = () => {
	const Tab = createBottomTabNavigator();
	const Stack = createNativeStackNavigator();
	const tabIconMap = {
		בית: "home",
		התנדבויות: "heart",
		פרופיל: "account",
		"ההתנדבויות שלי": "clock",
		// זמנים: "calendar",
	};

	const tabImageIcons = {
		בית: undefined,
		התנדבויות: heartShake,
		פרופיל: settingsIcon,
		"ההתנדבויות שלי": clockIcon,
		// זמנים: "calendar",
	};

	const MainTabs = () => {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarActiveTintColor: "rgb(83, 212, 212)",
					tabBarIcon: ({ color, size }) => {
						const iconImage = tabImageIcons[route.name];

						if (!iconImage) {
							const iconName = tabIconMap[route.name];
							return (
								<MaterialCommunityIcons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						}
						return (
							<Image source={iconImage} style={{ width: 30, height: 30 }} />
							// <MaterialCommunityIcons
							// 	name={iconName}
							// 	size={size}
							// 	color={color}
							// />
						);
					},
					// tabBarIcon: ({ color, size }) => {
					// 	const iconName = tabIconMap[route.name];
					// 	return (
					// 		<MaterialCommunityIcons
					// 			name={iconName}
					// 			size={size}
					// 			color={color}
					// 		/>
					// 	);
					// },
				})}
			>
				<Tab.Screen
					options={{ headerShown: false }}
					name="בית"
					component={Home}
				/>

				<Tab.Screen
					options={{ headerShown: false }}
					name="התנדבויות"
					component={Activities}
				/>

				<Tab.Screen
					options={{ headerShown: false }}
					name="ההתנדבויות שלי"
					component={MyActivities}
				/>

				<Tab.Screen
					options={{ headerShown: false }}
					name="פרופיל"
					component={Profile}
				/>

				{/* <Tab.Screen name="התנדבויות" component={Activities} /> */}
			</Tab.Navigator>
		);
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Main"
				component={MainTabs}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="Proposals"
				component={Proposals}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({});

export default MainStack;
