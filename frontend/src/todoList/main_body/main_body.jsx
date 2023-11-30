import React from 'react';
import 'main_body.css';

const TaskManager = () => {
  return (
    <div className="task-manager">
      <div className="filter-buttons">
        <button className="button">Default</button>
        <button className="button">Priority</button>
        <button className="button">Time</button>
      </div>
      
      <h2>Monday</h2>
      
      <div className="task-list">
        {/* Repeat this div for each task */}
        <div className="task">
          <input type="checkbox" />
          <span className="task-time">1:00</span>
          <span className="task-name">Task Name Here</span>
          <span className="task-priority"></span>
        </div>
        {/* ... */}
      </div>
      
      <button className="create-task-button">+ Create task</button>
    </div>
  );
}

export default TaskManager;
