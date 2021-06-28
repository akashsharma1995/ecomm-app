import { useState } from "react";
import { NavLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import classes from "./ListItem.module.css";

const CollapsibleItemContent = ({ item, nestedListItems }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={classes["list-item-wrapper"]}
        onClick={() => setShow(prevState => !prevState)}
      >
        <span>{item.icon}</span>
        <span className={classes["list-title"]}>{item.title}</span>
        <span>
          <KeyboardArrowDownIcon className={show ? classes.arrow : ""} />
        </span>
      </div>
      {show && <ul className={classes["nested-list"]}>{nestedListItems}</ul>}
    </>
  );
};

const ItemContent = ({ item }) => {
  return (
    <div className={classes["list-item-wrapper"]}>
      <span>{item.icon}</span>
      <span className={classes["list-title"]}>{item.title}</span>
    </div>
  );
};

const ListItem = ({ item, nestedListItems, collapsible, nested, ...otherProps }) => {
  let itemToReturn = "";
  if (collapsible) {
    itemToReturn = (
      <CollapsibleItemContent item={item} nestedListItems={nestedListItems} />
    );
  } else {
    itemToReturn = <ItemContent item={item} />;
  }

  return (
    <li className={nested ? classes["nested-list-item"] : classes["list-item"]} {...otherProps}>
      {item.title === "Admin Tools" ? (
        itemToReturn
      ) : (
        item.url ? 
        <NavLink
          to={item.url}
          className={classes.link}
          activeClassName={classes.active}
        >
          {itemToReturn}
        </NavLink> : itemToReturn
      )}
    </li>
  );
};

export default ListItem;
