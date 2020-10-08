import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/navigationRef";
import FirebaseConfig from "./firebaseConfig";
import * as firebase from 'firebase';
import { Provider as AuthProvider } from "./src/context/AuthContext";
import CategorySelectionScreen from "./src/screens/CategorySelectionScreen";
import SigninScreen from "./src/screens/authentication/SigninScreen";
import SignupScreen from "./src/screens/authentication/SignupScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import AccountScreen from "./src/screens/AccountScreen";

firebase.initializeApp(FirebaseConfig);

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),
  mainFlow: createBottomTabNavigator({
    CategorySelection: CategorySelectionScreen,
    Account: AccountScreen
  })
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
