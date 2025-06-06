// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {collapsed ? '☰' : '✕'}
      </button>
      {!collapsed && (
        <>
        
          <h2>Admin Panel</h2>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/team">Team Members</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li>
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
