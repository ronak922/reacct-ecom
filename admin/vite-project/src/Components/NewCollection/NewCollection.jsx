import React, { useState } from 'react';
import axios from 'axios';
import './NewCollection.css'; // Import CSS file

const NewCollection = () => {
    const [category, setCategory] = useState('men');
    const [discount, setDiscount] = useState(0);
    const [expiresAt, setExpiresAt] = useState('');
    const [code, setCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    const handleCreateCoupon = async () => {
        try {
            // Validate input
            if (!code || discount <= 0 || !expiresAt || !category) {
                setError('All fields are required and discount must be greater than 0.');
                return;
            }

            // API call to create a coupon
            const response = await axios.post('http://localhost:4000/api/coupons/create', {
                code,
                discount,
                expiresAt,
                category
            });

            if (response.status === 201) {
                setGeneratedCode(response.data.code); // Update with the coupon code if returned
                setError('');
            } else {
                setError(response.data.message || 'Unknown error');
                setGeneratedCode('');
            }
        } catch (error) {
            console.error('Error creating coupon:', error.message || 'Unknown error');
            setError(error.message || 'Unknown error');
            setGeneratedCode('');
        }
    };

    return (
        <div className="new-collection-container">
            <h2>Create Coupon Code</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                <div>
                    <label>Discount (%):</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        min="1"
                        max="100"
                    />
                </div>
                <div>
                    <label>Expires At:</label>
                    <input
                        type="date"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                    />
                </div>
                <div>
                    <label>Code (Optional):</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleCreateCoupon}>Create Coupon</button>
            </form>
            {generatedCode && (
                <div>
                    <h3>Coupon Created Successfully!</h3>
                    <p>Your coupon code is: <strong>{generatedCode}</strong></p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default NewCollection;
