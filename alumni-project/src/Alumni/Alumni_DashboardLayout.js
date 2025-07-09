import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Menu, Home, Person, Event, Group, Forum, Work, Settings, Logout
} from "@mui/icons-material";

function Navbar({ toggleSidebar }) {
  const navItems = [
    { label: "Home", icon: <Home />, path: "/alumni_dashboard" },
    { label: "Profile", icon: <Person />, path: "/alumni_profile" },
    { label: "Events", icon: <Event />, path: "/alumni_events" },
    { label: "Mentorship", icon: <Group />, path: "/alumni_mentorship" },
    { label: "Forum", icon: <Forum />, path: "/alumni_forum" },
    { label: "Internships", icon: <Work />, path: "/alumni_jobs" },
    { label: "Settings", icon: <Settings />, path: "/alumni_settings" },
    { label: "Logout", icon: <Logout />, path: "/" },
  ];

  return (
    <div className="navbar-wrapper d-flex justify-content-between align-items-center px-4 py-2">
      <div className="d-flex align-items-center gap-3">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu style={{ color: "white" }} />
        </button>
        <h3 className="mb-0 text-white fw-bold">Alumni Portal</h3>
      </div>
      <div className="d-flex gap-3 flex-wrap">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="btn btn-sm nav-btn text-white d-flex align-items-center gap-1 text-decoration-none"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const Sidebar = ({ isOpen }) => {
  const sidebarItems = [
    { label: "Profile", icon: <Person />,path: "/alumni_profile" }, 
    { label: "Settings",icon :< Settings />, path: "/alumni_settings" },
    { label: "Logout",icon: < Logout /> , path: "/" },
  ];

  return (
    <div className={`sidebar-section ${isOpen ? "open" : "closed"}`}>
      <ul className="p-3 list-unstyled">
        {sidebarItems.map((item, idx) => (
          <li key={idx} className="mb-3">
            <Link to={item.path} className="sidebar-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Alumni_DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex flex-column min-vh-100 layout-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar isOpen={sidebarOpen} />
        <div className={`main-content transition ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
          <div className="card shadow-sm rounded content-card">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .layout-container {
          background: linear-gradient(-45deg, #d1c4e9, #f3e5f5, #bbdefb, #e3f2fd);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
          font-family: 'Segoe UI', sans-serif;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .navbar-wrapper {
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          color: white;
        }

        .nav-btn {
          background: transparent;
          border: none;
          padding: 6px 12px;
          font-weight: 500;
          transition: background 0.3s;
        }

        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }

        .menu-btn {
          background: transparent;
          border: none;
          font-size: 24px;
          margin-right: 10px;
        }

        .sidebar-section {
          background-color: #ffffffee;
          border-right: 3px solid #4b0082;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          width: 240px;
          transition: transform 0.3s ease-in-out;
        }

        .sidebar-section.closed {
          transform: translateX(-100%);
          width: 0;
          overflow: hidden;
        }

        .sidebar-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          padding: 8px 12px;
          display: block;
          border-radius: 5px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .sidebar-link:hover {
          background-color: #eee;
          color: #4b0082;
        }

        .main-content {
          padding: 1rem;
          transition: all 0.3s ease-in-out;
        }

        .main-content.full-width {
          width: 100%;
        }

        .main-content.with-sidebar {
          width: calc(100% - 240px);
        }

        .content-card {
          background-color: #ffffffdd;
          border: 2px solid #4b0082;
        }
      `}</style>
    </div>
  );
};

export default Alumni_DashboardLayout;
