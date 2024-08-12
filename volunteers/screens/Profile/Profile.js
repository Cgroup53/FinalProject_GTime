import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/mainStyles";
import MobileHeader from "../../components/MobileHeader";
import { UserContext } from "../../context/UserContext";
import { Button, Image, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import volunteersApi from "../../api/volunteersApi";
import professionsApi from "../../api/professionsApi";
import areasApi from "../../api/areasApi";

const Profile = ({ navigation }) => {
	const [editInfoMode, setEditInfoMode] = useState(false);
	const { user, saveUser } = useContext(UserContext);

	const [userName, setUserName] = useState(user.name);
	const [userFname, setUserFname] = useState(user.fname);
	const [userPhone, setUserPhone] = useState(user.phone);

	const [passwordChange, setPasswordChange] = useState(null);

	const [editWorkDays, setEditWorkDays] = useState(false);
	const [sunday, setSunday] = useState(user.sunday);
	const [monday, setMonday] = useState(user.monday);
	const [tuesday, setTuesday] = useState(user.tuesday);
	const [wednesday, setWednesday] = useState(user.wednesday);
	const [thursday, setThursday] = useState(user.thursday);
	const [friday, setFriday] = useState(user.friday);
	const [saturday, setSaturday] = useState(user.saturday);

	const [editProfessions, setEditProfessions] = useState(false);
	const [editAreas, setEditAreas] = useState(false);

	const [areasShown, setAreasShown] = useState(false);
	const [professionsShown, setProfessionsShown] = useState(false);

	const [areasData, setAreasData] = useState([]);
	const [professionsData, setProfessionsData] = useState([]);

	useEffect(() => {
		updateAreasData();
		updateProfessionsData();
		return () => {};
	}, []);

	const updateAreasData = async () => {
		const data = await areasApi.getAreas();
		setAreasData(
			data.map((area) => ({ label: area.areaName, value: area.areaNum }))
		);
	};

	const updateProfessionsData = async () => {
		const data = await professionsApi.getProfessions();
		setProfessionsData(
			data.map((profession) => ({
				label: profession.professionName,
				value: profession.professionNum,
			}))
		);
	};

	const renderProfileEditForm = () => {
		if (!editInfoMode) {
			return <></>;
		}
		return (
			<View style={[mainStyles.form, styles.infoContainer]}>
				<Text style={[]}>שם:</Text>
				<Input editable={editInfoMode} onChangeText={setUserName} style={[]}>
					{user.name}
				</Input>

				<Text editable={editInfoMode} style={mainStyles.formLabel}>
					שם משפחה:
				</Text>
				<Input
					editable={editInfoMode}
					onChangeText={setUserFname}
					style={mainStyles.formInput}
				>
					{user.fname}
				</Input>
				{/* <Text style={mainStyles.formLabel}>אימייל:</Text>
				<Input editable={editInfoMode} style={mainStyles.formInput}>
					{user.email}
				</Input> */}
				<Text style={mainStyles.formLabel}>טלפון:</Text>
				<Input
					editable={editInfoMode}
					onChangeText={setUserPhone}
					style={mainStyles.formInput}
				>
					{user.phone}
				</Input>

				<Text>סיסמא חדשה:</Text>
				<Input
					onChangeText={setPasswordChange}
					editable={editInfoMode}
					style={mainStyles.formInput}
				/>

				<Button title="עדכן פרטים" onPress={() => submitChanges()} />
			</View>
		);
	};

	const submitChanges = async () => {
		user.name = userName.trim();
		user.fname = userFname.trim();
		user.phone = userPhone.trim();
		if (passwordChange && passwordChange.length > 0) {
			user.password = passwordChange;
		}
		const res = await volunteersApi.updateUser(user);

		if (res.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}

		setEditInfoMode(false);
	};

	const createProfessionSelection = () => {
		const filteredProfessions = professionsData.filter((profession) => {
			for (let i = 0; i < user.professions.length; i++) {
				if (profession.value === user.professions[i].professionNum) {
					return false;
				}
			}
			return true;
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
							onPress={() => addVolunteerProfession(profession.value)}
							containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
							titleStyle={[{ color: "black" }]}
							// containerStyle={[styles.selectButton]}
							// titleStyle={[styles.selectButtonTextStyle]}
							// buttonStyle={[styles.selectButton]}
						/>
					);
				})}
			</ScrollView>
		);
	};

	const createAreaSelection = () => {
		const filteredAreas = areasData.filter((area) => {
			for (let i = 0; i < user.areas.length; i++) {
				if (area.value === user.areas[i].areaNum) {
					return false;
				}
			}
			return true;
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
							onPress={() => addVolunteerArea(area.value)}
							containerStyle={[{ width: 250, margin: 5, borderRadius: 10 }]}
							titleStyle={[{ color: "black" }]}
						/>
					);
				})}
			</ScrollView>
		);
	};

	const addVolunteerArea = async (areaNum) => {
		const response = await volunteersApi.addVolunteerArea(user, areaNum);
		if (response.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}
	};

	const addVolunteerProfession = async (professionNum) => {
		const response = await volunteersApi.addVolunteerProfession(
			user,
			professionNum
		);

		if (response.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}
	};

	const removeUserProfession = async (profession) => {
		const response = await volunteersApi.removeVolunteerProfession(
			user,
			profession
		);
		if (response.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}
	};

	const renderUserProfessions = () => {
		return (
			<ScrollView contentContainerStyle={[styles.tagContainer]}>
				{user.professions.map((profession) => {
					return (
						<TouchableOpacity key={profession.professionNum} style={styles.tag}>
							{editProfessions && (
								<TouchableOpacity
									style={styles.closeTag}
									onPress={() => removeUserProfession(profession.professionNum)}
								>
									<Text style={styles.closeTag}>✖️</Text>
								</TouchableOpacity>
							)}
							<Text style={{ color: "white" }}>
								{profession.professionName}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const renderUserAreas = () => {
		return (
			<ScrollView contentContainerStyle={[styles.tagContainer]}>
				{user.areas.map((area) => {
					return (
						<TouchableOpacity key={area.areaNum} style={styles.tag}>
							{editAreas && (
								<TouchableOpacity
									style={styles.closeTag}
									onPress={() => removeUserArea(area.areaNum)}
								>
									<Text style={styles.closeTag}>✖️</Text>
								</TouchableOpacity>
							)}
							<Text style={{ color: "white" }}>{area.areaName}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	};

	const removeUserArea = async (areaNum) => {
		const response = await volunteersApi.removeVolunteerArea(user, areaNum);
		if (response.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}
	};

	const saveEditedWorkDays = async () => {
		user.sunday = sunday;
		user.monday = monday;
		user.tuesday = tuesday;
		user.wednesday = wednesday;
		user.thursday = thursday;
		user.friday = friday;
		user.saturday = saturday;
		const res = await volunteersApi.updateUser(user);
		if (res.status === 200) {
			const updatedUser = await volunteersApi.getVolunteer(user);
			await saveUser(updatedUser);
		}
	};

	const renderPageContent = () => {
		return (
			<View
				style={[
					mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{
						display: "flex",
						flexDirection: "column",
					},
				]}
			>
				<MobileHeader navigation={navigation} />
				<View style={[styles.container]}>
					<Text style={[mainStyles.title, styles.header]}>פרטי פרופיל:</Text>
					<View style={mainStyles.container}></View>
				</View>

				<ScrollView contentContainerStyle={[styles.contentContainer]}>
					<View style={[mainStyles.form, styles.infoContainer]}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								flex: 1,
							}}
						>
							<View
								style={{ display: "flex", flexDirection: "column", gap: 10 }}
							>
								<Button
									onPress={() => setEditInfoMode(!editInfoMode)}
									title={editInfoMode ? "📕" : "🖋️"}
									titleStyle={{
										textAlign: "center",
										// width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										fontSize: 15,
									}}
									containerStyle={[
										{
											width: 40,
											borderRadius: 10,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										},
									]}
								/>

								<Image
									source={{
										uri: `https://proj.ruppin.ac.il/cgroup53/test2/tar1/${user.volImage}`,
									}}
									containerStyle={styles.photoView}
									style={{ width: 100, height: 100 }}
								/>
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 10,
									flex: 1,
								}}
							>
								<Text style={mainStyles.formLabel}>
									{user.fname} {user.name}
								</Text>
								<Text style={[mainStyles.formLabel, { fontSize: 15 }]}>
									{user.email}
								</Text>
								<Text style={mainStyles.formLabel}>{user.phone}</Text>
							</View>
						</View>
					</View>

					{renderProfileEditForm()}

					<View
						style={[
							mainStyles.elevatedPanel,
							styles.infoContainer,
							{ flex: 0.7 },
						]}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Button
								onPress={() => {
									setEditWorkDays(!editWorkDays);
								}}
								title={editWorkDays ? "📕" : "🖋️"}
								titleStyle={{
									textAlign: "center",
									// width: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: 15,
								}}
								containerStyle={[
									{
										width: 40,
										borderRadius: 10,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: editWorkDays ? "green" : "white",
									},
								]}
							/>
							<Text style={mainStyles.formLabel}>ימי התנדבות:</Text>
						</View>
						<View
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-evenly",
								flexDirection: "row-reverse",
								gap: 10,
							}}
						>
							<Text
								onPress={() => {
									editWorkDays && setSunday(!sunday);
								}}
								style={[styles.dayStyle, sunday && styles.selectedDate]}
							>
								א
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setMonday(!monday);
								}}
								style={[styles.dayStyle, monday && styles.selectedDate]}
							>
								ב
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setTuesday(!tuesday);
								}}
								style={[styles.dayStyle, tuesday && styles.selectedDate]}
							>
								ג
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setWednesday(!wednesday);
								}}
								style={[styles.dayStyle, wednesday && styles.selectedDate]}
							>
								ד
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setThursday(!thursday);
								}}
								style={[styles.dayStyle, thursday && styles.selectedDate]}
							>
								ה
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setFriday(!friday);
								}}
								style={[styles.dayStyle, friday && styles.selectedDate]}
							>
								ו
							</Text>
							<Text
								onPress={() => {
									editWorkDays && setSaturday(!saturday);
								}}
								style={[styles.dayStyle, saturday && styles.selectedDate]}
							>
								ש
							</Text>
						</View>
						{editWorkDays && (
							<Button title="שמור שינויים" onPress={saveEditedWorkDays} />
						)}
					</View>
					<View style={[styles.infoContainer]}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<Button
									onPress={() => {
										setEditProfessions(!editProfessions);
									}}
									title={editProfessions ? "📕" : "🖋️"}
									titleStyle={{
										textAlign: "center",
										// width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										fontSize: 15,
									}}
									containerStyle={[
										{
											width: 40,
											borderRadius: 10,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: editWorkDays ? "green" : "white",
										},
									]}
								/>
								<Button
									titleStyle={{
										textAlign: "center",
										// width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										fontSize: 15,
									}}
									containerStyle={[
										{
											width: 40,
											borderRadius: 10,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: editWorkDays ? "green" : "white",
										},
									]}
									onPress={() => setProfessionsShown(true)}
									title="➕"
								/>
							</View>
							<Text style={mainStyles.formLabel}>התמחויות:</Text>
						</View>
						{renderUserProfessions()}
					</View>
					<View style={[styles.infoContainer]}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<Button
									onPress={() => {
										setEditAreas(!editAreas);
									}}
									title={editWorkDays ? "📕" : "🖋️"}
									titleStyle={{
										textAlign: "center",
										// width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										fontSize: 15,
									}}
									containerStyle={[
										{
											width: 40,
											borderRadius: 10,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: editWorkDays ? "green" : "white",
										},
									]}
								/>
								<Button
									titleStyle={{
										textAlign: "center",
										// width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										fontSize: 15,
									}}
									containerStyle={[
										{
											width: 40,
											borderRadius: 10,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: editWorkDays ? "green" : "white",
										},
									]}
									onPress={() => setAreasShown(true)}
									title="➕"
								/>
							</View>
							<Text style={mainStyles.formLabel}>אזורי פעילות:</Text>
						</View>

						{renderUserAreas()}
					</View>
				</ScrollView>
			</View>
		);
	};

	const renderProfessionsSelection = () => {
		return (
			<View
				style={[
					mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{
						display: "flex",
						flexDirection: "column",
					},
				]}
			>
				<MobileHeader navigation={navigation} />
				{createProfessionSelection()}
			</View>
		);
	};

	const renderAreasSelection = () => {
		return (
			<View
				style={[
					mainStyles.pageContainer,
					mainStyles.coloredBackground,
					{
						display: "flex",
						flexDirection: "column",
					},
				]}
			>
				<MobileHeader navigation={navigation} />
				{createAreaSelection()}
			</View>
		);
	};

	const determinePageContent = () => {
		if (professionsShown) return renderProfessionsSelection();
		if (areasShown) return renderAreasSelection();
		else return renderPageContent();
	};

	return <>{determinePageContent()}</>;
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		width: "100%",
	},
	contentContainer: {
		// flex: 1,
		// display: "flex",
		// flexDirection: "column",
		// alignItems: "center",
		// gap: 10,
		// padding: 5,

		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		gap: 10,
	},
	infoContainer: {
		// display: "flex",
		// flexDirection: "column",
		// justifyContent: "start",
		// flex: 1,
		// width: 350,
		// padding: 5,
		// backgroundColor: "white",
		// borderRadius: 10,
		// gap: 10,
		// elevation: 5,

		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		flex: 1,
		width: "100%",
		padding: 10,
		backgroundColor: "white",
		elevation: 5,
		paddingHorizontal: 20,
		borderRadius: 10,
		gap: 10,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		width: "100%",
		backgroundColor: "white",
	},
	dayStyle: {
		textAlign: "center",
		fontSize: 20,
	},
	selectedDate: {
		textDecorationLine: "underline",
		fontWeight: "bold",
	},
	areasContainer: {
		// display: "flex",
		// alignItems: "flex-end",
		// justifyContent: "start",
		// flexWrap: "wrap",
		// padding: 1,
		// gap: 10,

		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "start",
		flex: 1,
		width: "100%",
		// backgroundColor: "white",
		gap: 10,
	},
	tag: {
		backgroundColor: "rgba(0, 0, 255, 0.8)",
		color: "white",
		fontSize: 15,
		padding: 10,
		borderRadius: 10,
		fontWeight: "bold",
		width: 100,
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	photoView: {
		width: 100,
		height: 100,
		borderRadius: 200,
		borderColor: "rgba(0, 0, 255, 0.5)",
		elevation: 15,
		borderWidth: 2,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	closeTag: {
		color: "red",
		fontSize: 20,
		display: "flex",
		flexDirection: "row-reverse",
	},
	dayContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		flexWrap: "wrap",
		justifyContent: "space-between",
		width: "100%",
		height: "fit-content",
	},
	tagContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 10,
		flexWrap: "wrap",
	},
	listStyle: { flex: 1, display: "flex", flexDirection: "column", gap: 15 },
	// selectButton: {
	// 	width: "100%",
	// 	backgroundColor: "rgba(255, 255, 255, 0.8)",
	// 	padding: 5,
	// 	borderRadius: 10,
	// 	alignItems: "center",
	// },
	// selectButtonTextStyle: {
	// 	fontSize: 20,
	// 	fontWeight: "bold",
	// 	backgroundColor: "rgba(255, 255, 255, 0.8)",
	// },
});

export default Profile;
