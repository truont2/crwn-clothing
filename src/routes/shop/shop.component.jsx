// list out all the products available
// import SHOP_DATA from "../../shop-data.json";
import { useContext } from "react";
import './shop.styles.scss'
import { ProductContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {

    const {products} = useContext(ProductContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return (
          <ProductCard key={product.id} product={product}/>
        );
      })}
    </div>
  );
};

export default Shop;
