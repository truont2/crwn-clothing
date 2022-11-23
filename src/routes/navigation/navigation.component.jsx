import { Outlet} from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

// import { UserContext } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart.context";


import {NavigationContainer, NavLinks, NavLink, LogoContainer } from "./navigation.styles.jsx";
import { useSelector } from "react-redux";

// redux
import { selectCurrentUser } from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector'

const Navigation = () => {
  // const {currentUser} = useContext(UserContext);
  // const {isCartOpen} = useContext(CartContext)

  // redux
  const currentUser = useSelector(selectCurrentUser )
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
            <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
