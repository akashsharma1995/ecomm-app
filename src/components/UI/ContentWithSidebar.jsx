import React from 'react';
import { NavLink } from "react-router-dom";
import classes from "./ContentWithSidebar.module.css";

const MainContent = ({ children }) => {
  return (
    <div className={classes['main-content']}>
      {children}
    </div>
  )
}

const Sidebar = ({ listItems }) => {
  return (
    <div className={classes.sidebar}>
      <ul className={classes.list}>
        {listItems.map((item, i) => (
          <NavLink to={item.linkTo} activeClassName={classes.active} key={item.title + i}>
            <li className={classes["list-item"]} key={"adminSideBar" + i}>
              {item.title}
            </li> 
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

const ContentWithSidebar = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
};

export { ContentWithSidebar, MainContent, Sidebar}
