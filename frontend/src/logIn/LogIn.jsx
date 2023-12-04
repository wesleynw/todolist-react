import { useState } from 'react'
import '../signup/signup.js'
import '../signup/styles.css'
import { Link } from 'react-router-dom';



function LogIn() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, changeStatus] = useState(false);

  return (
    <>
        <div class="login-container">
            <h2>Log in to your account</h2>
            <form id="loginForm">
            <input type="text" id="email" placeholder="Email Address" required/>
                <input type="text" id="password" placeholder="Password" required/>
                <button type="submit" id="continueButton">Continue</button>
                <p class="terms">
                By continuing with any of the options below, you agree to our 
                Terms of Service and have read our Privacy Policy.
                </p>
                <div class="separator"></div>
                <button type="button" class="social-button google">Continue with Google</button>
                <Link to='../signup'>Create a new account</Link>  
            </form>
       
        </div>
    </>
  )
}

export default LogIn
