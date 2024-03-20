import React from "react";

import "./Header.css";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-text">Frontend React Test</h1>
      <div className="navbar">
        <ul>
          <li>
            <NavLink to="/" className={(navData) => (navData.isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" className={(navData) => (navData.isActive ? "active" : "")}>
              List
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
