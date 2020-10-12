import createDataContext from "./createDataContext";
import { navigate } from "../navigationRef";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        errorMessage: "",
        user: action.payload,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, user: null, errorMessage: "" };
    // case "update_profile":
    //   return { ...state, user: action.payload };
    default:
      return state;
  }
};

const checkIfUserIsLoggedIn = (dispatch) => async () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const userProfile = {
        name: user.providerData[0]?.displayName,
        email: user.providerData[0]?.email,
        phone: user.providerData[0]?.phoneNumber,
        photo: user.providerData[0]?.photoURL,
        provider: user.providerData[0]?.providerId,
        uid: user.providerData[0]?.uid,
      };
      dispatch({ type: "signin", payload: userProfile });

      navigate("mainFlow");
    } else {
      navigate("loginFlow");
    }
  });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({ type: "signin", payload: result });

        navigate("mainFlow");
      })
      .catch((err) => dispatch({ type: "add_error", payload: err.message }));
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "signin", payload: user });

        navigate("mainFlow");
      })
      .catch((err) =>
        dispatch({ type: "add_error", payload: "Incorrect email or password" })
      );
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const googleAuth = (dispatch) => async ({}) => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId:
        "994929960351-djmd2v7b6941qttclmlvjfcl7c1blbbk.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      await this.firebaseGoogleAuth(result);
      dispatch({ type: "signin", payload: result });

      navigate("mainFlow");
    } else {
      return { cancelled: true };
    }
  } catch (error) {
    console.log("ERROR ", error);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with google sign in",
    });
  }
};

firebaseGoogleAuth = async (googleUser) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(
    function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => user)
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            dispatch({ type: "add_error", payload: error.message });
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    }.bind(this)
  );
};

isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser && googleUser) {
    let providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser?.user?.id
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const signout = (dispatch) => async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout" });
      navigate("loginFlow");
    })
    .catch((err) => console.log(err));
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    checkIfUserIsLoggedIn,
    googleAuth,
  },
  { isSignedIn: false, errorMessage: "", user: null, token: null }
);
