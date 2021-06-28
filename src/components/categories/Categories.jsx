import Category from "./Category";
import styles from "./categories.module.css";

const categoryItems = [
  {
    image: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/menwear.webp?alt=media&token=2346ff59-cd6f-4574-91e7-0229c3f17b19",
    title: "Men",
    url: "/products?category=men",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/womenwear.webp?alt=media&token=1b026eb3-f5c3-4dfd-bd0d-0e2442144bf2",
    title: "Women",
    url: "/products?category=women",
  },
  {
    image: "https://firebasestorage.googleapis.com/v0/b/ecomm-app-react.appspot.com/o/electronics.webp?alt=media&token=8c821aae-337a-45f1-9461-3f6c4a9eaa04",
    title: "Electronics",
    url: "/products?category=electronics",
  },
];

const Categories = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Categories</h1>
      <div className={styles["categories-cont"]}>
        {categoryItems.map((item, i) => (
          <Category
            key={item.title + i}
            item={item}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
