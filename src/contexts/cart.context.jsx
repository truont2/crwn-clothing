import {createContext, useEffect, useState} from 'react'

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains product to add
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
      );

    // if product is found, increment the count
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
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
}

export const CartContext = createContext({
    isCartOpen: false, 
    setIsCartOPen: () => {},
    cartItem: [], 
    addItemToCart: () => {}, 
    cartCount: 0
})


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // recalculate cart count
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        // need to make sure if array contains items 
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}
    return (
        <CartContext.Provider value= {value}>{children}</CartContext.Provider>
    )
}