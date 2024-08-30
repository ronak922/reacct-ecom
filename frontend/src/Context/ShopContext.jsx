import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  const cart = {};
  products.forEach(product => {
    cart[product.id] = { quantity: 0, size: '' };
  });
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAll_Product(data);
        setCartItems(getDefaultCart(data));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productId, size) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:4000/api/cart/addtocart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, size }),
      });

      if (response.status === 401) {
        // Handle unauthorized case
        console.error('Unauthorized: Token may be invalid or expired');
        // Redirect user to login or refresh token here
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add to cart: ${errorText}`);
      }

      const result = await response.json();
      // Handle the result if needed
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
      setError(error.message);
    }
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [id]: { ...prevItems[id], quantity }
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const { [productId]: removedItem, ...rest } = prev;
      return rest;
    });
  };

  const getTotalCartAmount = () => {
    return all_product.reduce((total, product) => {
      const item = cartItems[product.id] || { quantity: 0 };
      return total + (product.new_price * item.quantity);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    error,
    setError
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
