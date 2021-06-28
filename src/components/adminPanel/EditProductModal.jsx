import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";

import { handleEditProduct, productsActions } from "../../store/productsSlice";
import ProductForm from "./ProductForm";

const EditForm = ({ selectedProduct, setLoading, loading }) => {
  const { user } = useSelector((state) => state.auth);
  const { productEditSuccess } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(selectedProduct);

  useEffect(() => {
    if (!productEditSuccess) return;
    dispatch(productsActions.setEditProductSuccess(false));
    return () => {};
  }, [productEditSuccess]);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {
      adminId: user.id,
      productData: { ...productData },
    };
    dispatch(handleEditProduct(dataObj));
  };

  return (
    <ProductForm
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      productData={productData}
      buttonText="Save"
      loading={loading}
    />
  );
};

const EditProductModal = ({
  setShowEditModal,
  handleEdit,
  selectedProduct
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title="Edit Product"
      onClose={() => setShowEditModal(false)}
      onConfirm={() => handleEdit(selectedProduct?.id)}
      loading={loading}
      showFooter={false}
    >
      <EditForm selectedProduct={selectedProduct} setLoading={setLoading} loading={loading}/>
    </Modal>
  );
};

export default EditProductModal;
