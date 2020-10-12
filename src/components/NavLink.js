import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({
  navigation,
  text,
  secondaryText,
  routeName,
  customStyles,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <View style={[styles.container, customStyles]}>
        {secondaryText ? <Text style={styles.secondaryText}>{secondaryText}</Text> : null}
        <Text style={[styles.link]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "center",
  },
  link: {
    color: "blue",
  },
  secondaryText: {
    marginRight: 3
  }
});

export default withNavigation(NavLink);
