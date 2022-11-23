// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";

const CartIcon = () => {
  // const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen)


  const dispatch = useDispatch()

  // funtion to toggle to opposite value
  const toggleIsCartOpen =() => {
    // passiong in a action chih we grabbed from earlier
    dispatch(setIsCartOpen(!isCartOpen));
  }

  return (
    <CartIconContainer className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"/>
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
