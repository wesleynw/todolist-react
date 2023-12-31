import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInputField from "./Components/FormInputField";
import Navbar from "./Navbar";
import Cookies from "js-cookie";

function Signup() {
  document.title = "Create Account";
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const initialState = {
    name: "",
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
      await axios.post(
        "https://wesleyweisenberger.xyz/api/create-account",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(initialState);
        const serverErrors = error.response.data.errors;
        const mappedErrors = serverErrors.reduce((acc, error) => {
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
        }, {});
        setErrors(mappedErrors);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-body">
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
            name="name"
            value={formData.name}
            handleChange={handleChange}
            errorMsg={errors.name}
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
          <button className="button width-100" type="submit">
            <h3 className="submitButtonText">Create Account</h3>
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
