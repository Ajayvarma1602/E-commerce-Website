// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Named import
import Header from '../Header';
import CartListView from '../CartListView';
import EmptyCartView from '../EmptyCartView';
import './index.css';

const Cart = () => {
  const { cartList } = useContext(CartContext);
  const showEmptyView = cartList.length === 0;

  return (
    <>
      <Header />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <CartListView />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
