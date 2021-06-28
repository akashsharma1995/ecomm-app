import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { productsActions, getAllProducts } from "../../store/productsSlice";
import ScrollToTopButton from "../scrollToTop/ScrollToTopButton";
import SnackbarComp from "../UI/SnackbarComp";
import Loading from "../UI/Loading";
import classes from "./Products.module.css";

const sortFilter = {
  name: "Sort By",
  options: [
    { title: "Price - Low to High", value: "priceltoh" },
    { title: "Price - High to Low", value: "pricehtol" },
  ],
};

const categoryFilter = {
  name: "Category",
  options: [
    { title: "Men", value: "men" },
    { title: "Women", value: "women" },
    { title: "Electronics", value: "electronics" },
    { title: "All", value: "all" },
  ],
};

const notificationState = {
  open: false,
  type: "",
  message: "",
};

const Products = ({ home }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, productsFetchSuccess, productsFetchError } = useSelector(
    (state) => state.products
  );
  const [sort, setSort] = useState("");
  const [productList, setProductList] = useState([]);
  const [categorySelected, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(notificationState);
  const search = useLocation().search;
  const nameSearched = new URLSearchParams(search).get("name");
  const category = new URLSearchParams(search).get("category") || "all";

  useEffect(() => {
    // const sort = queryParams.get("sortBy");
    setCategory(category);
    dispatch(getAllProducts(category));
  }, [dispatch, categorySelected]);

  useEffect(() => {
    if (productsFetchSuccess) {
      setLoading(false);
      if (home) {
        // Not applying any search when on homepage just showing first six products
        setProductList(products.slice(0, 6));
      } else if (nameSearched) {
        // When product name is searched from searchbar applying search only on frontend
        const productsToShow = searchProducts(nameSearched, products);
        setProductList(productsToShow);
      } else {
        // Whenever category is changed data is fetched from firestore hence showing it as it is
        setProductList(products);
      }
      dispatch(productsActions.setProductsFetchSuccess(false));
      return;
    }
    if (nameSearched) {
      // Runs when products are not fetched from firestore and only search is applying on frontend
      // When product name is searched from searchbar applying search only on frontend
      const productsToShow = searchProducts(nameSearched, products);
      setProductList(productsToShow);
    }
  }, [productsFetchSuccess, search]);

  useEffect(() => {
    if (productsFetchError) {
      setLoading(false);
      setShowNotification({
        open: true,
        type: "error",
        message: productsFetchError,
      });
    }
  }, [productsFetchError]);

  const handleCategoryChange = (value) => {
    // setSort(value);
    // sortProducts(value, productList);
    setCategory(value);
    history.push(`/products?category=${value}`);
  };

  const searchProducts = (name, productsArray) => {
    const filteredProducts = productsArray.filter((product) => {
      if (product.name.toLowerCase().includes(name.toLowerCase())) {
        return product;
      }
    });
    return filteredProducts;
  };

  const sortProducts = (value, arrayToBeSorted) => {
    // setloading(true);
    // const sortedList = [...arrayToBeSorted];
    // if(value === 'priceltoh') sortedList.sort((a, b) => a.price - b.price);
    // if(value === 'pricehtol') sortedList.sort((a, b) => b.price - a.price);
    // setProductList(sortedList);
    // setloading(false);
  };

  return (
    <div className={classes.container}>
      <h1>Products</h1>
      {!home && (
        <div className={classes["filter-wrapper"]}>
          <Filters
            name={categoryFilter.name}
            options={categoryFilter.options}
            handleFilterChange={handleCategoryChange}
            value={categorySelected}
          />
          {/* <Filters
            name={sortFilter.name}
            options={sortFilter.options}
            handleFilterChange={handleFilterChange}
            value={sort}
          /> */}
        </div>
      )}
      {!loading ? (
        <>
          {nameSearched && (
            <div className={classes["search-results-heading"]}><div className={classes.section1}><SearchIcon fontSize="medium"/> Results for: </div> 
              <span> {nameSearched}</span>
            </div> 
          )}
          <div className={classes["products-cont"]}>
            {productList.map((item, i) => (
              <Product key={item.id} item={item} />
            ))}
          </div>

          {home && (
            <div className={classes["show-more-btn-cont"]}>
              <Link to="/products">Show More Products &#8594;</Link>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
      {showNotification.open && (
        <SnackbarComp
          open={showNotification.open}
          setShowNotification={setShowNotification}
          type={showNotification.type}
          message={showNotification.message}
        />
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default Products;
