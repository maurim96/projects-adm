import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";

import FirebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";
import "firebase/firestore";

import { Provider as AuthProvider } from "./src/context/AuthContext";

import CategorySelectionScreen from "./src/screens/CategorySelectionScreen";
import SigninScreen from "./src/screens/authentication/SigninScreen";
import SignupScreen from "./src/screens/authentication/SignupScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import ProfileScreen from "./src/screens/settings/ProfileScreen";

firebase.initializeApp(FirebaseConfig);

const LoginStack = createStackNavigator({
  Signin: SigninScreen,
  Signup: SignupScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
});

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  LoginStack,
  MainStack: createBottomTabNavigator({
    CategorySelection: CategorySelectionScreen,
    SettingsStack,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};
