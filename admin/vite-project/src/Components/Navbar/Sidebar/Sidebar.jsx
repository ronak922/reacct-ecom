import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import addproduct from '../../../assets/Product_Cart.svg';
import listproducticon from '../../../assets/Product_list_icon.svg';
import popularIcon from '../../../assets/Popular_Women.svg'; // Add path for new icon
import newCollectionIcon from '../../../assets/New_Collection.svg'; // Add path for new icon

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={addproduct} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={listproducticon} alt="List Product" />
          <p>List Product</p>
        </div>
      </Link>
      <Link to="/popularwomen" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={popularIcon} alt="Popular Women" />
          <p>Popular Women</p>
        </div>
      </Link>
      <Link to="/newcollection" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={newCollectionIcon} alt="New Collection" />
          <p>New Collection</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
