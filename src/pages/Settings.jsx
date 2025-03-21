import React, { useState } from "react";
import "../styles/AdminPanel.css";

const Settings = () => {
  const [appName, setAppName] = useState("Fry & Froth");
  const [logo, setLogo] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("English");
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [enableEmailVerification, setEnableEmailVerification] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState("Minimum 8 characters");
  const [enable2FA, setEnable2FA] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("stripe");
  const [taxRate, setTaxRate] = useState(10);
  const [enableEmailNotifications, setEnableEmailNotifications] =
    useState(true);
  const [enableSMSNotifications, setEnableSMSNotifications] = useState(false);
  const [enablePushNotifications, setEnablePushNotifications] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
    // Here, you can send the settings to your backend or save them in localStorage
  };

  return (
    <div className="card">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="settings-grid">
          {/* General Settings */}
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="setting-item">
              <label>App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Enter app name"
              />
            </div>
            <div className="setting-item">
              <label>Logo Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>
            <div className="setting-item">
              <label>Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="IST">IST</option>
                <option value="PST">PST</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>

          {/* User Management Settings */}
          <div className="settings-section">
            <h3>User Management</h3>
            <div className="setting-item">
              <label>Enable User Registration</label>
              <input
                type="checkbox"
                checked={enableRegistration}
                onChange={(e) => setEnableRegistration(e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>Enable Email Verification</label>
              <input
                type="checkbox"
                checked={enableEmailVerification}
                onChange={(e) => setEnableEmailVerification(e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>Password Policies</label>
              <input
                type="text"
                value={passwordPolicy}
                onChange={(e) => setPasswordPolicy(e.target.value)}
                placeholder="Enter password policy"
              />
            </div>
          </div>

          {/* Payment and Billing Settings */}
          <div className="settings-section">
            <h3>Payment and Billing</h3>
            <div className="setting-item">
              <label>Payment Gateway</label>
              <select
                value={paymentGateway}
                onChange={(e) => setPaymentGateway(e.target.value)}
              >
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="Enter tax rate"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="setting-item">
              <label>Enable Email Notifications</label>
              <input
                type="checkbox"
                checked={enableEmailNotifications}
                onChange={(e) => setEnableEmailNotifications(e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>Enable SMS Notifications</label>
              <input
                type="checkbox"
                checked={enableSMSNotifications}
                onChange={(e) => setEnableSMSNotifications(e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>Enable Push Notifications</label>
              <input
                type="checkbox"
                checked={enablePushNotifications}
                onChange={(e) => setEnablePushNotifications(e.target.checked)}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-section">
            <h3>Security</h3>
            <div className="setting-item">
              <label>Enable Two-Factor Authentication</label>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
              />
            </div>
            <div className="setting-item">
              <label>IP Whitelisting</label>
              <input
                type="text"
                value={ipWhitelist}
                onChange={(e) => setIpWhitelist(e.target.value)}
                placeholder="Enter IP addresses"
              />
            </div>
            <div className="setting-item">
              <label>Session Timeout (minutes)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                placeholder="Enter session timeout"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="settings-section">
            <h3>Advanced</h3>
            <div className="setting-item">
              <label>Maintenance Mode</label>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="save-button">
          <button type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
