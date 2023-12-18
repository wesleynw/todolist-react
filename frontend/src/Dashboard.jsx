import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
  // const token = Cookies.get("token");

  useEffect(() => {
    // if (token == undefined) {
    //   navigate("/signup");
    // }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-todo", {
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

  const addTask = async (name, date, priority) => {
    const taskData = {
      key: String(uuidv4()),
      name: name,
      date: date,
      priority: priority,
    };

    try {
      await axios.post("http://localhost:3000/add-todo", taskData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setTasks([...tasks, taskData]);
  };

  const removeTask = async (key) => {
    try {
      await axios.post(
        "http://localhost:3000/delete-todo",
        { key: key },
        { withCredentials: true }
      );

      setTasks(tasks.filter((item) => item.key !== key));
    } catch (error) {
      console.error("Error removing task", error);
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
        {/* <div className="one-line"> */}
        {/* <h1 id="sort">Sort by</h1> */}
        {/* <TaskManager /> */}
        {/* </div> */}

        <div className="task-list">
          {tasks.length == 0 ? (
            <h2>Nothing to do today!</h2>
          ) : (
            <>
              {tasks.map((task) => (
                <Task key={task.key} removeTask={removeTask} task={task} />
              ))}
            </>
          )}

          {isNewTask == true ? (
            <div className="task-list add-task-section">
              <TaskSkeleton
                addTask={addTask}
                cancelTask={() => setIsNewTask(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsNewTask(true)}
              className="button add-task-button width-100"
            >
              + Add Task
            </button>
          )}
        </div>
      </div>

      <div className="footer">
        <a onClick={logout}>log out</a>
      </div>
    </>
  );
};

export default Dashboard;
