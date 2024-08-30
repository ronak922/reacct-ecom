// Admin.jsx
import React from 'react';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../Components/Navbar/Sidebar/Sidebar';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import PopularWomen from '../../Components/PopularWomen/PopularWomen';
import NewCollection from '../../Components/NewCollection/NewCollection';
import Navbar from '../../Components/Navbar/Navbar'; // Import Navbar

const Admin = () => {
  return (
    <div className='admin'>
      <Navbar /> {/* Navbar component */}
      <div className="admin-layout">
        <Sidebar /> {/* Sidebar component */}
        <div className="admin-content">
          <Routes>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/popularwomen" element={<PopularWomen />} />
            <Route path="/newcollection" element={<NewCollection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
