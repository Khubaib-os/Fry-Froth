import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CartPage.css";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [setCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Remove item from cart
  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  // Update quantity of an item with debouncing
  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return; // Limit quantity to 10
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price with discount
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
    return subtotal - (subtotal * discount) / 100;
  };

  // Apply discount code
  const applyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscount(10); // 10% discount
      alert("Discount applied!");
    } else {
      alert("Invalid discount code");
    }
  };

  // Formik and Yup validation
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Full name is required")
        .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits without dashes"),
      address: Yup.string()
        .required("Delivery address is required")
        .min(10, "Address must be at least 10 characters"),
    }),
    onSubmit: async (values) => {
      setShowConfirmationModal(true);
    },
  });

  // Confirm order placement
  const confirmOrder = async () => {
    setIsPlacingOrder(true);

    // Create order object
    const newOrder = {
      id: Date.now(), // Unique order ID
      customerName: formik.values.name,
      customerPhone: formik.values.phone,
      customerAddress: formik.values.address,
      items: cart,
      total: calculateTotal(),
      status: "pending", // Default status
    };

    // Save order to localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    // Clear cart and redirect
    setCart([]);
    navigate("/");
    setIsPlacingOrder(false);
    setShowConfirmationModal(false);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty.</p>
          <p>Start shopping to add items to your cart!</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            <AnimatePresence>
              {cart.map((item, index) => {
                const itemPrice = parseFloat(item.price.replace("$", "")) * item.quantity;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="cart-item"
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                      <p>Total: ${itemPrice.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        aria-label="Remove item"
                        className="remove-item"
                        onClick={() => removeFromCart(item.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <div className="discount-section">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={applyDiscount}>Apply Discount</button>
          </div>
          <p className="cart-total">Grand Total: ${calculateTotal().toFixed(2)}</p>

          {/* Address Form with Formik */}
          <form className="address-form" onSubmit={formik.handleSubmit}>
            <h3>Delivery Details</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-message">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your delivery address..."
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              ></textarea>
              {formik.touched.address && formik.errors.address ? (
                <div className="error-message">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="form-buttons">
              <button type="submit" className="place-order-button" disabled={isPlacingOrder}>
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
              <button
                type="button"
                className="clear-cart-button"
                onClick={() => setCart([])}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="continue-shopping-button"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </form>

          {/* Confirmation Modal */}
          {showConfirmationModal && (
            <div className="confirmation-modal">
              <p>Are you sure you want to place the order?</p>
              <button onClick={confirmOrder}>Yes</button>
              <button onClick={() => setShowConfirmationModal(false)}>No</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(CartPage);