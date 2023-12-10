import PropTypes from "prop-types";
import { useState } from "react";
// import "./task.css";

function TaskSkeleton({ addTask }) {
  const skeleton = {
    name: "",
    date: "",
    priority: "",
  };
  const [formData, setFormData] = useState(skeleton);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await addTask(formData.name, formData.date, formData.priority);
    setFormData(skeleton);
  };

  return (
    <form className="task" onSubmit={handleSubmit}>
      <div className="flexbox-vert-left-align">
        <input
          name="name"
          placeholder="Task name"
          className="new-task-input"
          onChange={handleChange}
          value={formData.name}
          autoComplete="off"
          required
        />
        <input
          name="date"
          className="new-task-input"
          type="date"
          onChange={handleChange}
          value={formData.date}
          required
        />
        <select
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
        </select>
      </div>
      {/* <div className="flexbox-horiz"> */}
      <button type="submit">+ Add Task</button>
      {/* </div> */}
    </form>
  );
}

export default TaskSkeleton;

TaskSkeleton.propTypes = {
  addTask: PropTypes.func,
};
