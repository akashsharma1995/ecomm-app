import React, { useState } from 'react';
import { useHistory } from "react-router";
import AuthFormWrapper from "../authForm";
import { auth, sendPasswordResetEmail } from "../../firebase/utils";
import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [userName, setUserName] = useState('');
  const history = useHistory();
  
  const submitHandler = (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/login"
    }
    sendPasswordResetEmail(auth, userName)
    .then(() => {
      // Password reset email sent!
      // ..
      // history.push('/login');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return (
    <AuthFormWrapper submitHandler={submitHandler}>
      <div className={classes.wrapper}>
        <h2>Forgot Password</h2>
        <label>Email</label>
          <input
            name="userEmail"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
            type="email"
          ></input>
          
          <button type="submit">Send Link</button>
      
      </div>
    </AuthFormWrapper>
  )
}

export default ForgotPassword;
