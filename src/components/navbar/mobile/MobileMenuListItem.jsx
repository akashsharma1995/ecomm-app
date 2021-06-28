import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/authSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import ListItem from "./ListItem";

const MobileMenuListItem = ({ item }) => {
  const dispatch = useDispatch();

  if (item.title === "Admin Tools") {
    const nestedListItems =  (
      <Fragment>
        <ListItem
          item={{
            icon: <SettingsIcon />,
            title: "Manage Products",
            url: "/admin/products",
          }}
          nested
        />
        <ListItem
          item={{
            icon: <AddIcon />,
            title: "Add Product",
            url: "/admin/add-product",
          }}
          nested
        />
      </Fragment>
    );

    return (
      <ListItem
        nestedListItems={nestedListItems}
        item={item}
        collapsible={true}
      />
    );
  }

  if (item.title === "Logout") {
    return <ListItem item={item} onClick={() => dispatch(logoutUser())} />;
  }

  return <ListItem item={item} />;
};

export default MobileMenuListItem;
