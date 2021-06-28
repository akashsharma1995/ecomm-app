import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./categories.module.css";

const Category = ({ item }) => {
  const history = useHistory();
  return (
    <div className={styles.category}>
      <img src={item.image} className={styles.image} alt="categorypicture" loading="lazy" />
      <div className={styles["info-container"]}>
        <h1 className={styles["category-title"]}>{item.title}</h1>
        <button
          className={styles.button}
          onClick={() => {
            history.push(item.url);
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Category;
