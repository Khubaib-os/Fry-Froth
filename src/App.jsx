import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPass";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage";

const AppContent = ({ cart, setCart }) => {
  const location = useLocation();

  // Show Navbar and Footer only on specific routes (excluding /admin)
  const showNavbarAndFooter = ["/", "/cart", "/profile"].includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {showNavbarAndFooter && <Navbar cart={cart} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home cart={cart} setCart={setCart} />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <CartPage cart={cart} setCart={setCart} />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        <Route
          path="/admin"
          element={
            <>
              <AdminPanel />
              {/* Footer not shown here */}
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
              {showNavbarAndFooter && <Footer />}
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <AppContent cart={cart} setCart={setCart} />
      <ToastContainer />
    </Router>
  );
};

export default App;
