import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartItem.css';

const CartItem = () => {
    const { all_product, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
    const [cart, setCart] = useState({});
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Ensure token is available
                const response = await fetch('http://localhost:4000/getcart', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setCart(data.cart || {});
                } else {
                    setError(data.message || 'Failed to fetch cart');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch cart');
            }
        };

        fetchCart();
    }, []);

    const findProductById = (id) => all_product.find(p => p.id === parseInt(id)) || {};

    const calculateDiscountPercentage = (oldPrice, newPrice) => {
        if (oldPrice <= 0) return 0;
        return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    };

    const calculateTotals = () => {
        const items = Object.keys(cart);
        const subtotal = items.reduce((acc, id) => {
            const product = findProductById(id);
            return acc + ((product.new_price || 0) * (cart[id]?.quantity || 0));
        }, 0);

        const totalOldPrice = items.reduce((acc, id) => {
            const product = findProductById(id);
            return acc + ((product.old_price || 0) * (cart[id]?.quantity || 0));
        }, 0);

        const totalDiscountOnMRP = items.reduce((acc, id) => {
            const product = findProductById(id);
            const discount = product.old_price - product.new_price;
            return acc + (discount * (cart[id]?.quantity || 0));
        }, 0);

        const totalAmount = subtotal - couponDiscount;

        return { subtotal, totalOldPrice, totalDiscountOnMRP, totalAmount };
    };

    const { subtotal, totalOldPrice, totalDiscountOnMRP, totalAmount } = calculateTotals();

    const imageUrl = (filename) => filename ? `http://localhost:4000/images/${filename}` : '';

    const handleQuantityChange = (id, change) => {
        const newQuantity = (cart[id]?.quantity || 0) + change;
        if (newQuantity >= 0) {
            updateCartItemQuantity(id, newQuantity);
            setCart(prevCart => ({
                ...prevCart,
                [id]: { ...prevCart[id], quantity: newQuantity }
            }));
        }
    };

    const handleApplyCoupon = async () => {
        try {
            const response = await fetch('http://localhost:4000/applycoupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: couponCode }),
            });

            const result = await response.json();

            if (response.ok) {
                setCouponDiscount(result.discount || 0); // Update coupon discount state
                setError(''); // Clear any previous errors
            } else {
                setError(result.message || 'Failed to apply coupon');
            }
        } catch (error) {
            setError(error.message || 'Failed to apply coupon');
        }
    };

    return (
        <div className="cart-container">
            <main className="main-content">
                <div className="message">
                    <span className="icon">🚚</span>
                    <span>Yay! No convenience fee on this order.</span>
                </div>
                <hr />
                {Object.keys(cart).length > 0 ? (
                    Object.keys(cart).map((id) => {
                        const cartItem = cart[id];
                        const product = findProductById(id);
                        if (cartItem && cartItem.quantity > 0 && product) {
                            const discountPercent = calculateDiscountPercentage(product.old_price, product.new_price);
                            return (
                                <div className="product-item" key={id}>
                                    <img src={imageUrl(product.mainImage)} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3 className="product-brand">{product.brand}</h3>
                                        <p className="product-name"><strong>{product.name}</strong></p>
                                        <p className="product-size">Size: {cartItem.size}</p>
                                        <div className="quantity-controls">
                                            <button className="quantity-btn" onClick={() => handleQuantityChange(id, -1)} disabled={cartItem.quantity <= 1}>-</button>
                                            <span className="quantity">{cartItem.quantity}</span>
                                            <button className="quantity-btn" onClick={() => handleQuantityChange(id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="product-pricing">
                                        <p className="price">₹{product.new_price.toFixed(2)}</p>
                                        <p className="old-price">₹{product.old_price.toFixed(2)}</p>
                                        <p className="discount">{discountPercent}% OFF</p>
                                        <button onClick={() => removeFromCart(id)} className="remove-btn">✖ REMOVE</button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>No items in the cart.</p>
                )}

                <div className="coupon-section">
                    <h2>COUPONS</h2>
                    <div className="coupon-input">
                        <input 
                            type="text" 
                            placeholder="Enter coupon code" 
                            value={couponCode} 
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button className="apply-btn" onClick={handleApplyCoupon}>APPLY</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </main>

            <aside className="sidebar">
                <div className="price-details">
                    <h2>PRICE DETAILS</h2>
                    <div className="details">
                        <div className="detail">
                            <span>Total MRP</span>
                            <span>₹{totalOldPrice.toFixed(2)}</span>
                        </div>
                        <div className="detail">
                            <span>Discount on MRP</span>
                            <span className="discount-amount">-₹{totalDiscountOnMRP.toFixed(2)}</span>
                        </div>
                        <div className="detail">
                            <span>Coupon Discount</span>
                            <span className="coupon-status">-₹{couponDiscount.toFixed(2)}</span>
                        </div>
                        <div className="detail">
                            <span>Convenience Fee</span>
                            <span>FREE</span>
                        </div>
                        <div className="detail total">
                            <span>Total Amount</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="place-order-btn">PLACE ORDER</button>
                </div>
            </aside>
        </div>
    );
};

export default CartItem;
