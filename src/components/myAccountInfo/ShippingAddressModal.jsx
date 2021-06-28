import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, authActions } from "../../store/authSlice";
import Modal from "../UI/Modal";
import AddressFormFields from "./AddressFormFields";
import Button from "../UI/Button";
import classes from "./ShippingAddressModal.module.css";

const initialState = {
  addr_line_1: "",
  addr_line_2: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
};

const AddressForm = ({ handleSubmit, handleCountryChange, handleChange, addressObj, loading }) => {
  return (
    <form onSubmit={handleSubmit} onSubmit={handleSubmit} className={classes.form}>
      <AddressFormFields
        state={addressObj}
        handleChange={handleChange}
        handleCountryChange={handleCountryChange}
        disabled={false}
      />
      <Button type="submit" btnType="primary" block className={classes['save-button']} loading={loading}>
        Save
      </Button>
    </form>
  );
};

const AddShippingAddress = ({ setShowShippingAddressModal, type, address }) => {
  const { user, updateUserInfoError, updateUserInfoSuccess } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false);
  const [addressObj, setAddressObj] = useState(type === 'edit' ? address : initialState);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAddressObj({ ...addressObj, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val) => {
    setAddressObj({ ...addressObj, country: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      userId: user.id,
      userAddress: {
        ...addressObj,
      },
    };
    dispatch(updateUserInfo(userInfo));
  };

  useEffect(() => {
    if (updateUserInfoSuccess) {
      setLoading(false);
      setShowShippingAddressModal(false);
    }
  }, [updateUserInfoSuccess]);

  useEffect(() => {
    if (updateUserInfoError) {
      setLoading(false);
      const err = updateUserInfoError;
      setError(err);
      dispatch(authActions.setUpdateUserInfoError(null));
    }
  }, [updateUserInfoError]);

  return (
    <Modal
      title={type === "edit" ? "Edit Shipping Address" : "Add Shipping Address"}
      onClose={() => setShowShippingAddressModal(false)}
      loading={loading}
      showFooter={false}
    >
      {error && <div className={classes.error}>{error}</div>}
      <AddressForm
        addressObj={addressObj}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCountryChange={handleCountryChange}
        loading={loading}
      />
    </Modal>
  );
};

export default AddShippingAddress;
