import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import SnackbarComp from "../UI/SnackbarComp";

import { handleAddProduct, productsActions } from "../../store/productsSlice";
import Loading from "../UI/Loading";
import classes from "./AddProduct.module.css";

const initialState = {
  category: "men",
  name: "",
  imageURL: "",
  description: "",
  price: "",
};

const notificationState = {
  open: false,
  message: '',
  type: ''
}

const AddProductForm = () => {
  const { user } = useSelector((state) => state.auth);
  const { productAddSuccess } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(initialState);
  const [showNotification, setShowNotification] = useState(notificationState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productAddSuccess) return;
    setProductData(initialState);
    dispatch(productsActions.setAddProductSuccess(false));
    setLoading(false);
    setShowNotification({
      open: true,
      message: "Product has been successfully added",
      type: "success"
    })
    return () => {};
  }, [productAddSuccess]);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const dataObj = {
      ...productData,
      adminUID: user.id,
    };
    dispatch(handleAddProduct(dataObj));
  };

  return (
    <div className={classes.container}>
      <h2>Add Product</h2>
      <ProductForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        productData={productData}
        buttonText="ADD"
        loading={loading}
      />
      {loading && <Loading/>}
      {showNotification.open && <SnackbarComp open={showNotification.open} setShowNotification={setShowNotification} type={showNotification.type} message={showNotification.message}/>}
    </div>
  );
};

export default AddProductForm;
