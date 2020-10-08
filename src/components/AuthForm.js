import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Input, Text, Button, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavLink from "../components/NavLink";

const AuthForm = ({
  errorMessage,
  onSubmit,
  submitButtonText,
  navLinkText,
  navLinkRoute,
  onGoogleSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        inputContainerStyle={styles.inputContainer}
        label="Email"
        labelStyle={styles.label}
        leftIcon={<Icon name="person-outline" size={24} color="gray" />}
        leftIconContainerStyle={styles.iconContainer}
        onChangeText={setEmail}
        textContentType="emailAddress"
        value={email}
      />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        inputContainerStyle={styles.inputContainer}
        label="Password"
        labelStyle={styles.label}
        leftIcon={<Icon name="lock-outline" size={24} color="gray" />}
        leftIconContainerStyle={styles.iconContainer}
        onChangeText={setPassword}
        secureTextEntry
        value={password}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Button
        buttonStyle={styles.regularLoginButton}
        title={submitButtonText}
        titleStyle={styles.buttonText}
        onPress={() => onSubmit({ email, password })}
      />
      <Divider style={styles.divider} />
      <TouchableOpacity
        style={styles.googleLoginButton}
        activeOpacity={0.5}
        onPress={onGoogleSubmit}
      >
        <Image
          source={require("../../assets/google.png")}
          style={styles.googleIcon}
        />
        <Text style={[styles.buttonText, styles.googleLoginButtonText]}>
          {" "}
          {submitButtonText} WITH GOOGLE{" "}
        </Text>
      </TouchableOpacity>
      <NavLink
        text={navLinkText}
        routeName={navLinkRoute}
        customStyles={styles.link}
      ></NavLink>
    </>
  );
};

const styles = StyleSheet.create({
  regularLoginButton: {
    marginHorizontal: 10,
    borderRadius: 20,
    height: 55,
  },
  buttonText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  googleLoginButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: "gray",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: 55,
    marginHorizontal: 10,
  },
  googleLoginButtonText: {
    color: "gray",
    marginLeft: 10,
  },
  googleIcon: {
    height: 30,
    width: 30,
  },
  divider: {
    backgroundColor: "gray",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  errorMessage: {
    fontSize: 15,
    color: "red",
    marginLeft: 10,
    marginBottom: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  },
  iconContainer: {
    borderRightWidth: 1,
    borderColor: "lightgray",
    marginRight: 10,
    width: "15%",
    left: 5,
  },
  label: {
    color: "gray",
    fontSize: 15,
    left: 15,
    marginBottom: 8,
    fontWeight: "500",
  },
  link: {
    textTransform: "uppercase",
    textAlign: "center",
    marginTop: 30,
  },
});

export default AuthForm;
