import { createSelector } from "reselect";

// selector give slice of cart from reducer
const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer], 
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer], 
    (cart) => cart.isCartOpen
)

// for cart count and total
// unless cart items change we do not rerender
export const selectCartCount = createSelector(
    [selectCartItems], 
    (cart) => cart.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      )
)

export const selectCartTotal = createSelector(
    [selectCartItems], 
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
)