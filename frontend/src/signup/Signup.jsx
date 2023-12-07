import { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signup() {
  document.title = "Create Account";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/create-account",
        formData
      );
      Cookies.set("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const getErrorForField = (fieldName) => {
    const error = errors.find((err) => err.path == fieldName);
    return error ? error.msg : "";
  };

  return (
    <div id="login-container">
      <h2>Create a New Account</h2>
      <form id="createAccountForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="firstName"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <p className="error-msg">{getErrorForField("name")}</p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <p className="error-msg">{getErrorForField("email")}</p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="error-msg">{getErrorForField("password")}</p>
        <input
          type="password"
          id="confirmPassword"
          name="password_confirmation"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <p className="error-msg">{getErrorForField("password_confirmation")}</p>
        <button type="submit" id="createAccountButton">
          Create Account
        </button>
      </form>
      <Link className="link" to="../logIn">
        Already have an account? Log in
      </Link>
    </div>
  );
}

export default Signup;
