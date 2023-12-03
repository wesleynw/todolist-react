// import { useState } from 'react'
import "./signup";
import "./styles.css";

function Signup() {
  // const [count, setCount] = useState(0)
  // const [isLoggedIn, changeStatus] = useState(false);

  return (
    <>
      <div className="login-container">
        <h2>Log in to your account</h2>
        <form id="loginForm">
          <input type="text" id="email" placeholder="Email Address" required />
          <input type="text" id="password" placeholder="Password" required />
          <button type="submit" id="continueButton">
            Continue
          </button>
          <p className="terms">
            By continuing with any of the options below, you agree to our Terms
            of Service and have read our Privacy Policy.
          </p>
          <div className="separator"></div>
          <button type="button" className="social-button google">
            Continue with Google
          </button>
          <a href="create_account.html" className="create-account-link">
            Create a new account
          </a>
        </form>
      </div>
    </>
  );
}

export default Signup;
