import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
      {props.adminPage || props.myOrdersPage || props.myAccountPage ? (
        ""
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
