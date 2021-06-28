import { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signupUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

import classes from "./signup.module.css";
import AuthFormWrapper from "../authForm";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Input from "../UI/Input";
import Button from "../UI/Button";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { user, signupError, signupSuccess } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      resetForm();
      history.push("/");
    }

    return () => {};
  }, [signupSuccess, user, history]);

  useEffect(() => {
    if (Array.isArray(signupError) && signupError.length > 0) {
      setErrors(signupError);
      setLoading(false);
    }
    return () => {};
  }, [signupError]);

  const resetForm = () => {
    setUserData(initialState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (userData.password !== userData.confirmPassword) {
      setErrors([...errors, "Passwords do not match"]);
      return;
    }

    dispatch(signupUser(userData));
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <AuthFormWrapper submitHandler={onSubmit}>
      <div className={`${classes["form-wrapper"]} ${loading ? classes.loading : ""}`}>
        <LockRoundedIcon className={classes.lock} fontSize="large" />
        {errors.length > 0 &&
          errors.map((error, i) => (
            <p key={"signuperr" + i} className={classes.error}>
              {error}
            </p>
          ))}

        <Input
          label="Full Name"
          type="text"
          name="displayName"
          onChange={(e) => handleInputChange(e)}
          required
          value={userData.displayName}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          onChange={(e) => handleInputChange(e)}
          required
          value={userData.email}
        ></Input>

        <Input
          label="Password"
          type="password"
          name="password"
          onChange={(e) => handleInputChange(e)}
          required
          value={userData.password}
          minLength="5"
        ></Input>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={(e) => handleInputChange(e)}
          required
          value={userData.confirmPassword}
          minLength="5"
        ></Input>
        <Button
          loading={loading}
          type="submit"
          btnType="primary"
          className={classes["signup-btn"]}
          block
        >
          Signup
        </Button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <button className={classes.transparentbtn}>Login</button>
          </Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
};

export default Signup;
