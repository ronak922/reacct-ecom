import React, { useState } from 'react';

const PopularWomen = () => {
    // State variables for form fields
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/popular-women-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, name, newPrice, oldPrice, image }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add product: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Product added successfully:', result);
            // Optionally reset form or show success message
            setProductId('');
            setName('');
            setNewPrice('');
            setOldPrice('');
            setImage('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={productId} 
                onChange={(e) => setProductId(e.target.value)} 
                placeholder="Product ID" 
                required 
            />
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Product Name" 
                required 
            />
            <input 
                type="number" 
                value={newPrice} 
                onChange={(e) => setNewPrice(e.target.value)} 
                placeholder="New Price" 
                required 
            />
            <input 
                type="number" 
                value={oldPrice} 
                onChange={(e) => setOldPrice(e.target.value)} 
                placeholder="Old Price" 
            />
            <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                placeholder="Image URL" 
                required 
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default PopularWomen;
