import React from "react";
import NavListItem from "./NavListItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Badge from "@mui/material/Badge";

import {
  MenuDropdown,
  MenuLabel,
  MenuOptions,
  Option,
} from "../UI/MenuDropdown";
import { navItemsInfo } from "./navItemsInfo";
import classes from "./NavList.module.css";

// Component responsible for showing Navbar items shown in desktop view
const NavList = ({ logoutHandler }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);

  const navItems = navItemsInfo(user).filter((item) => {
    // Getting nav items info and adding content wherever needed(when we dont want to show just icon and name)
    if (item.title !== "My Orders") {
      if (item.title === "Cart") {
        item.content = function () {
          return (
            <div className={classes.icon}>
              <Badge badgeContent={cartItemsCount || "0"} color="primary">
                {this.icon}
              </Badge>
            </div>
          );
        };
      }
      if (item.title === "My Account") {
        item.content = function () {
          return (
            <MenuDropdown>
              <MenuLabel>{this.icon}</MenuLabel>
              <MenuOptions>
                <Option onClick={() => history.push("/my-account")}>
                  My Account
                </Option>
                <Option onClick={() => history.push("/orders")}>
                  My Orders
                </Option>
                <Option onClick={() => logoutHandler()}>Logout</Option>
              </MenuOptions>
            </MenuDropdown>
          );
        };
      }
      return item;
    }
  });

  return (
    <ul className={classes.list}>
      {navItems.map((item, i) => (
        <NavListItem
          key={item.title}
          item={item}
          user={user}
          logoutHandler={logoutHandler}
        />
      ))}
    </ul>
  );
};

export default NavList;
