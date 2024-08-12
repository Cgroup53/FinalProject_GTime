import { Image } from "@rneui/base";
import {
	CameraView,
	useCameraPermissions,
	takePictureAsync,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CameraComponent({ setTakenPicture }) {
	const cameraRef = useRef();
	const [facing, setFacing] = useState("front");
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	async function takePicture() {
		if (!cameraRef.current) {
			return;
		}

		const options = { quality: 0.5, base64: true };
		const picture = await cameraRef.current.takePictureAsync(options);
		setTakenPicture(picture);
	}

	return (
		<CameraView ref={cameraRef} style={styles.camera} facing={facing}>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.flipBtn]}
					onPress={toggleCameraFacing}
				>
					<MaterialCommunityIcons name={"camera"} size={50} color={"white"} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={takePicture}>
					<MaterialCommunityIcons name={"circle"} size={100} color={"white"} />
				</TouchableOpacity>
			</View>
		</CameraView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
		width: "100%",
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	preview: {
		width: 100,
		height: 100,
	},
	flipBtn: {
		position: "absolute",
		left: 0,
		top: 0,
		width: 50,
		height: 50,
		// backgroundColor: "white",
	},
});
