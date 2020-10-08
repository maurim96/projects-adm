import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage, googleAuth } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        submitButtonText="sign in"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        navLinkText="don't have an account?"
        navLinkRoute="Signup"
        onGoogleSubmit={googleAuth}
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
    flex: 1,
    justifyContent: "center",
  },
});

export default SigninScreen;
