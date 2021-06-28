import React from "react";

import classes from "./MenuDropdown.module.css";

const MenuLabel = ({ children }) => {
  return children;
};

const MenuOptions = ({ children }) => {
  return (
    <div id="myDropdown" className={classes["dropdown-content"]}>
      <ul className={classes.list}>{children.map((item) => item)}</ul>
    </div>
  );
};

const Option = ({ children, ...otherProps }) => {
  return <li className={`${classes["list-item"]}`} {...otherProps}>{children}</li>;
};

const MenuDropdown = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export { MenuDropdown, MenuLabel, MenuOptions, Option };
