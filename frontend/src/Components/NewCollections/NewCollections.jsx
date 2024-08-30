import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const Newcollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    // Fetch the new collections from the server
    fetch('http://localhost:4000/allproducts')
      .then(response => response.json())
      .then(data => setNew_collection(data))
      .catch(error => {
        console.error('Error fetching new collections:', error);
      });
  }, []);

  // Limit to 8 products
  const limitedCollections = new_collection.slice(0, 8);

  return (
    <div className="new-collection">
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {new_collection.length === 0 ? (
          <p>Loading...</p>
        ) : (
          limitedCollections.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={`http://localhost:4000/images/${item.mainImage}`} // Prepend base URL
              newPrice={item.new_price}
              oldPrice={item.old_price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Newcollections;
