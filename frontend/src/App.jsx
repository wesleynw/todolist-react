import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dashboard from "./todoList/dashboard/Dashboard.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import "./App.css";

function isAuthed() {
  return Cookies.get("token") != undefined;
}

function App() {
  return (
    <>
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
