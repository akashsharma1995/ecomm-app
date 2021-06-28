import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import Backdrop from "../UI/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./SearchBar.module.css";

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SearchOptions = ({ options, handleOptionClick }) => {
  return (
    <div className={classes["options-cont"]}>
      <ul className={classes.list}>
        {options.length === 0 ? (
          <li key={"noproduct"} className={classes["list-item"]}>
            No Product Found
          </li>
        ) : (
          options.map((product) => (
            <li
              key={product.id}
              onClick={(e) => handleOptionClick(e, product)}
              className={classes["list-item"]}
            >
              {product.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const SearchBar = () => {
  const searchInput = useRef(null);
  const { products } = useSelector((state) => state.products);
  const [options, setOptions] = useState([]);
  const [focused, setFocused] = useState(false);
  const history = useHistory();

  const debouncedSearch = debounce(() => searchProducts());

  const searchProducts = () => {
    if (searchInput.current.value === "") {
      setOptions([]);
      return;
    }
    const searchedOptions = products.filter((product) => {
      if (
        product.name
          .toLowerCase()
          .includes(searchInput.current.value.toLowerCase())
      ) {
        return product;
      }
    });
    setOptions(searchedOptions);
  };

  const handleInputChange = (e) => {
    searchInput.current.value = e.target.value;
    debouncedSearch(e.target.value);
  };

  const clearSearchBar = () => {
    searchInput.current.value = "";
    setOptions([]);
  };

  const handleOptionClick = (e, product) => {
    setFocused(false);
    searchInput.current.value = "";
    setOptions([]);
    history.push(`/products?category=${product.category}&name=${product.name}`);
  };

  return (
    <>
      <div
        className={`${classes["search-container"]}`}
        onFocus={() => setFocused(true)}
      >
        <input
          ref={searchInput}
          onChange={(e) => handleInputChange(e)}
          placeholder="Product name..."
          className={classes["search-input"]}
        />

        {focused && searchInput?.current?.value ? (
          <>
            <SearchOptions
              options={options}
              handleOptionClick={handleOptionClick}
            />
            <CloseIcon
              className={classes.icon}
              onClick={() => clearSearchBar()}
            />
          </>
        ) : (
          <Search
            className={classes.icon}
            onClick={() => {
              setFocused(true);
              searchInput.current.focus();
            }}
          />
        )}
      </div>
      {focused && searchInput?.current?.value && (
        <Backdrop
          className={classes["backdrop-color"]}
          onClick={() => setFocused(false)}
        />
      )}
    </>
  );
};

export default SearchBar;
