import {CategoryContainer, CategoryTitle} from "./category.styles.jsx";

import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  // want to use usesState and useEffect because everytime the component rerenders, the products will be gone
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {/* {products && products.map} safeguard to only render products map when products has a value*/}
        {/* without this, react will try to map over an empty object whihch is products initial value in the beginning befoire the data is retrieved from firebase */}
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
