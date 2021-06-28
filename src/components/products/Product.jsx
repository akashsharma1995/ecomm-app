import React from "react";
import Card from "../UI/Card";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useHistory } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import classes from "./Product.module.css";

const limitCharacters = (str, limit) => {
  if(!str) return;
  if(str.length < limit) return;
  return `${str.slice(0, limit - 1)}...`; 
}

const Product = ({ item }) => {
  const history = useHistory();

  const redirect = () => {
    history.push(`/product-details/${item.id}`);
  };

  return (
    <Card image={item.imageURL} favourite={false} onClick={redirect}>
      <div className={classes["product-details-container"]}>
        <div className={classes["rating-container"]}>
          <span className={classes.rating}>
            <StarRateIcon fontSize="small" />
            {"4.3"}
          </span>
        </div>
        <p>{item.name || ""}</p>
        <div className={classes["price-block"]}>
          <CurrencyRupeeIcon className={classes["rupee-symbol"]} />{" "}
          <b>{item.price}</b>
        </div>
        <p>{item.description?.length > 70 ? limitCharacters(item.description, 70): item.description}</p>
      </div>
    </Card>
  );
};

export default Product;
