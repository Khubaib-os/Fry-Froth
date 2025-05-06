import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()        // 🟰 ✅ changed from fullName -> name
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
    name: "",          // ✅ Good
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch(
        "https://localhost:7183/api/RegisterUser/RegisterUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
        }
      );
  
      // 1) Read the entire body as text exactly once
      const raw = await response.text();
      console.log("Raw response:", raw);
  
      // 2) Try to parse JSON; if it fails, wrap the text in an object
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { message: raw };
      }
  
      // 3) Now branch on HTTP status
      if (response.ok) {
        console.log("Success:", data);
        alert(data.message || "Signup successful!");
        resetForm();
        navigate("/login");
      } else {
        console.error("Server Error:", data);
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (networkError) {
      console.error("Network Error:", networkError);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
                  name="name"            // ✅ Correct field name
                  id="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
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
