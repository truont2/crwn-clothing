import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if product is found, increment the count
  if (existingCartItem) {
    return cartItems.map(
      (cartItem) =>
        // if you found the product
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      // {
      //     if(cartItem.id === productToAdd.id) {
      //         return { ...cartItem, quantity: cartItem.quantity + 1 }
      //     } else {
      //         return cartItem;
      //     }
      // }
    );
  }

  // return new array with the new cartItems array
  // add new product to array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove; function returns the first item that satisfies the condition
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // check if quanitty is equal to 1, if so remove it
  // returns array without current product'
//   return shallow copy of an array that meets the condition
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartItems with matching cartItems with count greater than 0;
  // basically find the cartItem you want to decrement, give us a new object with a reduced quantity
//   otherwise return the other cartItems
// when react recieves a new object, react will rerender the component
// if we just update the count, react wont rerender
// map creates a new arrra populated with result of calling every function on every element in the array
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOPen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // recalculate cart count
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    // recalculate cart count
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    // need to make sure if array contains items
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // most likely going to be a cart Item you are removing
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart, 
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
