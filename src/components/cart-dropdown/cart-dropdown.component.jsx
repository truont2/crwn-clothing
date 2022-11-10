import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    
    return (
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ? cartItems.map((item) => {
                    return <CartItem key={item.id} cartItem={item}/>
                }) : <EmptyMessage>Your Cart is Empty</EmptyMessage>
            }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;