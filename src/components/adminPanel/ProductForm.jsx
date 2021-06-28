import React from "react";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Button from '../UI/Button';
import Input from "../UI/Input";
import classes from "./ProductForm.module.css";

const categories = ['men', 'women', 'electronics'];

const capitalizeFirstLetter = (str) => {
  const capitalizedFirstLetter = str.charAt(0).toUpperCase();
  const capitalizedWord = capitalizedFirstLetter + str.slice(1);
  return capitalizedWord;
}

const ProductForm = ({ handleSubmit, handleInputChange, productData, buttonText, loading }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
      <label>Category</label>
      <select
        name="category"
        value={productData.category}
        onChange={handleInputChange}
        className={classes.select}
      >
        {categories.map((category, i) => (
          <option key={category} value={category}>
            {capitalizeFirstLetter(category)}
          </option>
        ))}
      </select>
      <Input
        label="Name"
        name="name"
        onChange={handleInputChange}
        required
        value={productData.name}
        type="text"
      />

      <Input
        name="imageURL"
        label="Image URL"
        onChange={handleInputChange}
        required
        value={productData.imageURL}
        type="text"
      />

      <Input
        name="price"
        label="Price"
        icon={<CurrencyRupee/>}
        onChange={handleInputChange}
        required
        value={productData.price}
        type="number"
        min={0}
      />

      <Input
        label="Description"
        name="description"
        onChange={handleInputChange}
        required
        value={productData.description}
        type="text"
      />

      {/* <button type='submit'>Add</button> */}
      <Button type="submit" block className={classes.btn} loading={loading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default ProductForm;
