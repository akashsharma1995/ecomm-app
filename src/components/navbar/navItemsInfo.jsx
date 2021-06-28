import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CardTravelIcon from "@mui/icons-material/CardTravel";

import { checkUserIsAdmin } from "../../utils";
import classes from "./Navbar.module.css";

// Function that returns an array containing all the details of a list item(nav link)
export const navItemsInfo = (user) => {
  const navItemsInfoArray = [
    {
      title: "Register",
      url: "/signup",
      icon: <HowToRegIcon className={classes.icon} />,
      display: user ? false : true,
      showOnlyTitle: true,
    },
    {
      title: "Login",
      url: "/login",
      icon: <LoginIcon className={classes.icon} />,
      display: user ? false : true,
      showOnlyTitle: true,
    },
    {
      title: "Wishlist",
      url: "/wishlist",
      icon: <FavoriteBorderIcon className={classes.icon} />,
      display: false,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: <ShoppingCartOutlinedIcon className={classes.icon} />,
      display: true,
    },
    {
      title: "Admin Tools",
      url: "/admin/products",
      icon: (
        <AdminPanelSettingsIcon className={classes.icon} onClick={() => {}} />
      ),
      display: user && checkUserIsAdmin(user) ? true : false,
    },
    {
      title: "My Account",
      url: "/my-account",
      icon: <AccountCircleIcon className={classes.icon} />,
      display: user ? true : false,
    },
    {
      title: "My Orders",
      url: "/orders",
      icon: <CardTravelIcon className={classes.icon} />,
      display: user ? true : false,
    },
  ];

  if (user) navItemsInfoArray.splice(0, 1); //IF logged in then, Removing register list item
  return navItemsInfoArray;
};
