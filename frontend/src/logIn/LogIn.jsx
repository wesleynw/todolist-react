import "../signup/signup.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login-container">
        <h2>Log in to your account</h2>
        <form id="loginForm">
          <input type="text" id="email" placeholder="Email Address" required />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <button type="submit" id="continueButton">
            Continue
          </button>
          <p className="terms">
            By continuing with any of the options below, you agree to our Terms
            of Service and have read our Privacy Policy.
          </p>
          <Link className="link" to="../signup">
            Create a new account
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
