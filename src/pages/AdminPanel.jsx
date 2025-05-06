import React, { useState } from "react";
import { FaSearch, FaList, FaBox, FaUsers, FaCog, FaHistory } from "react-icons/fa";
import UsersPage from "./UsersPage";
import Settings from "./Settings";
import OrdersPage from "./OrdersPage";
import HistoryPage from "./HistoryPage"; // ✅ Import History Page
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("orders");

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "orders":
        return <OrdersPage />;
      case "products":
        return <div className="card">Products Management</div>;
      case "users":
        return <UsersPage />;
      case "settings":
        return <Settings />;
      case "history": // ✅ History option
        return <HistoryPage />;
      default:
        return <div className="card">Select a menu option</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin</h2>
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
      <div className="main-content">
        <h1>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
