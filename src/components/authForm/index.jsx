import React, { Fragment } from "react";
import Backdrop from "../UI/Backdrop";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthFormWrapper = (props) => {
  const history = useHistory();
  return (
    <div className={classes.container}>
      <Fragment>
        <Backdrop />
        <HomeIcon
          className={classes["home-icon"]}
          onClick={() => history.push("/home")}
        />
        <form className={classes.form} onSubmit={props.submitHandler}>
          {props.children}
        </form>
      </Fragment>
    </div>
  );
};

export default AuthFormWrapper;
