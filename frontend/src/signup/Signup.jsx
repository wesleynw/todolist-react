import { useState } from "react";
import "./signup";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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

      if (response.status == 201) {
        Cookies.set("token", response.data.token);
        // <Navigate to="/dashboard" />;
        // history.push("/dashboard");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="login-container">
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
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          <button type="submit" id="createAccountButton">
            Create Account
          </button>
        </form>
        <Link className = "link" to="../logIn">Already have an account? Log in</Link>
      </div>
    </>
  );
}

export default Signup;
