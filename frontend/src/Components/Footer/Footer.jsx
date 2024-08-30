import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt='Logo' />
        <p>SHOOPER</p>
      </div>
      <ul className="footer-links">
        <li><a href="/company">Company</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/offices">Offices</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="footer-social-icon">
        <a href="https://www.instagram.com/ronaak007" target="_blank" rel="noopener noreferrer" className="footer-icon-container">
          <img src={instagram_icon} alt='Instagram' />
        </a>
        <a href="https://www.pintester.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-icon-container">
          <img src={pintester_icon} alt='Pintester' />
        </a>
        <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="footer-icon-container">
          <img src={whatsapp_icon} alt='WhatsApp' />
        </a>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright &copy; 2024 - All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
