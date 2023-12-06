import { useEffect, useState } from "react";
import "./dashboard.css";
import Popup from "../Popup/Popup.jsx";
import TaskManager from "../../Components/Task/TaskManager.jsx";
import axios from "axios";
import Task from "../../Components/Task/Task.jsx";
import LineAcrossPage from "../../Components/LineAcrossPage.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [newTask, setNewTask] = useState(["new task", "1:00", "None"]);
  const [todoState, setTodoState] = useState(uuidv4());

  const token = Cookies.get("token");
  if (token == undefined) {
    navigate("/signup");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-todo", {
          headers: {
            token: token,
          },
        });
        setTasks(response.data);
        // setTodoState(uuidv4());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token, todoState]);

  const addTask = async () => {
    const taskData = {
      token: token,
      key: String(uuidv4()),
      name: newTask[0],
      date: newTask[1],
      priority: newTask[2],
    };

    try {
      await axios.post("http://localhost:3000/add-todo", taskData);
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setTasks([...tasks, taskData]);

    // Reset newTask to its initial state
    setNewTask(["new task", "1:00", "None"]);
    // await fetchData();
    // setTodoState(uuidv4());
  };

  const removeTask = async (key) => {
    try {
      await axios.post("http://localhost:3000/delete-todo", {
        token: token,
        key: key,
      });
      setTodoState(uuidv4());
    } catch (error) {
      console.error("Error removing task", error);
    }
  };

  // Function to toggle the Popup visibility
  const togglePopupVisibility = () => {
    setPopupVisibility(true);
  };

  const setVisibilityFalse = () => {
    setPopupVisibility(false);
  };

  return (
    <>
      <LineAcrossPage />

      <link
        href="https://fonts.googleapis.com/css?family=Alice"
        rel="stylesheet"
      ></link>
      <div className={isPopupVisible ? "shifted-content" : "main-body"}>
        <h1>Today&apos;s To-Do List</h1>
        <h1 id="date">Monday</h1>
        <LineAcrossPage />
        <div className="one-line">
          <h1 id="sort">Sort by</h1>
          <TaskManager />
        </div>
        {tasks.length == 0 ? (
          <h2>Nothing to do today!</h2>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <Task key={task.key} removeTask={removeTask} task={task} />
            ))}
          </div>
        )}
        <button
          className="main-body-create-task-button"
          onClick={togglePopupVisibility}
        >
          + Create task
        </button>
      </div>
      {isPopupVisible && (
        <Popup onClose={setVisibilityFalse} add={addTask} task={newTask} />
      )}
    </>
  );
};

export default Dashboard;
