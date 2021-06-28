import { useState } from "react";

import { deleteProduct } from "../../store/productsSlice";
import Modal from "../UI/Modal";

const DeleteModal = ({ setShowDeleteModal, selectedProduct }) => {
  const [loading, setLoading] = useState(false);
  
  const handleDelete = (productId) => {
    console.log('handle delete')
    console.log(productId)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    // dispatch(deleteProduct(productId));
  }

  return (
    <Modal
      title="Delete Product"
      onClose={() => setShowDeleteModal(false)}
      onConfirm={() => handleDelete(selectedProduct?.id)}
      title="Delete product"
      loading={loading}
    >
      Are you sure you want to delete this product?
    </Modal>
  );
};

export default DeleteModal;
