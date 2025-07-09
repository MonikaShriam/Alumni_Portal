
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Admin_Sidebar';
import Header from './Admin_Header';

const Admin_Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="d-flex">
      <Sidebar collapsed={collapsed} />
      <div style={{ flex: 1 }}>
        <Header toggleSidebar={toggleSidebar} />
        <main
          style={{
            marginLeft: collapsed ? '70px' : '240px',
            transition: 'margin-left 0.3s ease',
            padding: '90px 20px 20px',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin_Layout;