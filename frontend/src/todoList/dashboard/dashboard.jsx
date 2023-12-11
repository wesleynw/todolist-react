import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import TaskManager from "../../Components/Task/TaskManager.jsx";
import Task from "../../Components/Task/Task.jsx";
import LineAcrossPage from "../../Components/LineAcrossPage.jsx";
import TaskSkeleton from "../../Components/Task/TaskSkeleton.jsx";

const Dashboard = () => {
  document.title = "Todo List";
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token == undefined) {
      navigate("/signup");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-todo", {
          headers: {
            token: token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token, navigate]);

  const addTask = async (name, date, priority) => {
    const taskData = {
      token: token,
      key: String(uuidv4()),
      name: name,
      date: date,
      priority: priority,
    };

    try {
      await axios.post("http://localhost:3000/add-todo", taskData);
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setTasks([...tasks, taskData]);
  };

  const removeTask = async (key) => {
    try {
      await axios.post("http://localhost:3000/delete-todo", {
        token: token,
        key: key,
      });

      setTasks(tasks.filter((item) => item.key !== key));
    } catch (error) {
      console.error("Error removing task", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/signup");
  };

  return (
    <>
      <div className={"main-body"}>
        <h1 className="title">Today&apos;s To-Do List</h1>
        <LineAcrossPage />
        {/* <div className="one-line"> */}
        {/* <h1 id="sort">Sort by</h1> */}
        {/* <TaskManager /> */}
        {/* </div> */}
        {tasks.length == 0 ? (
          <h2>Nothing to do today!</h2>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <Task key={task.key} removeTask={removeTask} task={task} />
            ))}
          </div>
        )}
        <div className="task-list">
          <TaskSkeleton addTask={addTask} />
        </div>
      </div>

      <button id="logout-button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Dashboard;
