import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { withNavigation } from "react-navigation";

const CustomerDashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>Customer Dashboard</Text>
    </SafeAreaView>
  );
};

CustomerDashboardScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});

export default withNavigation(CustomerDashboardScreen);
