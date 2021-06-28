import React, { useEffect, useState } from "react";
import { authActions } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

import {
  auth,
  onAuthStateChanged,
  fetchUserProfile,
  getSnapshot,
} from "../firebase/utils";
import Routes from "./routes";
import Loading from "./UI/Loading";

import "./App.css";

function App() {
  let authListener = null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    try {
      authListener = onAuthStateChanged(auth, (userAuth) => {
        console.log("on Auth state change");
        if (!userAuth) {
          dispatch(authActions.logout());
          setInitialRender(false);
          setLoading(false);
          return;
        }
        setUserProfile(userAuth);
      });
    } catch (err) {
      setError(err.message || "something went wrong");
      setLoading(false);
    }

    return () => {
      authListener();
    };
  }, []);

  const setUserProfile = async (userAuth) => {
    const userRef = await fetchUserProfile(userAuth);
    const snapshot = await getSnapshot(userRef);

    if (!snapshot.data()) {
      setInitialRender(false);
      return;
    }

    const userData = snapshot.data();
    userData.createdDate = {
      seconds: userData.createdDate.seconds.toString(),
      nanoseconds: userData.createdDate.nanoseconds.toString(),
    };
    const userObj = {
      id: snapshot.id,
      ...userData,
    };

    dispatch(authActions.login(userObj));
    setInitialRender(false);
    setLoading(false);
  };

  return initialRender || loading ? (
    <div className="app-loading-container">
      <Loading></Loading>
    </div>
  ) : (
    error ? <div>{error}</div> : 
    Routes
  );
}

export default App;
