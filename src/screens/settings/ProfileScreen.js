import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";

const avatarNoPic = require("../../../assets/no-avatar.png");

const ProfileScreen = () => {
  const { state } = useContext(AuthContext);
  const [email, setEmail] = useState(state.user?.email);
  const [photoURL, setPhoto] = useState(state.user?.photo);
  const isGoogleAcc = state.user?.provider === "google.com";

  const formik = useFormik({
    initialValues: {
      name: state.user?.name || "",
      phone: state.user?.phone || "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formHasChanged = () => {
    return (
      formik.initialValues.name === formik.values.name ||
      formik.initialValues.phone === formik.values.phone
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Image
            style={styles.profilePhoto}
            source={photoURL ? { uri: photoURL } : avatarNoPic}
          />
          <CustomInput
            label="full name"
            textContentType="name"
            value={formik.values.name}
            onChangeText={(text) => formik.setFieldValue("name", text)}
            icon="person-outline"
            placeholder={isGoogleAcc ? "" : "John Doe"}
            editable={isGoogleAcc ? false : true}
          />
          <CustomInput
            label="phone number"
            textContentType="telephoneNumber"
            value={formik.values.phone}
            onChangeText={(phone) => formik.setFieldValue("phone", phone)}
            icon="phone"
            placeholder={isGoogleAcc ? "" : "+54 370 4696171"}
            editable={isGoogleAcc ? false : true}
            keyboardType="phone-pad"
          />
          <CustomInput
            label="email address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
            placeholder={isGoogleAcc ? "" : "johndoe@email.com"}
            editable={false}
          />
          {isGoogleAcc ? (
            <Text style={styles.note}>Google's profiles are not editable</Text>
          ) : null}
        </View>
      </ScrollView>
      <Button
        title="Save"
        style={styles.saveButton}
        disabled={isGoogleAcc || !formik.dirty || !formHasChanged()}
        onPress={formik.handleSubmit}
      />
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
    marginTop: "3%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  note: {
    fontStyle: "italic",
    fontSize: 12,
    color: "gray",
    marginHorizontal: "2%",
  },
  saveButton: {
    marginHorizontal: "2%",
    marginBottom: "10%",
  },
});

export default ProfileScreen;
