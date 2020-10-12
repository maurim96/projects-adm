import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ResolveAuthScreen = () => {
  const { checkIfUserIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <View style={StyleSheet.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ResolveAuthScreen;
