import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInputField from "./FormInputField";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

function Login() {
  document.title = "Login";
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

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
      console.log(formData);
      await axios.post("http://localhost:3000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Cookies.set("token", response.data + ";SameSite=Strict");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setErrors(initialState);

      console.log("errors: ", error.response.data.errors);

      const mappedErrors = error.response.data.errors.reduce(
        (acc, error) => {
          if (error.path === "email") {
            return { ...acc, email: error.msg };
          } else if (error.path === "password") {
            return { ...acc, password: error.msg };
          }
          return acc;
        },
        { ...initialState }
      );
      setErrors(mappedErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-body">
        <h2 className="title">Login to your account</h2>
        <p className="formSubtitle">
          Or{" "}
          <Link className="link" to="../signup">
            <span>create a new account</span>
          </Link>
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <FormInputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            errorMsg={errors.email}
          />

          <FormInputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
            errorMsg={errors.password}
          />

          <button className="button width-100" type="submit">
            <h3 className="submitButtonText">Log in</h3>
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
