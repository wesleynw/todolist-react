import React, { useState } from 'react';
import './main_body.css';
import Task from '../../Components/Task/Task.jsx';
import Popup from '../Popup/Popup.jsx';
import TaskManager from '../../Components/Task/TaskManager.jsx';

const MainBody = () => {
  // State to manage the visibility of the Popup
  const [isPopupVisible, setPopupVisibility] = useState(false);
  // useState[] set to what you get from backEnd
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(['new task', '1:00', 'None']);

  // Function to toggle the Popup visibility
  const togglePopupVisibility = () => {
    setPopupVisibility(true);
  };

  const setVisibilityFalse = () => {
    setPopupVisibility(false);
  };

  const addTask = () => {

    // Add the task to the list or perform other actions
    setTasks([...tasks, newTask]);
    // Call the post function to add Task to backend

    console.log(newTask);

    // Reset newTask to its initial state
    setNewTask(['new task', '1:00', 'None']);

    console.log(newTask);
  };

  return (
    <>
      <div className={isPopupVisible ? 'shifted-content' : 'main-body'}>
        <TaskManager />
        <h2>Monday</h2>
        {/* Can remove the next two lines */}
        <Task name="Task name here" time="1:00" priority="None" />
        <Task name="Hello" time="1:00" priority="High" />

        {/*using react to add to-do list elements*/}
        {tasks.map((task, index) => (
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
