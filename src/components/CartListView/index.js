import React, { useContext } from 'react';
import CartItem from '../CartItem';
import { CartContext } from '../../context/CartContext'; // Named import

import './index.css';

const CartListView = () => {
  const { cartList } = useContext(CartContext);

  return (
    <ul className="cart-list">
      {cartList.length === 0 ? (
        <li className="empty-cart-message">Your cart is empty</li>
      ) : (
        cartList.map(eachCartItem => (
          <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
        ))
      )}
    </ul>
  );
};

export default CartListView;
