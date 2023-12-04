import { useState } from 'react'
import './signup'
import './styles.css'
import { Link } from 'react-router-dom';


function Signup() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, changeStatus] = useState(false);

  return (
    <>
        <div class="account-container">
          <h2>Create a New Account</h2>
          <form id="createAccountForm">
            <input type="text" id="firstName" placeholder="Name" required/>
            <input type="email" id="email" placeholder="Email Address" required/>
            <input type="text" id="username" placeholder="Username" required/>
            <input type="password" id="password" placeholder="Password" required/>
            <input type="password" id="confirmPassword" placeholder="Confirm Password" required/>
            <button type="submit" id="createAccountButton">Create Account</button>
          </form>
          <Link to='../logIn'>Already have an account? Log in</Link>  
        </div>
    </>
  )
}

export default Signup
