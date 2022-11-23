import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};

// need to pass in cartItems into the action now because we want to reference the current state
export const addItemToCart = (cartItems, productToAdd) => {
  // need to make sure if array contains items
  const newCartItems = addCartItem(cartItems, productToAdd);
//   creating the action here which is returned when caled 
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// most likely going to be a cart Item you are removing
export const removeItemToCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
