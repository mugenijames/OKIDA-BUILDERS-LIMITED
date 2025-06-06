import React, { useState } from 'react';
import TeamMembers from './TeamMembers';
import Projects from './Projects';
import Services from './Services';
import Testimonials from './Testimonials';
import Messages from './Messages';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('teamMembers');

  const renderContent = () => {
    switch (activeMenu) {
      case 'teamMembers':
        return <TeamMembers />;
      case 'projects':
        return <Projects />;
      case 'services':
        return <Services />;
      case 'testimonials':
        return <Testimonials />;
      case 'messages':
        return <Messages />;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="menu">
          <li className={activeMenu === 'teamMembers' ? 'menu-item active' : 'menu-item'} onClick={() => setActiveMenu('teamMembers')}>Team Members</li>
          <li className={activeMenu === 'projects' ? 'menu-item active' : 'menu-item'} onClick={() => setActiveMenu('projects')}>Projects</li>
          <li className={activeMenu === 'services' ? 'menu-item active' : 'menu-item'} onClick={() => setActiveMenu('services')}>Services</li>
          <li className={activeMenu === 'testimonials' ? 'menu-item active' : 'menu-item'} onClick={() => setActiveMenu('testimonials')}>Testimonials</li>
          <li className={activeMenu === 'messages' ? 'menu-item active' : 'menu-item'} onClick={() => setActiveMenu('messages')}>Messages</li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
