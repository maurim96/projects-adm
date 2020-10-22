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
    case "update_profile":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const checkIfUserIsLoggedInAndCurrentRole = (dispatch) => async () => {
  const user = await firebase.auth().currentUser;
  if (user) {
    const userProfile = getUserProfileFromFirebaseUser(user);
    dispatch({ type: "signin", payload: userProfile });

    navigate("MainStack");
  } else {
    navigate("LoginStack");
  }
};

const updateUserProfile = (dispatch) => async (name, photo) => {
  await firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        user
          .updateProfile({
            displayName: name,
            photoURL: photo,
          })
          .then(() => {
            const userProfile = getUserProfileFromFirebaseUser(user);

            dispatch({ type: "update_profile", payload: userProfile });
          })
          .catch((err) =>
            dispatch({ type: "add_error", payload: err.message })
          );
      }
    },
    (err) => dispatch({ type: "add_error", payload: err.message })
  );
};

const signup = (dispatch) => async ({ email, password }) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const userProfile = getUserProfileFromFirebaseUser(result.user)
      const subscriber = firebase
        .firestore()
        .collection("Users")
        .add(userProfile);
      subscriber
        .then(() => {
          dispatch({ type: "signin", payload: userProfile });

          navigate("MainStack");
        })
        .catch(async (error) => {
          await this.signout();
          dispatch({ type: "add_error", payload: error.message });
        });
      })
    .catch((err) => dispatch({ type: "add_error", payload: err.message }));
};

const signin = (dispatch) => async ({ email, password }) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (user) => {
      await firebase
        .firestore()
        .collection("Users")
        .where("email", "==", user.email)
        .get()
        .then(async (result) => {
          userProfile = result.docs[0].data();
          dispatch({ type: "signin", payload: userProfile });

          navigate("MainStack");
        })
        .catch(async (error) => {
          await this.signout();
          dispatch({ type: "add_error", payload: error.message });
        });
      dispatch({ type: "signin", payload: user });

      navigate("MainStack");
    })
    .catch((err) =>
      dispatch({ type: "add_error", payload: "Incorrect email or password" })
    );
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
      await this.firebaseGoogleAuth(result, dispatch);
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

firebaseGoogleAuth = async (googleUser, dispatch) => {
  try {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(async () => {
      unsubscribe();
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      await firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          const currentUser = firebase.auth().currentUser;
          let userProfile = getUserProfileFromFirebaseUser(currentUser);
          await firebase
            .firestore()
            .collection("Users")
            .where("email", "==", currentUser.email)
            .get()
            .then(async (result) => {
              let subscriber = Promise.resolve(null);
              
              if (result.docs.length === 0) {
                subscriber = firebase
                  .firestore()
                  .collection("Users")
                  .add(userProfile);
              } else {
                userProfile = result.docs[0].data();
              }
              subscriber
                .then(() => {
                  dispatch({ type: "signin", payload: userProfile });

                  navigate("MainStack");
                })
                .catch(async (error) => {
                  await this.signout();
                  dispatch({ type: "add_error", payload: error.message });
                });
            })
            .catch((error) =>
              dispatch({ type: "add_error", payload: error.message })
            );
        })
        .catch((error) => {
          dispatch({ type: "add_error", payload: error.message });
        });
    });
  } catch (error) {
    dispatch({ type: "add_error", payload: error.message });
  }
};

const signout = (dispatch) => async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout" });
      navigate("LoginStack");
    })
    .catch((err) => dispatch({ type: "add_error", payload: err.message }));
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const getUserProfileFromFirebaseUser = (user) => {
  return {
    name: user?.providerData[0]?.displayName,
    email: user?.providerData[0]?.email,
    photo: user?.providerData[0]?.photoURL,
    provider: user?.providerData[0]?.providerId,
    uid: user?.providerData[0]?.uid,
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    checkIfUserIsLoggedInAndCurrentRole,
    googleAuth,
    updateUserProfile,
  },
  { isSignedIn: false, errorMessage: "", user: null, token: null }
);
