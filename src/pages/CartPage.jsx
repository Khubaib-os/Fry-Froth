import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CartPage.css";

// Import Toast library
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Just import, no configure needed

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
    return subtotal - (subtotal * discount) / 100;
  };

  const applyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscount(10);
      toast.success("Discount applied!", { position: "top-center" });
    } else {
      toast.error("Invalid discount code", { position: "top-center" });
    }
  };

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
    onSubmit: async () => {
      setShowConfirmationModal(true);
    },
  });

  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const confirmOrder = async () => {
    setIsPlacingOrder(true);

    try {
      const newOrder = {
        id: generateOrderId(),
        productName: cart.map(item => item.name).join(", "),
        productPrice: cart
          .reduce((total, item) => total + parseFloat(item.price.replace("$", "")) * item.quantity, 0)
          .toFixed(2),
        userName: formik.values.name,
        phone: formik.values.phone,
        userAddress: formik.values.address,
        status: "pending",
        bill: calculateTotal().toFixed(2),
        created: new Date().toISOString(),
      };

      const response = await fetch('https://localhost:7183/api/Product/AddToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      });

      if (!response.ok) {
        throw new Error(`Failed to place order. Status: ${response.status}`);
      }

      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      savedOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(savedOrders));

      toast.success("Order placed successfully! 🎉", { position: "top-center" });

      setCart([]);
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.", { position: "top-center" });
    } finally {
      setIsPlacingOrder(false);
      setShowConfirmationModal(false);
    }
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
              {cart.map((item) => {
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
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.name)}>
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
              {formik.touched.name && formik.errors.name && (
                <div className="error-message">{formik.errors.name}</div>
              )}
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
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}
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
              {formik.touched.address && formik.errors.address && (
                <div className="error-message">{formik.errors.address}</div>
              )}
            </div>
            <div className="form-buttons">
              <button type="submit" className="place-order-button" disabled={isPlacingOrder}>
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
              <button type="button" className="clear-cart-button" onClick={() => setCart([])}>
                Clear Cart
              </button>
              <button type="button" className="continue-shopping-button" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </form>

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
