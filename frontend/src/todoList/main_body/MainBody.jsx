import React, { useState } from 'react';
import './main_body.css';
import Task from '../../Components/Task/Task.jsx';
import Popup from '../Popup/Popup.jsx';
import TaskManager from '../../Components/Task/TaskManager.jsx';

const MainBody = () => {
  // State to manage the visibility of the Popup
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [mBWidth, setmBWidth] = useState(1);

  // Function to toggle the Popup visibility
  const togglePopupVisibility = () => {
    setPopupVisibility(true);
  };

  const setVisibilityFalse = () => {
    setPopupVisibility(false);
  };

  const addTask = () => {

  }

  return (
    <>
        <div className = {isPopupVisible? "shifted-content" : "main-body"}>
          <TaskManager />
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
        {isPopupVisible && <Popup onClose = {setVisibilityFalse}/>} 
      
    </>
  );
};

export default MainBody;
