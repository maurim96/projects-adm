import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";

const ResolveAuthScreen = () => {
  const { checkIfUserIsLoggedInAndCurrentRole } = useContext(AuthContext);

  useEffect(() => {
    async function check() {
      await checkIfUserIsLoggedInAndCurrentRole();
    }
    check();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={StyleSheet.container}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ResolveAuthScreen;
