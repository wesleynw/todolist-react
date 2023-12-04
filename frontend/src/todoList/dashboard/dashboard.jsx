import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Task from '../../Components/Task/Task.jsx';
import Popup from '../Popup/Popup.jsx';
import TaskManager from '../../Components/Task/TaskManager.jsx';
import axios from "axios";
import LineAcrossPage from '../../Components/LineAcrossPage.jsx';

const MainBody = () => {
  const token = {
    token: "942006ed-ab5a-4919-87e3-90b79377c75b"
  };
  const [tasks, setTasks] = useState([]);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [newTask, setNewTask] = useState(['new task', '1:00', 'None']);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/get-todo', token);
        setTasks(response.data)
        // Handle the data from the response
        console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // Make the request when the component mounts
  
  // Function to toggle the Popup visibility
  const togglePopupVisibility = () => {
    setPopupVisibility(true);
  };

  const setVisibilityFalse = () => {
    setPopupVisibility(false);
  };

  const addTask = async () => {

    // Add the task to the list or perform other actions
    setTasks([...tasks, newTask]);
    // Call the post function to add Task to backend

    console.log(newTask);

    const taskData = {
      token: token.token,
      name: newTask[0],
      date: newTask[1],
      priority: newTask[2],
    };

      try {
        const response = await axios.post('http://localhost:3000/add-todo', taskData);
        // Handle the response (e.g., update state)
        console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error adding task:', error);
      }
      
  
    // Reset newTask to its initial state
    setNewTask(['new task', '1:00', 'None']);

  };

  function isEmpty(t) {
    return t[0] !== undefined;
  }

  return (
    <>
      <LineAcrossPage />

      <link href='https://fonts.googleapis.com/css?family=Alice' rel='stylesheet'></link>
      <div className={isPopupVisible ? 'shifted-content' : 'main-body'}>
      <h1>Today's To-Do List</h1>

      <h1 id = "date">Monday</h1>
      <LineAcrossPage />
      <div className = 'one-line'>
        <h1 id = "sort">Sort by</h1>
        <TaskManager />
      </div>

        {/*using react to add to-do list elements*/}
        {tasks
          .filter(isEmpty)
          .map((task, index) => (
            <Task key={index} name={task[0]} time={task[1]} priority={task[2]} />
        ))}

        <button className="main-body-create-task-button" onClick={togglePopupVisibility}>
          + Create task
        </button>
      </div>
      {isPopupVisible && (
        <Popup onClose={setVisibilityFalse} add={addTask} task = {newTask} />
      )}
    </>
  );
};

export default MainBody;
