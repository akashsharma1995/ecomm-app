import React from "react";
import { useSelector } from "react-redux";

import MobileMenuListItem from "./MobileMenuListItem";
import LogoutIcon from '@mui/icons-material/Logout';
import SideDrawer from "../../UI/SideDrawer";
import { navItemsInfo } from "../navItemsInfo";
import classes from "./MobileMenu.module.css";

const getNavItemsInfo = (user, logoutHandler) => {
  const items = navItemsInfo(user, logoutHandler);
  return items.filter((item) => item.title !== "Cart");
};

const MobileMenuList = ({ navItemsArray }) => {
  return (
    <ul className={classes.list}>
      {navItemsArray.map((item) => {
        return item.display ? <MobileMenuListItem key={item.title} item={item} /> : "";
      })}
    </ul>
  );
};

const MobileMenu = ({ setShowDrawer, showDrawer }) => {
  const user = useSelector((state) => state.auth.user);
  const navItemsArray = getNavItemsInfo(user);

  navItemsArray.push({
    icon: <LogoutIcon/>,
    title: "Logout",
    display: user ? true : false
  });

  console.log()

  return (
    <SideDrawer setShowDrawer={setShowDrawer} showDrawer={showDrawer}>
      <MobileMenuList navItemsArray={navItemsArray} />
    </SideDrawer>
  );
};

export default MobileMenu;
