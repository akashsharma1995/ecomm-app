import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPassword";
import NotFound from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import AdminPage from "../pages/AdminPage";
import WithAdminAuth from "../hoc/withAdminAuth";
import WithAuth from "../hoc/withAuth";
import MyAccountPage from "../pages/MyAccountPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";

const Routes = (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/home" />
    </Route>
    <Route path="/home" exact>
      <HomePage />
    </Route>
    <Route path="/products" exact>
      <ProductsPage />
    </Route>
    <Route path="/product-details/:productid" exact>
      <ProductDetails />
    </Route>
    <Route path="/login" exact>
      <LoginPage />
    </Route>
    <Route path="/signup" exact>
      <SignupPage />
    </Route>
    <Route path="/forgot-password" exact>
      <ForgotPasswordPage />
    </Route>
    <Route path="/cart" exact>
      <WithAuth>
        <CartPage />
      </WithAuth>
    </Route>
    <Route path="/my-account">
      <WithAuth>
        <MyAccountPage />
      </WithAuth>
    </Route>
    <Route path="/orders">
      <WithAuth>
        <MyOrdersPage />
      </WithAuth>
    </Route>
    <Route path="/admin">
      <WithAdminAuth>
        <AdminPage />
      </WithAdminAuth>
    </Route>
    <Route path="/checkout">
      <WithAuth>
        <CheckoutPage />
      </WithAuth>
    </Route>
    <Route path="/payment">
      <WithAuth>
        <PaymentPage />
      </WithAuth>
    </Route>
    <Route path="/order-confirmation">
      <WithAuth>
        <OrderConfirmationPage />
      </WithAuth>
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;
