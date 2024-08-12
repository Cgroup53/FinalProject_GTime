import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { Button, Text } from "@rneui/base";
import proposalsApi from "../../api/proposalsApi";
import CreateProposal from "./CreateProposal";
import { UserContext } from "../../context/UserContext";
import ProposalListItem from "./ProposalListItem";

const Proposals = ({ navigation }) => {
	const { user } = useContext(UserContext);
	const [proposals, setProposals] = useState([]);
	const [pageContent, setPageContent] = useState(<></>);
	const [userProposals, setUserProposals] = useState([]);
	const renderProposalsList = () => {
		return (
			<ScrollView contentContainerStyle={[styles.proposalList, {}]}>
				{userProposals.map((proposal, index) => {
					return <ProposalListItem key={index} proposal={proposal} />;
				})}
			</ScrollView>
		);
	};

	const renderMainPageContent = () => {
		return (
			<View style={[styles.pageContainer]}>
				<View style={[styles.container]}>
					{userProposals.length > 0 ? (
						renderProposalsList()
					) : (
						<Text style={mainStyles.plainText}>לא קיימות הצעות</Text>
					)}
				</View>
				<Button
					onPress={() => {
						showCreateProposal();
					}}
					buttonStyle={[mainStyles.button, { width: "100%" }]}
					titleStyle={{ textAlign: "center", width: "100%" }}
					title="צור הצעה חדשה"
				/>
			</View>
		);
	};

	const getProposals = async () => {
		const allProposals = await proposalsApi.getProposals();
		setProposals(allProposals);
		setUserProposals(
			allProposals.filter((proposal) => proposal.email === user.email)
		);
	};

	useEffect(() => {
		getProposals();
	}, []);

	useEffect(() => {
		setPageContent(renderMainPageContent());
	}, [userProposals]);

	const showCreateProposal = () => {
		setPageContent(
			<CreateProposal
				close={() => setPageContent(renderMainPageContent())}
				create={createProposal}
			/>
		);
	};

	const createProposal = async (title, content) => {
		const newProposal = {
			proposalNum: proposals.length + 1,
			proposalName: title,
			shortDesc: content,
			email: user.email,
			proposalProfessions: [],
		};
		// console.log("newProposal", newProposal);
		const response = await proposalsApi.createProposal(newProposal);
		if (response.status === 200) {
			alert("ההצעה נוצרה בהצלחה");
			await getProposals();
		} else {
			alert("ההצעה לא נוצרה בהצלחה");
		}
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<MobileHeader navigation={navigation} />
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={mainStyles.title}>הצעות</Text>
					<Button
						onPress={() => navigation.goBack()}
						buttonStyle={mainStyles.button}
						title="חזור"
					/>
				</View>

				{pageContent}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "rgb(235, 223, 211)",
		// backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		flexGrow: 1,
	},
	header: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	pageContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},

	proposalList: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		gap: 20,
		padding: 20,
		backgroundColor: "rgb(235, 223, 211)",
		width: 370,
		// flex: 1,
		// flexGrow: 1,
	},
});

export default Proposals;
