import React from "react";
import Layout from "../components/Layout";
import { Route } from "react-router-dom";
import AddProduct from "../components/adminPanel/AddProduct";
import ManageProducts from "../components/adminPanel/ManageProducts";
import {
  ContentWithSidebar,
  Sidebar,
  MainContent,
} from "../components/UI/ContentWithSidebar";

const listItems = [
  { title: "Products", linkTo: "/admin/products" },
  { title: "Add Product", linkTo: "/admin/add-product" },
];

const Admin = (props) => {
  return (
    <Layout adminPage>
      <ContentWithSidebar>
        <Sidebar listItems={listItems} />
        <MainContent>
          <Route path="/admin/add-product" exact>
            <AddProduct />
          </Route>
          <Route path="/admin/products" exact>
            <ManageProducts />
          </Route>
        </MainContent>
      </ContentWithSidebar>
    </Layout>
  );
};

export default Admin;
