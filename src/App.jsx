import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPass";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage

const AppContent = ({ cart, setCart }) => {
  const location = useLocation(); // Get current route location

  // Define routes where Navbar and Footer should be shown
  const showNavbarAndFooter = ["/", "/cart", "/admin", "/profile"].includes(
    location.pathname
  );

  return (
    <>
      {/* Conditionally render Navbar */}
      {showNavbarAndFooter && <Navbar cart={cart} />}

      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Home cart={cart} setCart={setCart} />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        {/* Cart Page Route */}
        <Route
          path="/cart"
          element={
            <>
              <CartPage cart={cart} setCart={setCart} />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        {/* Admin Panel Route */}
        <Route
          path="/admin"
          element={
            <>
              <AdminPanel />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        {/* Profile Page Route */}
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [cart, setCart] = useState([]); // Cart state

  return (
    <Router>
      <AppContent cart={cart} setCart={setCart} />
    </Router>
  );
};

export default App;