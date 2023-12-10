import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./signup-login.module.css";
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
      <h1 className={styles.formTitle}>Log in to your account</h1>
      <p className={styles.formSubtitle}>
        Or{" "}
        <Link className="link" to="../signup">
          <span>create a new account</span>
        </Link>
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <h3 className={styles.submitButtonText}>Log in</h3>
        </button>
      </form>
    </>
  );
}

export default Login;
