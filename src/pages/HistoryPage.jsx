import React, { useState, useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import "../styles/AdminPanel.css";

// Updated useOrders hook
const useOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://localhost:7183/api/RegisterUser/CompleteOrder", {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
          },
        });
  
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch orders: ${response.status} - ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Fetched raw data:", data);
  
        const formatted = data.map((order) => ({
          id: order.id,
          customerName: order.userName,
          customerPhone: order.phone,
          customerAddress: order.userAddress,
          total: parseFloat(order.bill),
          status: order.status,
          date: new Date(order.created), // ✅ ensure this is a proper Date
          items: order.productName.split(",").map((name) => ({
            name: name.trim(),
            price: parseFloat(order.productPrice),
            quantity: 1,
          })),
        }));
        
  
        console.log("Formatted orders:", formatted);
        setOrders(formatted);
  
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  

  return { orders };
};


// Export to Excel function
const exportToExcel = (orders) => {
  const data = orders.map((order) => ({
    "Order ID": order.id,
    "Customer Name": order.customerName,
    Phone: order.customerPhone,
    Address: order.customerAddress,
    Total: `$${order.total.toFixed(2)}`,
    Status: order.status,
    Items: order.items.map((item) => `${item.name} x ${item.quantity}`).join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  XLSX.writeFile(workbook, "delivered_orders.xlsx");
};

// Orders Table Component
const OrdersTable = ({ orders }) => {
  return (
    <div className="orders-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
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
              <td colSpan="7" className="no-orders">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>{order.customerAddress}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${item.price} x {item.quantity}
                      </li>
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

// History Page Component
const HistoryPage = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("monthly");

  // Only delivered orders
  const deliveredOrders = useMemo(() => {
    return orders.filter((order) => order.status === "delivered");
  }, [orders]);

  // Filter based on time
  const filteredByTime = useMemo(() => {
    const now = new Date();
    return deliveredOrders.filter((order) => {
      const orderDate = new Date(order.date);
      if (timeFilter === "daily") {
        return now.toDateString() === orderDate.toDateString();
      }
      if (timeFilter === "weekly") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return orderDate >= startOfWeek && orderDate <= endOfWeek;
      }
      if (timeFilter === "monthly") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }
      return false;
    });
  }, [deliveredOrders, timeFilter]);

  // Final Filter (by search)
  const finalOrders = useMemo(() => {
    return filteredByTime.filter((order) => {
      const term = searchTerm.toLowerCase();
      const orderIdStr = String(order.id).toLowerCase();
      return (
        order.customerName.toLowerCase().includes(term) ||
        orderIdStr.includes(term)
      );
    });
  }, [filteredByTime, searchTerm]);

  return (
    <div className="main-content">
      <h1>Delivered Orders History</h1>

      {/* Search and Time Filter Dropdown */}
      <div className="admin-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Dropdown for Time Filter */}
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="time-dropdown"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={finalOrders} />

      {/* Export Button */}
      <div className="export-bottom">
        <button onClick={() => exportToExcel(finalOrders)} className="export-button">
          Export Table
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
