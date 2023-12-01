import React, { useState } from 'react';
import './main_body.css';
import Task from '../../Components/Task/Task.jsx';
import Popup from '../Popup/Popup.jsx';
import TaskManager from '../../Components/Task/TaskManager.jsx';

const MainBody = () => {
  // State to manage the visibility of the Popup
  const [isPopupVisible, setPopupVisibility] = useState(false);

  // Function to toggle the Popup visibility
  const togglePopupVisibility = () => {
    setPopupVisibility(true);
  };

  return (
    <>
      <TaskManager />
      <div>
        <h2>Monday</h2>
        <Task name="Task name here" time="1:00" priority="None" />
        <Task name="Hello" time="1:00" priority="High" />
        <button
          className="main-body-create-task-button"
          onClick={togglePopupVisibility}
        >
          + Create task
        </button>
      </div>
      {isPopupVisible && <Popup />} 
    </>
  );
};

export default MainBody;
