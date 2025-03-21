import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
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

    rememberMe: Yup.boolean(),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Login Data:", values);
    setTimeout(() => {
      alert("Login Successful!");
      setSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="section">
      <div className="login-container">
        <h2>
          <span>Login</span>
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
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

              <div className="form-group">
                <label>Password:</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group remember-me">
                <Field type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">
                  <span>Remember Me</span>
                </label>
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">
                  <span> Forgot Password? </span>
                </Link>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn">
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p>
                Don't have an account?{" "}
                <Link to="/signup" style={{ color: "#d62828" }}>
                  Sign Up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
