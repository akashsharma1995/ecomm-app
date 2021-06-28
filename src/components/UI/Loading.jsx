import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import classes from "./Loading.module.css";

export default function CircularIndeterminate(props) {
  return <CircularProgress className={classes.loading} />;
}
