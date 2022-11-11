import {CategoryPreviewContainer, TitleLink, Preview} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  // live in the shop component
  return (
    <CategoryPreviewContainer>
      <h2>
        <TitleLink to={title} >
          {title.toUpperCase()}
        </TitleLink>
      </h2>
      <Preview>
        {/* underscore means ignore the argument */}
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
