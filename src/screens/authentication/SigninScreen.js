import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage, googleAuth } = useContext(
    AuthContext
  );

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        submitButtonText="sign in"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        navLinkSecondaryText="Don't have an account?"
        navLinkText="Sign Up"
        navLinkRoute="Signup"
        onGoogleSubmit={googleAuth}
        allowRecoverPassword={true}
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    top: "30%",
  },
});

export default SigninScreen;
