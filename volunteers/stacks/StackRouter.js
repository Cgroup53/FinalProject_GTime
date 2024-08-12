import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { UserContext } from "../context/UserContext";
import LoginStack from "./LoginStack";
import MainStack from "./MainStack";

const StackRouter = () => {
	const { user } = useContext(UserContext);
	return <>{(user && <MainStack />) || <LoginStack />}</>;
};

const styles = StyleSheet.create({});

export default StackRouter;
