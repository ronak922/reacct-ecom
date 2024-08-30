import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductDisplay.css';
import { ShopContext } from "../../Context/ShopContext";

// Utility function to generate image URLs
const imageUrl = (filename) => `http://localhost:4000/images/${filename}`;


const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const {
    id,
    name = 'Unknown Product',
    description = 'No description available',
    rating = 0,
    reviews = 0,
    new_price = 0,
    old_price = 0,
    sizes = ["S", "M", "L", "XL", "XXL"],
    imageUrls = [],
    category = 'Unknown',
    tags = []
  } = product;

  const [mainImage, setMainImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (imageUrls.length > 0) {
      setMainImage(imageUrls[0]);
    }
  }, [imageUrls]);

  const handleThumbnailClick = (thumbnail) => {
    setMainImage(thumbnail);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setError('');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }
    addToCart(id, selectedSize);
    setError('');
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
        {product.thumbnails && product.thumbnails.map((thumbnail, index) => (
            <img
            key={index}
            src={imageUrl(thumbnail)}
            alt={`Thumbnail ${index + 1}`}
            className={`productdisplay-thumbnail ${thumbnail === mainImage ? "active" : ""}`}
            onClick={() => handleThumbnailClick(thumbnail)}
          />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={imageUrl(mainImage)}
            alt={product.name} // Improved alt text
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{name}</h1>
        <p>{description}</p>
        <div className="productdisplay-rating">
          <div className="rating-box">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>?</span>
              ))}
            </div>
            <div className="rating-details">
              <p className="rating-text">{rating.toFixed(1)}</p>
              <div className="partition"></div>
              <p className="ratings-count">({reviews} ratings)</p>
            </div>
          </div>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            <p>?{old_price.toFixed(2)}</p>
          </div>
          <div className="productdisplay-right-prices-new">
            <p>?{new_price.toFixed(2)}</p>
          </div>
          <span className="product-discount">50%</span>
          <p className="product-taxes">inclusive of all taxes</p>
        </div>
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-size-options">
            {sizes.map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <a href="#" className="size-chart-link">SIZE CHART</a>
        <button className="add-to-bag" onClick={handleAddToCart}>ADD TO BAG</button>
        <button className="wishlist">WISHLIST</button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {category}
        </p>
        <p className="productdisplay-right-tags">
          <span>Tags:</span> {tags.length > 0 ? tags.join(', ') : "No tags"}
        </p>
        <div className="delivery-options">
          <p>Delivery Options</p>
          <input type="text" placeholder="Enter pincode" className="pincode-input" />
          <button className="check-pincode">Check</button>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
ProductDisplay.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    new_price: PropTypes.number,
    old_price: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ProductDisplay;
 