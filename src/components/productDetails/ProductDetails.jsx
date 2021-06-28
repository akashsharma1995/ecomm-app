import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSelector, useDispatch } from "react-redux";

import Filter from "../products/Filters";
import { cartActions } from "../../store/cartSlice";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { db, doc, getDoc } from "../../firebase/utils";
import Button from "../UI/Button";
import QuantityManipulator from "../quantityManipulator";
import classes from "./ProductDetails.module.css";

const sizeFilter = {
  name: "Size",
  options: [{ title: "S" }, { title: "M" }, { title: "L" }, { title: "XL" }],
};

const ProductDetails = () => {
  const { productid } = useParams(); //id is defined as 'productid' is defined as a param in product details route
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart); //Getting all cart items from redux store
  const [size, setSize] = useState("S");
  const [quantity] = useState(1); // Item qty. will always be eual to 1 on product details page, though we can inc. or dec. it in cart page.

  const [product, setProduct] = useState({});
  // This value is used to show the quantity manipulator in this component
  const [currentProductInCart, setCurrentProductInCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const productList = useSelector((state) => state.products.products); //Accessing all products list from redux store

  useEffect(() => {
    getProducFromRedux();
  }, []);

  const getProducFromRedux = () => {
    if (productList.length === 0) {
      // If product is not present in the redux store i.e. page is refreshed then, get product from API
      getProductFromApi();
      return;
    }
    // If product already present in redux store then getting it from there
    const productFromRedux = productList.filter(
      (item) => item.id.toString() === productid.toString()
    )[0]; // Filtering the selected product from all products in store
    setProduct(productFromRedux);
    setLoading(false);
  };

  useEffect(() => {
    
    if(product.category === "electronics") {
      setSize(null);
    }

    // If this product exists in cart then updating component state to show quantity manipulator
    
    if (product?.id) {
      let productItem = cartItems.filter((item) => {
        if(product.id === item.id){
          // when id is matched checking if size is also the same
          if(!size) return product;
          else if(size && size === item.size) return product;
          else return;
        }
      })[0];
      if (productItem) setCurrentProductInCart(productItem);
      else setCurrentProductInCart(null);
    }
  }, [cartItems, product, size]);

  const getProductFromApi = async () => {
    try {
      const docRef = doc(db, "products", productid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const document = { id: docSnap.id, ...docSnap.data() };
        setProduct(document);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemHandler = () => {
    //Adding size & quantity properties to product object & sending item to cart items in redux store
    const itemToAdd = { ...product, quantity, size };
    dispatch(cartActions.addToCart(itemToAdd));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes["image-container"]}>
        <img alt="product" src={product.imageURL || ""} />
      </div>

      <div className={classes["info-container"]}>
        <h2>{product.name || ""}</h2>
        <p>{product.description || ""}</p>
        <p className={classes.rating}>
          <StarRateIcon fontSize="medium" />
          {"4.3"}
        </p>
        <div className={classes["price-container"]}>
          {product.price ? (
            <Fragment>
              <span>
                <CurrencyRupeeIcon />{" "}
              </span>
              <span className={classes.price}>
                <b>{product.price}</b>
              </span>
            </Fragment>
          ) : (
            ""
          )}
        </div>
        <div className={classes["add-to-cart"]}>
          {/* If item already exists in cart then showing quantity manipulator */}
          {currentProductInCart ? (
            <QuantityManipulator productDetails={currentProductInCart} />
          ) : (
            <Button
              size="lg"
              disabled={product.id ? false : true}
              onClick={() => addItemHandler()}
              className={product.id ? "" : classes["button-disabled"]}
            >
              Add To Cart
            </Button>
          )}
        </div>

        {/* If product category is electronics then not showing size filter */}
        {product?.category === "electronics" ? (
          ""
        ) : (
          <div className={classes["filter-wrapper"]}>
            <Filter
              name={sizeFilter.name}
              options={sizeFilter.options}
              value={size}
              handleFilterChange={setSize}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
