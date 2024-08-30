// src/components/DescriptionBox/DescriptionBox.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './DescriptionBox.css';

const DescriptionBox = ({ product }) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

DescriptionBox.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DescriptionBox;
