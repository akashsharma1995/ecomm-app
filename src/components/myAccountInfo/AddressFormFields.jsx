import { Fragment } from "react";
import { CountryDropdown } from "react-country-region-selector";

import Input from "../UI/Input";
import classes from "./MyAccountInfo.module.css";

const MyAccount = (props) => {
  const { state, handleChange, disabled, handleCountryChange } = props;

  return (
    <Fragment>
      <Input
        label="Address Line 1"
        name="addr_line_1"
        type="text"
        value={state?.addr_line_1 || ""}
        onChange={(e) => handleChange(e)}
        required
        disabled={disabled || false}
      />

      <Input
        label="Address Line 2"
        name="addr_line_2"
        type="text"
        value={state?.addr_line_2 || ""}
        onChange={(e) => handleChange(e)}
        required
        disabled={disabled || false}
      />

      <Input
        label="City"
        name="city"
        type="text"
        value={state?.city || ""}
        onChange={(e) => handleChange(e)}
        required
        disabled={disabled || false}
      />

      <Input
        label="State"
        name="state"
        type="text"
        value={state?.state || ""}
        onChange={(e) => handleChange(e)}
        required
        disabled={disabled || false}
      />

      <Input
        label="Zip Code"
        name="zip_code"
        type="text"
        value={state?.zip_code || ""}
        onChange={(e) => handleChange(e)}
        required
        disabled={disabled || false}
      />

      <div className={classes.select}>
        <div>Country</div>
        <CountryDropdown
          required
          onChange={(val) => handleCountryChange(val)}
          valueType="short"
          name="country"
          value={state?.country || ""}
          disabled={disabled || false}
        />
      </div>
    </Fragment>
  );
};

export default MyAccount;
