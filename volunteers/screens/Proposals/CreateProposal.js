import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Button, Input, Text } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";

const CreateProposal = ({ close, create }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	return (
		<ScrollView style={styles.overlay}>
			<Text style={[mainStyles.title]}>צור הצעה חדשה</Text>
			<View style={[mainStyles.form, { flex: 1 }]}>
				<Text
					style={[mainStyles.formLabel, { textAlign: "right", width: "100%" }]}
				>
					כותרת
				</Text>
				<Input
					style={[mainStyles.formInput, { width: "100%" }]}
					onChangeText={setTitle}
					value={title}
				/>
				<Text style={mainStyles.formLabel}>תוכן</Text>
				<Input
					style={[mainStyles.formInput, styles.proposalContent]}
					onChangeText={setContent}
					value={content}
					multiline
				/>
			</View>
			<View style={styles.buttonPanel}>
				<Button
					title="צור הצעה"
					buttonStyle={[mainStyles.button, { width: "100%" }]}
					titleStyle={{ textAlign: "center", width: "100%" }}
					onPress={() => {
						create(title, content);
						close();
					}}
				/>
				<Button
					title="ביטול"
					buttonStyle={[mainStyles.button, { width: "100%" }]}
					titleStyle={{ textAlign: "center", width: "100%" }}
					onPress={close}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	overlay: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
		backgroundColor: "white",
		width: "100%",
	},
	buttonPanel: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		marginTop: 10,
		width: "100%",
		padding: 10,
	},
	proposalContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		height: 300,
	},
});

export default CreateProposal;
