import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserCircle, FaEnvelope, FaUserTag, FaCheckCircle, FaEdit, FaSignOutAlt } from "react-icons/fa";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    status: "",
  });

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login"); // Redirect to login if no user data
    } else {
      setUser(userData);
      setFormData(userData);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.role || !formData.status) {
      alert("All fields are required!");
      return;
    }

    // Update user data in localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear user session
      localStorage.removeItem("user");

      // Redirect to login page
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="loading">
        <div className="spinner"></div> Loading...
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>
        <FaUserCircle /> Profile
      </h2>
      <div className="profile-details">
        {isEditing ? (
          <form className="profile-form">
            <label>
              <FaUser /> Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              <FaEnvelope /> Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              <FaUserTag /> Role:
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              <FaCheckCircle /> Status:
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              />
            </label>
          </form>
        ) : (
          <>
            <p>
              <strong>
                <FaUser /> Name:
              </strong>{" "}
              {user.fullName}
            </p>
            <p>
              <strong>
                <FaEnvelope /> Email:
              </strong>{" "}
              {user.email}
            </p>
            <p>
              <strong>
                <FaUserTag /> Role:
              </strong>{" "}
              {user.role}
            </p>
            <p>
              <strong>
                <FaCheckCircle /> Status:
              </strong>{" "}
              {user.status}
            </p>
          </>
        )}
      </div>

      <div className="button-container">
        {isEditing ? (
          <button onClick={handleUpdateProfile} className="update-profile-btn">
            <FaEdit /> Save Changes
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="update-profile-btn">
            <FaEdit /> Edit Profile
          </button>
        )}

        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;