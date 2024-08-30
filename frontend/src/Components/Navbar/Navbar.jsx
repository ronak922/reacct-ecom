import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ensure this file exists in src/Components/Navbar
import logo from '../Assets/logo.png'; // Adjust the path if necessary
import cartIcon from '../Assets/cart_icon.png'; // Adjust the path if necessary
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <Link to="/" className="logo-text">SHOOPERS</Link>
      </div>
      <ul className="nav-menu">
        <li><Link to="/" className="nav-link">Shop</Link></li>
        <li><Link to="/mens" className="nav-link">Men</Link></li>
        <li><Link to="/womens" className="nav-link">Women</Link></li>
        <li><Link to="/kids" className="nav-link">Kids</Link></li>
      </ul>
      <div className="nav-actions">
        {localStorage.getItem('auth-token') ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <Link to='/login' className="login-link">
            <button className="login-button">Login</button>
          </Link>
        )}
        <div className="cart-icon-wrapper">
          <Link to='/cart' className="cart-link">
            <img src={cartIcon} alt="Cart Icon" className="cart-icon" />
          </Link>
          <div className="cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
