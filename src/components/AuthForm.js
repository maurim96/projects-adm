import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Input, Text, Button, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavLink from "../components/NavLink";
import CustomInput from "../components/CustomInput";

const AuthForm = ({
  errorMessage,
  onSubmit,
  submitButtonText,
  navLinkText,
  navLinkSecondaryText,
  navLinkRoute,
  onGoogleSubmit,
  allowRecoverPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <CustomInput
        label="Email"
        icon="person-outline"
        onChangeText={setEmail}
        textContentType="emailAddress"
        value={email}
      />
      <CustomInput
        label="Password"
        icon="lock-outline"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      {allowRecoverPassword ? (
        <NavLink text="Forgot Password?" customStyles={styles.forgotPassword} />
      ) : null}
      <Button
        buttonStyle={styles.button}
        title={submitButtonText}
        titleStyle={styles.buttonText}
        onPress={() => onSubmit({ email, password })}
      />
      {navLinkRoute === "Signup" ? (
        <>
          <Divider style={styles.divider} />
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            activeOpacity={0.5}
            onPress={onGoogleSubmit}
          >
            <Image
              source={require("../../assets/google.png")}
              style={styles.googleIcon}
            />
            <Text style={[styles.buttonText, styles.googleButtonText]}>
              Log in with google
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      <NavLink
        text={navLinkText}
        secondaryText={navLinkSecondaryText}
        routeName={navLinkRoute}
        customStyles={styles.link}
      ></NavLink>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: "2%",
    borderRadius: 20,
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  googleButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "lightgray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "gray",
    marginLeft: "2%",
  },
  googleIcon: {
    height: 30,
    width: 30,
  },
  divider: {
    backgroundColor: "lightgray",
    marginHorizontal: "2%",
    marginVertical: "5%",
  },
  errorMessage: {
    fontSize: 15,
    color: "red",
    marginLeft: "2%",
    marginBottom: "1%",
    top: "-2%"
  },
  forgotPassword: {
    justifyContent: "flex-end",
    marginBottom: "2%",
    marginRight: "2%",
    textAlign: "right",
    top: "-2%",
  },
  link: {
    marginTop: "5%",
    justifyContent: "center",
  },
});

export default AuthForm;
