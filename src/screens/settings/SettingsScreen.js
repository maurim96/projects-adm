import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import { withNavigation } from "react-navigation";

const SettingsScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 36 }}>Settings</Text>
      <TouchableOpacity
        style={styles.option}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.optionText}>View Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        activeOpacity={0.5}
        onPress={signout}
      >
        <Text style={[styles.optionText, styles.signOutText]}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  option: {
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 20,
  },
  signOutText: {
    color: "red",
  },
});

export default withNavigation(SettingsScreen);
