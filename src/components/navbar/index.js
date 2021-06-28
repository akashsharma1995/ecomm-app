import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Navbar.module.css";
import SearchBar from "./SearchBar";
import MobileMenu from "./mobile";
import ToggleNav from "./ToggleNav";
import NavList from "./NavList";
import { logoutUser } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const userName =
    user && user.displayName ? user.displayName.split(" ")[0] : null;
  const [showDrawer, setShowDrawer] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes.navbar}>
      <div className={classes["navbar-content"]}>
        <div className={classes["left-nav"]}>
          <ToggleNav setShowDrawer={setShowDrawer} />
          <span>
            <NavLink
              to="/home"
              activeClassName={classes.active}
              className={classes.link}
            >
              <HomeIcon className={classes.icon} />
            </NavLink>
          </span>
          <span>
            {user && (
              <p className={classes[`display-name`]}>
                {" "}
                Welcome! {`${userName}`}{" "}
              </p>
            )}
          </span>
        </div>
        <div className={classes["center-nav"]}>
          <SearchBar />
        </div>
        <nav className={classes["right-nav"]}>
          <NavList logoutHandler={logoutHandler} />
        </nav>
      </div>
      {showDrawer && (
        <MobileMenu
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          logoutHandler={logoutHandler}
        />
      )}
    </div>
  );
};

export default Navbar;
