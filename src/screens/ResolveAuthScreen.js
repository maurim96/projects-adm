import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { checkIfUserIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;
