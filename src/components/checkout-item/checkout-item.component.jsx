// import { CartContext } from '../../contexts/cart.context';

// import { useContext } from 'react';

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
  } from './checkout-item.styles';

// redux
import { useSelector, useDispatch } from 'react-redux';
import {removeItemToCart, addItemToCart, clearItemFromCart} from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    // const { addItemToCart, removeItemToCart, clearItemFromCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    // create anonymous methods so its easy to upodate function if they change and for code clarity
    // can optimize code too
    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems,cartItem));
    }

    const removeItemHandler = () => {
        dispatch(removeItemToCart(cartItems, cartItem));
    }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                    <Value>{quantity}</Value>
                <Arrow className='arrow' onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>
            &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem