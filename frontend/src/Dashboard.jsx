import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Task from "./Components/Task/Task.jsx";
import LineAcrossPage from "./Components/LineAcrossPage.jsx";
import TaskSkeleton from "./Components/Task/TaskSkeleton.jsx";
import Navbar from "./Navbar.jsx";

const Dashboard = () => {
  document.title = "Todo List";
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(false);
  const inputRef = useRef(null);

  axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/get-todo", {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        navigate("/login");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  const openNewTaskField = () => {
    setIsNewTask(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const addTask = async (name, date, priority) => {
    const taskData = {
      key: String(uuidv4()),
      name: name,
      date: date,
      priority: priority,
    };

    try {
      await axios.post("/add-todo", taskData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setTasks([...tasks, taskData]);
  };

  const removeTask = async (key) => {
    try {
      await axios.post("/delete-todo", { key: key }, { withCredentials: true });
      setTasks(tasks.filter((item) => item.key !== key));
    } catch (error) {
      console.error("Error removing task", error);
    }
  };

  const changeTaskDate = async (key, date) => {
    try {
      await axios.post(
        "/change-todo-date",
        { key: key, date: date },
        { withCredentials: true }
      );

      const updatedTasks = tasks.map((item) => {
        if (item.key === key) {
          return { ...item, [date]: date };
        }
        return item;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error changing task date");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className={"main-body"}>
        <h1 className="title">Today&apos;s To-Do List</h1>
        <LineAcrossPage />

        <div className="task-list">
          {tasks.length == 0 ? (
            <h2>Nothing to do today!</h2>
          ) : (
            <>
              {tasks.map((task) => (
                <Task
                  key={task.key}
                  removeTask={removeTask}
                  changeTaskDate={changeTaskDate}
                  task={task}
                />
              ))}
            </>
          )}

          {isNewTask == true ? (
            <div className="task-list add-task-section">
              <TaskSkeleton
                addTask={addTask}
                cancelTask={() => setIsNewTask(false)}
                inputRefForward={inputRef}
              />
            </div>
          ) : (
            <button
              onClick={openNewTaskField}
              className="button add-task-button width-100"
            >
              + Add Task
            </button>
          )}
        </div>
      </div>

      <div className="footer">
        <a className="logout-button" onClick={logout}>
          log out
        </a>
        <p>Created by Wesley Weisenberger</p>
      </div>
    </>
  );
};

export default Dashboard;
