import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import crossicon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const imageUrl = (filename) => `http://localhost:4000/images/${filename}`;
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/removeproduct", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        setAllProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      } else {
        console.error("Failed to remove product:", result.message);
        setError("Failed to remove product. Please try again later.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setError("Error removing product. Please try again later.");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-data">
        <hr />
        {allProducts.map((product) => (
          <div key={product._id} className="list-product-format-main">
            <img
              src={imageUrl(product.mainImage)}
              alt={product.name}
              className="listproduct-product-icon"
            />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              className="listproduct-product-icon"
              src={crossicon}
              alt="Remove"
              aria-label={`Remove ${product.name}`}
              onClick={() => handleRemoveProduct(product._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
