import { Button, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import mainStyles from "../../styles/mainStyles";

import DropDownPicker from "react-native-dropdown-picker";
import professionsApi from "../../api/professionsApi";
import areasApi from "../../api/areasApi";

const RegisterStageTwo = ({ route, navigation }) => {
	const [areasShown, setAreasShown] = useState(false);
	const [professionsShown, setProfessionsShown] = useState(false);
	const [daysSelected, setDaysSelected] = useState({
		א: false,
		ב: false,
		ג: false,
		ד: false,
		ה: false,
		ו: false,
		ש: false,
	});

	const [areaData, setAreaData] = useState([]);

	const [selectedAreas, setSelectedAreas] = useState([]);

	const [professionsData, setProfessionsData] = useState([]);

	const [selectedProfessions, setSelectedProfessions] = useState([]);

	const updateAreasData = async () => {
		const data = await areasApi.getAreas();
		setAreaData(
			data.map((area) => ({ label: area.areaName, value: area.areaNum }))
		);
	};

	const updateProfessionsData = async () => {
		const data = await professionsApi.getProfessions();
		setProfessionsData(
			data.map((profession) => ({
				label: profession.professionName,
				value: profession.professionNum,
				shortDesc: profession.shortDesc,
			}))
		);
	};

	useEffect(() => {
		updateAreasData();
		updateProfessionsData();
		return () => {};
	}, []);

	const createDaysSelection = () => {
		const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
		return (
			<View style={styles.dayContainer}>
				{days.map((day) => (
					<Text
						key={day}
						style={[
							mainStyles.formLabel,
							{ fontSize: 22 },
							daysSelected[day]
								? { color: "black", textDecorationLine: "underline" }
								: {},
						]}
						onPress={() => {
							setDaysSelected({
								...daysSelected,
								[day]: !daysSelected[day],
							});
						}}
					>
						{day}
					</Text>
				))}
			</View>
		);
	};

	const showSelectedAreas = () => {
		return (
			<View style={styles.tagContainer}>
				{selectedAreas.map((area, index) => (
					<View key={index} style={[styles.areaTag]}>
						<Text
							onPress={() => {
								setSelectedAreas(
									selectedAreas.filter((a) => a.value !== area.value)
								);
							}}
							style={styles.closeTag}
						>
							x
						</Text>
						<Text
							style={{ display: "flex", alignItems: "center", color: "white" }}
						>
							{area.label}
						</Text>
					</View>
				))}
			</View>
		);
	};

	const showSelectedProfessions = () => {
		return (
			<View style={styles.tagContainer}>
				{selectedProfessions.map((profession) => (
					<View key={profession.label} style={[styles.areaTag]}>
						<Text
							onPress={() => {
								setSelectedProfessions(
									selectedProfessions.filter(
										(a) => a.value !== profession.value
									)
								);
							}}
							style={styles.closeTag}
						>
							x
						</Text>
						<Text
							style={{ display: "flex", alignItems: "center", color: "white" }}
						>
							{profession.label}
						</Text>
					</View>
				))}
			</View>
		);
	};

	const verifyInputs = () => {
		let allFalse = true;
		for (let day in daysSelected) {
			if (daysSelected[day] === true) {
				allFalse = false;
			}
		}

		if (allFalse) {
			alert("נא לבחור לפחות יום אחד");
			return false;
		}

		if (selectedAreas.length === 0) {
			alert("נא לבחור לפחות אזור אחד");
			return false;
		}

		if (selectedProfessions.length === 0) {
			alert("נא לבחור לפחות התמחות אחת");
			return false;
		}

		return true;
	};

	const handleNext = () => {
		if (!verifyInputs()) return;
		const areas = selectedAreas.map((area) => {
			return {
				areaName: area.label,
				areaNum: area.value,
			};
		});
		const professions = selectedProfessions.map((profession) => {
			return {
				professionName: profession.label,
				professionNum: profession.value,
				shortDesc: profession.shortDesc,
			};
		});
		navigation.navigate("RegisterStageThree", {
			...route.params, // name, lastName, phone, email, password
			sunday: daysSelected["א"],
			monday: daysSelected["ב"],
			tuesday: daysSelected["ג"],
			wednesday: daysSelected["ד"],
			thursday: daysSelected["ה"],
			friday: daysSelected["ו"],
			saturday: daysSelected["ש"],
			areas,
			professions,
		});
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const createProfessionSelection = () => {
		const filteredProfessions = professionsData.filter((profession) => {
			return !selectedProfessions.some((selectedProfession) => {
				return selectedProfession.value === profession.value;
			});
		});

		return (
			<ScrollView style={styles.listStyle}>
				<Button
					title="חזרה"
					onPress={() => setProfessionsShown(!professionsShown)}
					style={[styles.selectButton]}
					containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
				/>
				{filteredProfessions.map((profession) => {
					return (
						<Button
							key={profession.value}
							title={profession.label}
							onPress={() => {
								selectedProfessions.push(profession);
								setProfessionsShown(!professionsShown);
							}}
							containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
							titleStyle={[{ color: "white" }]}
						/>
					);
				})}
			</ScrollView>
		);
	};

	const createAreaSelection = () => {
		const filteredAreas = areaData.filter((area) => {
			return !selectedAreas.some((selectedArea) => {
				return selectedArea.value === area.value;
			});
		});

		return (
			<ScrollView style={styles.listStyle}>
				<Button
					title="חזרה"
					onPress={() => setAreasShown(!areasShown)}
					style={[styles.selectButton]}
					containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
				/>
				{filteredAreas.map((area) => {
					return (
						<Button
							key={area.value}
							title={area.label}
							onPress={() => {
								selectedAreas.push(area);
								setAreasShown(!areasShown);
							}}
							containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
							titleStyle={[{ color: "white" }]}
						/>
					);
				})}
			</ScrollView>
		);
	};

	const renderPageContent = () => {
		if (professionsShown) return createProfessionSelection();
		if (areasShown) return createAreaSelection();
		return (
			<>
				<Button
					title="חזרה"
					buttonStyle={[mainStyles.button, { width: 80 }]}
					onPress={handleBack}
				/>
				<Text style={mainStyles.title}>השלמת פרטי הרשמה</Text>
				<Text style={mainStyles.formLabel}>
					סמן\י את ימי ההתנדבות הרלוונטיים עבורך:
				</Text>
				{createDaysSelection()}

				<Text style={[mainStyles.formLabel]}>
					בחר\י את האזורים להתנדבות הרלוונטיים עבורך:
				</Text>
				<Button title="➕" onPress={() => setAreasShown(!areasShown)} />
				<ScrollView style={{ maxHeight: 100 }}>
					{showSelectedAreas()}
				</ScrollView>

				<Text style={[mainStyles.formLabel]}>
					בחר\י את התפקידים הרלוונטיים להתנדבות:
				</Text>

				<Button
					title="➕"
					onPress={() => setProfessionsShown(!professionsShown)}
				/>
				<ScrollView style={{ maxHeight: 100 }}>
					{showSelectedProfessions()}
				</ScrollView>

				<Button
					title="המשך"
					buttonStyle={mainStyles.button}
					onPress={handleNext}
				/>
			</>
		);
	};

	return (
		<View style={[mainStyles.pageContainer, mainStyles.coloredBackground]}>
			<View style={mainStyles.elevatedPanel}>{renderPageContent()}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dayContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		flexWrap: "wrap",
		justifyContent: "space-between",
		width: "100%",
		// zIndex: 1,
		// elevation: 1,
	},
	tagContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 10,
		flexWrap: "wrap",
	},
	areaTag: {
		display: "flex",
		flexDirection: "row-reverse",
		alignItems: "center",
		backgroundColor: "blue",
		alignItems: "center",
		borderRadius: 10,
		padding: 10,
	},
	closeTag: {
		color: "red",
		fontSize: 25,
		marginLeft: 10,
	},
});

export default RegisterStageTwo;
