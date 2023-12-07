import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login-Signup.css";

function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:3000/login",
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
    <div className="form-container">
      <h2 className="form-title">Log in to your account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
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
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="error-msg">{getErrorForField("password")}</p>
        <button type="submit" id="continueButton">
          Continue
        </button>
        <p className="terms">
          By continuing with any of the options below, you agree to our Terms of
          Service and have read our Privacy Policy.
        </p>
        <Link className="link" to="../signup">
          Create a new account
        </Link>
      </form>
    </div>
  );
}

export default Login;
