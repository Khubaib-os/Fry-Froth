import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "../styles/AdminPanel.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);  // Start with an empty array, no need to load from localStorage
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    id: "",
    fullName: "",
    email: "",
    role: "",
    status: "",
  });

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7183/api/RegisterUser/GetUser");
        const data = await response.json();
        setUsers(data);  // Store fetched data in state
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error if needed (e.g., show a message to the user)
      }
    };

    fetchUsers();
  }, []);

  // Filter the users based on search term, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditUser = (user) => {
    setEditUserData({ ...user });
    setIsModalOpen(true);
  };

  const handleSaveEditedUser = () => {
    if (!editUserData.fullName || !editUserData.email || !editUserData.status) {
      alert("Please fill in all fields.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUserData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === editUserData.id ? { ...user, ...editUserData } : user
    );
    setUsers(updatedUsers);
    // You can store this updated data back to the backend if needed.
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      // Send delete request to backend if needed
    }
  };

  const handleChangeStatus = (userId, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    // Send status update to backend if needed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="card">
      <h2>Users Page</h2>

      {/* Search and Filters */}
      <div className="admin-controls">
      <div className="search-container">
      <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleChangeStatus(user.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editUserData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUserData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
        
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={handleSaveEditedUser}
                  className="save-btn"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
