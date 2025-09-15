
import React from "react";
import "../styles/Dashboard.css"
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="header">
      <div className="logo">
        <span className="logo-icon">🌱</span>
        <span className="logo-text">EcoLearn</span>
      </div>
      <div className="actions">
        <div className="theme-toggle">
          <input type="checkbox" id="toggle" />
          <label htmlFor="toggle"></label>
        </div>
        <Link to="/signin"><button className="login">Login</button></Link>
        <Link to="/signup"><button className="signup">Sign Up</button></Link>
      </div>
    </header>
    );
}

export default Header;
