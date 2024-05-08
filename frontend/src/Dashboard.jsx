import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Task from "./Components/Task/Task.jsx";
import TaskSkeleton from "./Components/Task/TaskSkeleton.jsx";
import Navbar from "./Navbar.jsx";
import * as sort_comparators from "./sort_comparators.js";

const Dashboard = () => {
  document.title = "Todo List";
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tasksDisplay, setTasksDisplay] = useState([]);
  const [taskPriorityFilter, setTaskPriorityFilter] = useState("None");
  const [taskSortMethod, setTaskSortMethod] = useState(() => sort_comparators.normal_comp)
  const [username, setUsername] = useState("");
  const [isNewTask, setIsNewTask] = useState(false);
  const inputRef = useRef(null);

  axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("/get-todo", {
          withCredentials: true,
        });
        setTasks(response.data);
        setTasksDisplay(response.data);
        response = await axios.get("/username", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch (error) {
        logout();
        // navigate("/login");
        // console.error("Error fetching data:", error);
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
    setTasksDisplay([...tasks, taskData]);
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

  const changeTaskName = async (key, name) => {
    try {
      await axios.post(
        "/change-todo-name",
        { key: key, name: name },
        { withCredentials: true }
      );

      const updatedTasks = tasks.map((item) => {
        if (item.key === key) {
          return { ...item, name: name };
        }
        return item;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error changing task name");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const handleSetFilter = (e) => {
    let filter = e.target.value;
    setTaskPriorityFilter(filter);
    setTasksDisplay(tasks.filter(task => filter == "None" || task.priority == filter));
  }

  const handleSetSort = (e) => {
    let comparators = [sort_comparators.normal_comp, sort_comparators.name_comp, sort_comparators.date_comp, sort_comparators.prio_comp]; // there's certainly a much more efficient way of doing this
    let orderComparator = comparators[e.target.value];
    setTaskSortMethod(orderComparator);
    if (e.target.value == 0) {
      setTasksDisplay(tasks.filter(task => taskPriorityFilter == "None" || task.priority == taskPriorityFilter));
    } else {
      setTasksDisplay([...tasksDisplay].sort(orderComparator));
    }
  }

  return (
    <>
      <Navbar name={username} />
      <div className={"main-body"}>
        <div className="task-list">
          <div className="flexbox-row">
            <h4>filter:&nbsp;&nbsp;&nbsp;</h4>
            <select className="select-menu" onChange={handleSetFilter}>
              <option>None</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <h4>&nbsp;&nbsp;&nbsp;sort:&nbsp;&nbsp;&nbsp;</h4>
            <select className="select-menu" onChange={handleSetSort}>
              <option value="0">Date added</option>
              <option value="1">Name</option>
              <option value="2">Due date</option>
              <option value="3">Priority</option>
            </select>

          </div>

          {tasks.filter(task => taskPriorityFilter == "None" || task.priority == taskPriorityFilter).length == 0 ? (
            <h2>Nothing to do today!</h2>
          ) : (
            <>
              {tasksDisplay
                .map((task) => (
                  <Task
                    key={task.key}
                    removeTask={removeTask}
                    changeTaskDate={changeTaskDate}
                    changeTaskName={changeTaskName}
                    task={task}
                  />
                ))
                // .sort(taskSortMethod)
                // .filter(task => taskPriorityFilter == "None" || task.priority == taskPriorityFilter).map((task) => (
                  

                // ))
              }
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