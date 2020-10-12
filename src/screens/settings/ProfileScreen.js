import React, { useContext, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomInput = ({
  label,
  contentType,
  value,
  onChangeText,
  icon,
  placeholder,
  editable,
}) => {
  return (
    <View style={styles.customInput}>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label={label}
        labelStyle={styles.label}
        leftIcon={<Icon name={icon} size={24} color="gray" />}
        leftIconContainerStyle={styles.iconContainer}
        placeholder={placeholder}
        textContentType={contentType}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
      ></Input>
    </View>
  );
};

const ProfileScreen = () => {
  const { state } = useContext(AuthContext);
  const [name, setName] = useState(state.user?.providerData[0]?.displayName);
  const [email, setEmail] = useState(state.user?.providerData[0]?.email);
  const [photoURL, setPhoto] = useState(state.user?.providerData[0]?.photoURL);
  const isGoogleAcc =
    state.user?.providerData[0]?.providerId === "google.com" ? true : false;

  return (
    <View style={styles.container}>
      <View>
        {photoURL ? (
          <Image
            style={styles.profilePhoto}
            source={{
              uri: photoURL,
            }}
          />
        ) : (
          <Image
            style={styles.profilePhoto}
            source={require("../../../assets/no-avatar.png")}
          />
        )}
        <CustomInput
          label={isGoogleAcc ? "Full Name*" : "Full Name"}
          contentType="name"
          value={name}
          onChangeText={setName}
          icon="person-outline"
          placeholder="John Doe"
          editable={isGoogleAcc ? false : true}
        ></CustomInput>
        <CustomInput
          label="Email Address"
          contentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          icon="mail-outline"
          placeholder="johndoe@email.com"
          editable={false}
        ></CustomInput>
        {isGoogleAcc ? (
          <Text style={styles.note}>*Google's profiles are not editable</Text>
        ) : null}
      </View>

      <Button title="Save" style={styles.saveButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  profilePhoto: {
    width: 170,
    height: 170,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  customInput: {
    display: "flex",
  },
  label: {
    color: "gray",
    fontSize: 15,
    left: 0,
    marginBottom: 8,
    fontWeight: "600",
  },
  note: {
    fontStyle: "italic",
    fontSize: 12,
    marginLeft: 5,
    color: "gray",
  },
  saveButton: {
    marginHorizontal: 10,
    marginBottom: 40,
  },
});

export default ProfileScreen;
