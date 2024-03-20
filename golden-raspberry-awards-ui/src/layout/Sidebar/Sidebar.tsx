import React from "react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
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
  );
};

export default Sidebar;
