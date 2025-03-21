import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/forgotPass.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  // ✅ Initial Values
  const initialValues = {
    email: "",
  };

  // ✅ Submit Handler
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Reset Request:", values);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="section">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>

        {submitted ? (
          <p className="success-message">
            ✅ A password reset link has been sent to your email.
          </p>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="forgot-password-form">
                {/* Email Field */}
                <div className="form-group">
                  <label>Email:</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting} className="btn">
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Back to Login Link */}
        <p className="back-to-login">
          <Link to="/login">⬅ Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
