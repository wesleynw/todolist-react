import React, { useState } from "react";
import "./Popup.css";
import Day from "../../Components/Day/Day";
import Priority from "../../Components/Priority";

function Popup({ onClose, add, task }) {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleAddTask = () => {
    // Here you can access taskName, taskTime, and taskPriority
    console.log("Task Name:", taskName);
    console.log("Task Time:", taskTime);

    // Call the provided functions
    console.log(taskName.value);
    if (taskName != "") {
      task[0] = taskName;
      task[1] = taskTime;

      add();
    }

    // Close the popup
    onClose();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Be Vietnam Pro"
        rel="stylesheet"
      ></link>

      <section id="pop-up">
        <div id="same-line">
          <p>Task Name </p>
        </div>
        <input
          type="text"
          id="ip"
          placeholder="Clean Room"
          required
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <div id="same-line">
          <p>Time </p>
        </div>
        <input
          type="text"
          id="ip"
          placeholder="1:00"
          required
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />

        <div id="same-line">
          <p>Priority </p>
        </div>
        <Priority setTask={task} />

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
