import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import { Text } from "@rneui/base";

const ProposalListItem = ({ proposal }) => {
	const [showFullText, setShowFullText] = useState(false);

	const showText = () => {
		if (showFullText) {
			return (
				<Text
					style={{
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
					}}
				>
					{proposal.shortDesc}
				</Text>
			);
		} else {
			const displayText =
				proposal.shortDesc.length >= 50
					? proposal.shortDesc.slice(0, 50) + "..."
					: proposal.shortDesc;
			return <Text>{displayText}</Text>;
		}
	};

	return (
		<TouchableOpacity
			onPress={() => setShowFullText(!showFullText)}
			style={[mainStyles.elevatedPanel, styles.proposalItem]}
		>
			<View>
				<Text style={{ fontWeight: "bold", fontSize: 18 }}>
					{proposal.proposalName}
				</Text>

				<Text
					style={{
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
					}}
				>
					{showText()}
				</Text>
			</View>
			<View>
				<Text>{proposal.status ? "👍" : ""}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	proposalItem: {
		width: "100%",
		display: "flex",
	},
});

export default ProposalListItem;
