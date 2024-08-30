import React from "react";
import PropTypes from "prop-types";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, newPrice, oldPrice, category }) => {
  // Function to scroll to top
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={`item ${category ? category : ''}`}>
      <Link to={`/product/${id}`} onClick={handleScrollToTop}>
        <img src={image} alt={name} className="item-image" />
      </Link>
      <p className="item-name">{name}</p>
      <div className="item-prices">
        <div className="item-price-new">${newPrice.toFixed(2)}</div>
        {oldPrice && (
          <div className="item-price-old">${oldPrice.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

// Adding prop types for validation
Item.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accepting both string and number
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  oldPrice: PropTypes.number, // Optional as not all items might have an old price
  category: PropTypes.string, // Optional, for category-specific styling
};

export default Item;
