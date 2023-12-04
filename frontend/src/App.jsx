import './App.css'
import Signup from './signup/Signup.jsx'
import Popup from './todoList/Popup/Popup.jsx'
import NavBar from './Components/NavBar'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./todoList/dashboard/dashboard.jsx";
import Cookies from "js-cookie";

function isAuthed() {
  console.log(Cookies.get("token"));
  return Cookies.get("token") != undefined;
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthed() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signup" />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todoList/Popup" element={<Popup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
