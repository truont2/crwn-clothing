// list out all the products available
// import SHOP_DATA from "../../shop-data.json";
import { useContext, Fragment } from "react";


import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview= () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {/* iterate over the categories keys then using each key referecne the category and iterate over the items in each caterory */}
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products}/>
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;