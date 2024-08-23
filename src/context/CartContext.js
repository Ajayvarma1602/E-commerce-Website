import React, { createContext, Component } from 'react';

const CartContext = createContext();

class CartProvider extends Component {
  state = {
    cartList: [],
  };

  addCartItem = (product) => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }));
  };

  deleteCartItem = (id) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }));
  };

  updateCartItemQuantity = (id, quantity) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cartList: this.state.cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          updateCartItemQuantity: this.updateCartItemQuantity,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export { CartProvider, CartContext };
