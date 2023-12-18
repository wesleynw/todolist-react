import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskSkeleton({ addTask, cancelTask }) {
  const skeleton = {
    name: "",
    date: "",
    priority: "",
  };
  const [formData, setFormData] = useState(skeleton);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addTask(formData.name, formData.date, formData.priority); // TODO: error check this, don't add if there was a server error
    setFormData(skeleton);
  };

  const handleCancelTask = () => {
    setFormData(skeleton);
    cancelTask();
  };

  return (
    <form className="task new-task" onSubmit={handleSubmit} autoComplete="off">
      {/* <div className="flexbox-vert-left-align"> */}
      <input
        name="name"
        placeholder="Task name"
        className="new-task-input"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      {/* <div className="new-task-date-input-container"> */}
      {/* <input
          name="date"
          className="new-task-date-input"
          type="date"
          ref={datePickerRef}
          onChange={handleChange}
          value={formData.date}
          required
        /> */}
      {/* <button onClick={handleButtonClick}>select a date</button>
      </div> */}

      {/* <select
        name="priority"
        className="new-task-input"
        onChange={handleChange}
        value={formData.priority}
        required
      >
        <option value="None">None</option>
        <option value="Low">Low</option>
        <option value="Med">Medium</option>
        <option value="High">High</option>
      </select> */}
      {/* </div> */}
      {/* <div className="flexbox-horiz"> */}
      <div className="add-task-button-container">
        <div>
          <button
            className="button add-task-button-cancel"
            onClick={handleCancelTask}
          >
            Cancel
          </button>
        </div>
        <div>
          <button className="button" type="submit">
            + Add Task
          </button>
        </div>
      </div>
      {/* </div> */}
    </form>
  );
}

export default TaskSkeleton;

TaskSkeleton.propTypes = {
  addTask: PropTypes.func,
  cancelTask: PropTypes.func,
};
