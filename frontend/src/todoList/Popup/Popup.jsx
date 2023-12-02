import React, { useState } from 'react';
import './Popup.css';
import Day from '../../Components/Day/Day';
import Priority from '../../Components/Priority';

function Popup({ onClose }) {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskPriority, setTaskPriority] = useState('None');

  const handleAddTask = () => {
    
    setTaskName('');
    setTaskTime('');
    setTaskPriority('None');

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
          required
        />

        <div id="same-line">
          <p>Time </p>
        </div>
        <input
          type="text"
          id="ip"
          placeholder="1:00"
          required
        />

        <div id="same-line">
          <p>Priority </p>
        </div>
        <Priority />

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
