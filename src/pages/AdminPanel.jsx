import React, { useState } from "react";
import { FaList, FaUsers, FaCog, FaHistory, FaUserCircle, FaDesktop } from "react-icons/fa";
import UsersPage from "./UsersPage";
import Settings from "./Settings";
import OrdersPage from "./OrdersPage";
import HistoryPage from "./HistoryPage";

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("orders");
  const [desktopInfo] = useState("Dell OptiPlex 7080 | Windows 11");

  const renderContent = () => {
    switch (activeMenu) {
      case "orders": return <OrdersPage />;
      case "products": return <div className="card">Products Management</div>;
      case "users": return <UsersPage />;
      case "settings": return <Settings />;
      case "history": return <HistoryPage />;
      default: return <div className="card">Select a menu option</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Premium Top Bar */}
      <header className="premium-topbar">
        <div className="desktop-info">
          <FaDesktop className="desktop-icon" />
          <span></span>
        </div>
        
        <div className="dashboard-title">
          <span className="brand-highlight">ADMIN</span> DASHBOARD
        </div>
        
        <div className="user-profile">
          <div className="profile-avatar">
            <FaUserCircle />
          </div>
          <div className="profile-info">
            <span className="profile-name">Administrator</span>
            <span className="profile-role">Super Admin</span>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li>
              <a
                href="#!"
                className={activeMenu === "orders" ? "active" : ""}
                onClick={() => setActiveMenu("orders")}
              >
                <FaList className="icon" />
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className={activeMenu === "users" ? "active" : ""}
                onClick={() => setActiveMenu("users")}
              >
                <FaUsers className="icon" />
                <span>Users</span>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className={activeMenu === "settings" ? "active" : ""}
                onClick={() => setActiveMenu("settings")}
              >
                <FaCog className="icon" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className={activeMenu === "history" ? "active" : ""}
                onClick={() => setActiveMenu("history")}
              >
                <FaHistory className="icon" />
                <span>History</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <h1>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} Dashboard</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;