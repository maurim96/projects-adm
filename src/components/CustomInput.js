import React from "react";
import { StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";

const CustomInput = ({
  label,
  icon,
  textContentType,
  value,
  onChangeText,
  secureTextEntry,
  placeholder,
  editable,
  required,
  keyboardType
}) => {
  return (
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      inputContainerStyle={styles.inputContainer}
      label={required ? `${label}*` : `${label}`}
      labelStyle={styles.label}
      leftIcon={<Icon name={icon} size={24} color="gray" />}
      leftIconContainerStyle={styles.iconContainer}
      textContentType={textContentType}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      editable={editable}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  },
  label: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
    left: "1%",
    marginBottom: "2%",
    textTransform: "capitalize",
  },
  iconContainer: {
    borderRightWidth: 1,
    borderColor: "lightgray",
    left: "10%",
    marginRight: "3%",
    width: "15%",
  },
});

export default CustomInput;
