import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import FormInputField from "./FormInputField";

function Login() {
  document.title = "Login";
  const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      Cookies.set("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("fjdskla");
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
      console.log("mapped errors: ", mappedErrors);
      setErrors(mappedErrors);
    }
  };

  return (
    <>
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

        <button type="submit">
          <h3 className="submitButtonText">Log in</h3>
        </button>
      </form>
    </>
  );
}

export default Login;
