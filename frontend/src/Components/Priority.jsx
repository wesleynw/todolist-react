import React from 'react';
import './priorities.css';
import { useState } from 'react';

// return a circular button that represents a day
// when clicked on, alternate between every click for highlighting dark and light
// If clicked, store the day has been clicked as 0 if not, and 1 if clicked.


const Priority = ({setTask}) => {
  const [selectedPriority, setSelectedPriority] = useState('None');

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority === selectedPriority ? 'None' : priority);
    setTask[2] = priority;
  };

  const getButtonClassName = (priority) => {
    return selectedPriority === priority ? `p${priority}-clicked` : `p${priority}`;
  };

  return (
    <div id="priorities">
      <button
        className={getButtonClassName('None')}
        onClick={() => handlePriorityClick('None')}
      >
        None
      </button>
      <button
        className={getButtonClassName('Low')}
        onClick={() => handlePriorityClick('Low')}
      >
        Low
      </button>
      <button
        className={getButtonClassName('Med')}
        onClick={() => handlePriorityClick('Med')}
      >
        Med
      </button>
      <button
        className={getButtonClassName('High')}
        onClick={() => handlePriorityClick('High')}
      >
        High
      </button>
    </div>
  );
};

export default Priority;
