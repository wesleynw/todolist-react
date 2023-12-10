import React, { useState } from "react";
// import './task.css';

const TaskManager = () => {
  const [selectedFilter, setSelectedFilter] = useState("Default");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter === selectedFilter ? "Default" : filter);
    console.log(`Clicked on ${filter}`);
  };

  const getButtonClassName = (filter) => {
    return selectedFilter === filter ? "filter-clicked" : "filter";
  };

  return (
    <>
      <div className="task-manager">
        <div className="filter-buttons">
          <button
            className={getButtonClassName("Default")}
            onClick={() => handleFilterClick("Default")}
          >
            Default
          </button>
          <button
            className={getButtonClassName("Priority")}
            onClick={() => handleFilterClick("Priority")}
          >
            Priority
          </button>
          <button
            className={getButtonClassName("Time")}
            onClick={() => handleFilterClick("Time")}
          >
            Time
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
