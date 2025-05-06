import React, { useState, useEffect, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/AdminPanel.css";

// Custom hook to manage orders
const useOrders = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from backend API on component mount
  const fetchOrders = async () => {
    try {
      const response = await fetch("https://localhost:7183/api/Product/Orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status using correct API
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://localhost:7183/api/Product/UpdateStatus/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update frontend state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return { orders, updateOrderStatus };
};

// Orders Table Component
const OrdersTable = ({ orders, updateOrderStatus }) => {
  return (
    <div className="orders-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-orders">No orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.created).toLocaleString()}</td>
                <td>{order.userName}</td>
                <td>{order.phone}</td>
                <td>{order.userAddress}</td>
                <td>${parseFloat(order.bill).toFixed(2)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <ul>
                    {order.productName.split(", ").map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Orders Page Component
const OrdersPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.userName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  return (
    <div className="card">
      <h2>Orders Management</h2>
      <div className="admin-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <OrdersTable orders={filteredOrders} updateOrderStatus={updateOrderStatus} />
    </div>
  );
};

export default OrdersPage;
