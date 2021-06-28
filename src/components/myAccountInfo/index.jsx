import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./MyAccountInfo.module.css";
import { checkAddressExists } from "../../utils";
import ShippingAddressModal from "./ShippingAddressModal";

const AddressContainer = ({ address }) => {
  return (
    <div className={classes["address-cont"]}>
      <p>
        {address.addr_line_1}, {address.addr_line_2}, {address.city},
        {address.state}, {address.zip_code}, {address.country}
      </p>
    </div>
  );
};

const MyAccountInfo = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [showShippingAddressModal, setShowShippingAddressModal] = useState(false);
  const [shippingAddressModalType, setShippingAddressModalType] = useState('');
  const history = useHistory();
  const addressExists = checkAddressExists(user.address);

  if (!user) history.push("/");

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes["section-heading"]}>Personal Info</h2>

        <Input
          label="Name"
          name="displayName"
          type="text"
          disabled
          value={user.displayName}
          readOnly
        />

        <Input
          label="Email"
          name="email"
          type="email"
          disabled
          value={user.email}
          readOnly
        />

        <h2 className={classes["section-heading"]}>Address</h2>
        {!addressExists ? (
          <Button
            btnType="primary"
            className={classes.button}
            block
            onClick={() => setShowShippingAddressModal(true)}
          >
            Add Shipping Address
          </Button>
        ) : (
          <>
            <AddressContainer address={user.address} />
            <Button btnType="primary" block onClick={() => {
              setShippingAddressModalType("edit")
              setShowShippingAddressModal(true)
            }}>
              Edit
            </Button>
          </>
        )}
      </div>

      {showShippingAddressModal && (
        <ShippingAddressModal
          setShowShippingAddressModal={setShowShippingAddressModal}
          address={user.address}
          type={shippingAddressModalType}
        />
      )}
    </div>
  );
};

export default MyAccountInfo;
