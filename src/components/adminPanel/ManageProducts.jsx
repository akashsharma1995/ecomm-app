import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, productsActions } from "../../store/productsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";

import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";
import Loading from "../UI/Loading";
import SnackbarComp from "../UI/SnackbarComp";
import classes from "./ManageProducts.module.css";

const notificationState = {
  open: false,
  type: "",
  message: "",
};

const ManageProducts = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(loading, setLoading);
  const { auth, products } = useSelector((state) => state);
  const { user } = auth;
  const {
    productsByAdmin,
    productsByAdminFetchSuccess,
    productsByAdminError,
    productEditSuccess,
    productDeleteSuccess,
  } = products;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProducted] = useState(null);
  const [showNotification, setShowNotification] = useState(notificationState);

  useEffect(() => {
    fetchProducts();
    return () => {};
  }, []);

  useEffect(() => {
    if (productsByAdminFetchSuccess === true) {
      setLoading(false);
      dispatch(productsActions.setAdminProductsFetchSuccess(false));
    }
  }, [productsByAdminFetchSuccess]);

  useEffect(() => {
    if (productDeleteSuccess === true) {
      setLoading(true);
      setShowDeleteModal(false);
      dispatch(productsActions.setProductDeleteSuccess(false));
      fetchProducts();
    }
  }, [productDeleteSuccess]);

  useEffect(() => {
    if (productEditSuccess === true) {
      setLoading(true);
      setShowEditModal(false);
      fetchProducts();
      dispatch(productsActions.setEditProductSuccess(false));
    }
  }, [productEditSuccess]);

  useEffect(() => {
    if (productsByAdminError) {
      setShowNotification({
        open: true,
        type: "error",
        message: productsByAdminError,
      });
    }
  }, [productsByAdminError]);

  const fetchProducts = () => {
    dispatch(getAdminProducts(user.id));
  };

  return (
    <div className={classes.container}>
      {loading && <Loading className={classes.loading} />}

      <h2>Manage Products</h2>
      {!loading && (
        <Fragment>
          <table cellPadding="10" cellSpacing="0" className={classes.table}>
            <tbody className={classes.tbody}>
              {productsByAdmin.map((product) => {
                const { imageURL, name, price } = product;
                return (
                  <tr className={classes.tr} key={product.id}>
                    <td>
                      <div className={classes["image-cont"]}>
                        <img
                          src={imageURL}
                          className={classes.image}
                          alt="product"
                        />
                      </div>
                    </td>
                    <td className={classes["cell-txt"]}>{name}</td>
                    <td className={classes["cell-txt"]}>
                      <div className={classes["price-container"]}>
                        <CurrencyRupee fontSize="small" />
                        {price}
                      </div>
                    </td>
                    <td>
                      <DeleteIcon
                        fontSize="large"
                        className={classes["del-icon"]}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedProducted(product);
                        }}
                      />
                    </td>
                    <td>
                      <EditIcon
                        fontSize="large"
                        className={classes["del-icon"]}
                        onClick={() => {
                          setShowEditModal(true);
                          setSelectedProducted(product);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Fragment>
      )}
      {showDeleteModal && (
        <DeleteProductModal
          selectedProduct={selectedProduct}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <EditProductModal
          selectedProduct={selectedProduct}
          setShowEditModal={setShowEditModal}
        />
      )}
      {showNotification.open && (
        <SnackbarComp
          open={showNotification.open}
          setShowNotification={setShowNotification}
          type={showNotification.type}
          message={showNotification.message}
        />
      )}
    </div>
  );
};

export default ManageProducts;
