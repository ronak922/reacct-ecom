import React, { useContext } from 'react'; // Importing useContext hook
import './Popular.css'; // Ensure this matches your CSS file name
import PropTypes from 'prop-types'; // PropTypes is included but not used here
import { ShopContext } from "../../Context/ShopContext";
import Item from '../Item/Item';

const Popular = () => {
  const { all_product } = useContext(ShopContext);

  // Error handling if all_product is not available
  if (!all_product) {
    console.log('No products available');
    return <p>Loading products...</p>;
  }

  // Filter products for the 'women' category
  const womenProducts = all_product.filter(item => item.category.trim().toLowerCase() === 'women');

  // Function to get a random subset of products
  const getRandomProducts = (products, count) => {
    let shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get a random selection of 6 products
  const randomWomenProducts = getRandomProducts(womenProducts, 6);

  return (
    <div className="popular-women">
      <h2>Popular Women’s Products</h2>
      <div className="popular-women-products">
        {randomWomenProducts.length > 0 ? (
          randomWomenProducts.map(item => (
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
          <p>No products found in the women's category.</p>
        )}
      </div>
    </div>
  );
};

// Optional PropTypes can be added if needed
Popular.propTypes = {
  // Define PropTypes if your component accepts props
};

export default Popular;
