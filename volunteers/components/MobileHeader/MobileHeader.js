import React, { useContext } from "react";
import {
	Image,
	StyleSheet,
	Touchable,
	TouchableOpacity,
	View,
} from "react-native";
import { Text } from "@rneui/base";
import { UserContext } from "../../context/UserContext";
import mainStyles from "../../styles/mainStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import logoutImg from "../../assets/icons/exit.jpg";
import ideas from "../../assets/icons/ideas.jpg";

const MobileHeader = ({ navigation }) => {
	const { removeUser } = useContext(UserContext);

	const handleLogOut = () => {
		removeUser();
	};

	return (
		<View style={mainStyles.navbarContainer}>
			<View style={mobileHeaderStyles.leftContainer}>
				<Image
					source={require("../../assets/logo.jpg")}
					style={[mainStyles.logo, { width: 30, height: 30 }]}
				/>
				<View onTouchStart={handleLogOut}>
					<Image source={logoutImg} style={{ width: 30, height: 30 }} />
					{/* <MaterialCommunityIcons name={"logout"} size={30} color={"black"} /> */}
				</View>
			</View>
			<View style={mobileHeaderStyles.rightContainer}>
				<TouchableOpacity onPress={() => navigation.navigate("Proposals")}>
					<Image source={ideas} style={{ width: 30, height: 30 }} />
					{/* <MaterialCommunityIcons
						name={"lightbulb-on-outline"}
						size={30}
						color={"black"}
					/> */}
				</TouchableOpacity>
				<View>
					{/* <MaterialCommunityIcons name={"message"} size={30} color={"black"} /> */}
				</View>
			</View>
		</View>
	);
};

const mobileHeaderStyles = StyleSheet.create({
	leftContainer: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		gap: 10,
	},
	rightContainer: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		paddingRight: 10,
		gap: 10,
	},
});
export default MobileHeader;
