import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <img src="/Image/image.png" alt="FinTrack" width="150" />

      <NavLink 
        to="/dashboard"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <i className="fa-solid fa-house"></i> Dashboard
      </NavLink>

      <NavLink 
        to="/transactions"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <i className="fa-solid fa-list-check"></i> Transactions
      </NavLink>

      <NavLink 
        to="/tasks"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <i className="fa-solid fa-square-check"></i> Tasks
      </NavLink>

      <NavLink 
        to="/reports"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <i className="fa-solid fa-chart-simple"></i> Reports
      </NavLink>

      <NavLink 
        to="/settings"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        <i className="fa-solid fa-gear"></i> Settings
      </NavLink>

      <button className="logout-btn" onClick={handleLogout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
      </button>
    </aside>
  );
}

export default Sidebar;