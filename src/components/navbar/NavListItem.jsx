import { NavLink } from "react-router-dom";

import classes from "./NavListItem.module.css";

const NavListItem = ({ item, user }) => {
  let itemToBeReturned = "";
  if (!item.display) return itemToBeReturned;
  const isCart = item.title === "Cart" ? true : false; //Needed when we want to show just cart icon in nav in mobile view
  
  // Default list item to be shown
  itemToBeReturned = (
    <NavLink
      activeClassName={classes.active}
      className={isCart ? `${classes.link} ${classes["cart-link"]}` : classes.link}
      to={item.url}
    >
      <li key={`nav${item.title}`} className={isCart ? `${classes["list-item"]} ${classes["cart-list-item"]}` : classes["list-item"]}>
        {item.showOnlyTitle
          ? item.title
          : item.title === "Cart"
          ? item.content()
          : item.icon}
      </li>
    </NavLink>
  );

  if (user && item.title === "My Account") {
    itemToBeReturned = (
      <li key={`nav${item.title}`} className={classes["list-item"]}>
        {item.showOnlyTitle ? item.title : item.content()}
      </li>
    );
  }

  return itemToBeReturned;
};

export default NavListItem;
