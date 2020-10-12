import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage, googleAuth } = useContext(
    AuthContext
  );

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        errorMessage={state.errorMessage}
        onSubmit={signup}
        submitButtonText="register"
        navLinkSecondaryText="Already have an account?"
        navLinkText="Sign in"
        navLinkRoute="Signin"
        onGoogleSubmit={googleAuth}
      ></AuthForm>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    top: "30%",
  },
});

export default SignupScreen;
