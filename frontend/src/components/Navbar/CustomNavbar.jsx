import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomNavbar.css';

const CustomNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">e-Catering</div>
      <div className="navbar-center">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/contact-us" className="nav-link" activeClassName="active">
          Contact Us
        </NavLink>
        <NavLink to="/orders" className="nav-link" activeClassName="active">
          Orders
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/admin-signin" className="nav-link" activeClassName="active">
          Admin
        </NavLink>
      </div>
    </nav>
  );
};

export default CustomNavbar;
