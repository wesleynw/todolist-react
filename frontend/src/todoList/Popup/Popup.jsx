import React, { useState } from 'react';
import './Popup.css';
import Day from '../../Components/Day/Day';
import Priority from '../../Components/Priority';

function Popup({ onClose }) {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskPriority, setTaskPriority] = useState('None');

  const handleAddTask = () => {
    // Perform any additional logic here, e.g., sending data to the parent component
    // You can also pass the task data to the parent component if needed

    // Reset input fields
    setTaskName('');
    setTaskTime('');
    setTaskPriority('None');

    // Close the Popup
    onClose();
  };

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Be Vietnam Pro' rel='stylesheet'></link>

      <section id="pop-up">
        <div id="same-line">
          <p>Task Name </p>
        </div>
        <input
          type="text"
          id="ip"
          placeholder="Clean Room"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />

        <div id="same-line">
          <p>Time </p>
        </div>
        <input
          type="text"
          id="ip"
          placeholder="1:00"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          required
        />

        <div id="same-line">
          <p>Priority </p>
        </div>
        <Priority onPriorityChange={(priority) => setTaskPriority(priority)} />

        <div id="same-line">
          <p>Days to work </p>
        </div>
        <Day />

        <button id="at" onClick={handleAddTask}>
          Add Task
        </button>
      </section>
    </>
  );
}

export default Popup;
