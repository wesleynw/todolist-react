import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import FormInputField from "./FormInputField";

function Signup() {
  document.title = "Create Account";
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
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
        "http://localhost:3000/create-account",
        formData
      );
      Cookies.set("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors(initialState);

      const mappedErrors = error.response.data.errors.reduce((acc, error) => {
        switch (error.path) {
          case "firstName":
            return { ...acc, name: error.msg };
          case "email":
            return { ...acc, email: error.msg };
          case "password":
            return { ...acc, password: error.msg };
          case "passwordConfirmation":
            return { ...acc, passwordConfirmation: error.msg };
          default:
            return acc;
        }
      });

      setErrors(mappedErrors);
    }
  };

  return (
    <>
      <h2 className="title">Create an account</h2>
      <p className="formSubtitle">
        Or{" "}
        <Link className="link" to="../login">
          <span>sign in to an existing account</span>
        </Link>
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <FormInputField
          label="First name"
          type="text"
          name="firstName"
          value={formData.firstName}
          handleChange={handleChange}
          errorMsg={errors.firstName}
        />

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

        <FormInputField
          label="Password confirmation"
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          handleChange={handleChange}
          errorMsg={errors.passwordConfirmation}
        />
        <button type="submit">
          <h3 className="submitButtonText">Create Account</h3>
        </button>
      </form>
    </>
  );
}

export default Signup;
