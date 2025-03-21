import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must have at least one uppercase letter")
      .matches(/[a-z]/, "Password must have at least one lowercase letter")
      .matches(/\d/, "Password must have at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must have at least one special character (@$!%*?&)"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms & conditions")
      .required("Terms & Conditions must be accepted"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Signup Data:", values);

    // Create a user object to store in localStorage
    const user = {
      id: Date.now(), // Unique ID for the user
      fullName: values.fullName,
      email: values.email,
      password: values.password, 
      status: "Active", 
      role: "Customer", 
    };

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the list
    const updatedUsers = [...existingUsers, user];

    // Save the updated list back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Save current user data to localStorage for session management
    localStorage.setItem("user", JSON.stringify(user));

    // Simulate a delay for submission
    setTimeout(() => {
      alert("Signup Successful!");
      setSubmitting(false);
      resetForm(); 
      navigate("/login"); 
    }, 1000);
  };

  return (
    <div className="section">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <Field
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group terms">
                <Field
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="form-checkbox"
                />
                <label htmlFor="terms">I accept the Terms & Conditions</label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="error-message"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="login-option">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;