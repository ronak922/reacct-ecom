import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);

  // Error handling for missing props
  if (!banner) {
    console.error('Banner prop is required');
    return <p>Error: Banner image is missing.</p>;
  }

  if (!category) {
    console.error('Category prop is required');
    return <p>Error: Category is missing.</p>;
  }

  // Check if all_product is available
  if (!all_product) {
    console.log('No products available');
    return <p>Loading products...</p>;
  }

  // Debugging: Check the category and products data
  console.log('Category Prop:', category);
  console.log('All Products:', all_product);

  // Normalize the category for filtering
  const normalizedCategory = category.trim().toLowerCase();
  const filteredProducts = all_product.filter((item) => item.category.trim().toLowerCase() === normalizedCategory);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div className="shop-category">
      <img className='shopcategory-banner' src={banner} alt="Category banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(12, filteredProducts.length)}</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Dropdown icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item 
              key={item.id} 
              id={item.id} 
              name={item.name} 
              image={`http://localhost:4000/images/${item.mainImage}`} // Use mainImage here
              newPrice={item.new_price} 
              oldPrice={item.old_price}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

// Adding PropTypes for validation
ShopCategory.propTypes = {
  category: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
};

export default ShopCategory;
