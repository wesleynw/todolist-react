import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./signup-login.module.css";
import FormInputField from "./FormInputField";

function Signup() {
  document.title = "Create Account";
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    email: "",
    password: "",
    password_confirmation: "",
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
          case "name":
            return { ...acc, name: error.msg };
          case "email":
            return { ...acc, email: error.msg };
          case "password":
            return { ...acc, password: error.msg };
          case "password_confirmation":
            return { ...acc, password_confirmation: error.msg };
          default:
            return acc;
        }
      });
      setErrors(mappedErrors);
      console.log(mappedErrors);
    }
  };

  return (
    <>
      <h1 className={styles.formTitle}>Create an account</h1>
      <p className={styles.formSubtitle}>
        Or{" "}
        <Link className="link" to="../logIn">
          <span>sign in to an existing account</span>
        </Link>
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInputField
          label="First name"
          type="text"
          name="first-name"
          value={formData.name}
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
          name="password_confirmation"
          value={formData.password_confirmation}
          handleChange={handleChange}
          errorMsg={errors.password_confirmation}
        />
        <button type="submit">
          <h3 className={styles.submitButtonText}>Create Account</h3>
        </button>
      </form>
    </>
  );
}

export default Signup;
