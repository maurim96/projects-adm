import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName, customStyles }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={[styles.link, customStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default withNavigation(NavLink);
