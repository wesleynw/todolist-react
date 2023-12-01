import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Signup from './signup/Signup.jsx'
import Popup from './todoList/Popup/Popup.jsx'
import NavBar from './Components/NavBar'
import MainBody from './todoList/main_body/MainBody'

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, changeStatus] = useState(false);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/signup' element = {<Signup />} />
        <Route path = '/todoList/Popup' element = {<Popup/>} />
        <Route path = '/todoList/main_body' element = {<MainBody/>} />
      </Routes>
    </>
  )
}

export default App
