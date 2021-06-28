import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loginUser } from "../../store/authSlice";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import classes from "./login.module.css";
import AuthFormWrapper from "../authForm";
import Button from "../UI/Button";

const initialState = {
  email: "",
  password: ""
}

// Default export component
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { user, signinError } = useSelector((state) => state.auth);

  const [formDataObj, setFormDataObj] = useState({
   ...initialState
  });
  const [ errors, setErrors ]  = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    signInUser();
  };

  useEffect(() => {
    if(user){
      setFormDataObj({...initialState});
      history.push('/');
    }
    return () => {

    }
  }, [user, history])

  useEffect(() => {
    if(Array.isArray(signinError) && signinError.length > 0){
      setErrors(signinError);
      setLoading(false);
    }
    return () => {
    }
  }, [signinError])

  const signInUser = async () => {
    setLoading(true);
    const { email, password } = formDataObj;
    dispatch(loginUser(email, password));
  }

  const inputChangeHandler = (e) => {
    setFormDataObj({ ...formDataObj, [e.target.name]: e.target.value });
  };

  return (
    <AuthFormWrapper submitHandler={submitHandler}>
      <div className={`${classes.wrapper} ${loading ? classes.loading : ''}`}>
        <LockOpenRoundedIcon fontSize="large" className={classes.lock} />
        {errors[0] && <p className={classes.error}>{errors[0]}</p>}
        <label>Username</label>
        <input
          name="email"
          onChange={(e) => inputChangeHandler(e)}
          value={formDataObj.email}
          required
          type="email"
        ></input>

        <label>Password</label>
        <input
          name="password"
          onChange={(e) => inputChangeHandler(e)}
          type="password"
          required
          value={formDataObj.password}
        ></input>

        <Button loading={loading} type="submit" btnType="primary" className={classes["login-btn"]} block>Login</Button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <button className={`${classes.transparentbtn}`}>Signup</button>
          </Link>
        </p>

        <div className={classes.forgotPwdCont}>
          <Link to="/forgot-password">
            <button className={`${classes.transparentbtn}`}>Forgot Password?</button>
          </Link>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default Login;
