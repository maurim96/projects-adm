import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Account Screen</Text>
      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
