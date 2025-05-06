import { Link } from "react-router-dom";
import { FaShoppingCart, FaGlobe, FaUserCog, FaHome, FaUser } from "react-icons/fa"; // Added FaUser
import "../styles/navbar.css";
import logo from "../assets/Logo.png";

const Navbar = ({ cart }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Fry & Froth Logo" className="logo-img" />
          <span className="heading">Fry & Froth</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* Home Button */}
        <Link to="/" className="icon-btn home-icon">
          <FaHome size={30} color="#00BFFF" />
        </Link>

        {/* Admin Panel Button
        <Link to="/admin" className="icon-btn admin-icon">
          <FaUserCog size={30} color="#00BFFF" />
        </Link> */}

        {/* User Profile Icon */}
        <Link to="/profile" className="icon-btn profile-icon">
          <FaUser size={30} color="#00BFFF" /> {/* Added FaUser */}
        </Link>

        {/* Cart Button */}
        <Link to="/cart" className="icon-btn cart-icon">
          <FaShoppingCart size={30} color="#00BFFF" />
          {cart.length > 0 && (
            <span className="cart-count">{cart.length}</span>
          )}
        </Link>

        {/* Language Toggle Button */}
        <button
          className="icon-btn"
          onClick={() => alert("Language switch feature coming soon!")}
        >
          <FaGlobe size={30} color="#00BFFF" />
        </button>

        <Link to="/login" className="btn logIn">
          Login
        </Link>
        <Link to="/signup" className="btn signUp">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;