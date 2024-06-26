import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskSkeleton({ addTask, cancelTask, inputRefForward }) {
  const skeleton = {
    name: "",
    date: undefined,
    priority: "",
  };
  const [formData, setFormData] = useState(skeleton);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRefForward) {
      inputRefForward.current = inputRef.current;
    }
  }, [inputRefForward]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
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
      <div className="">
        <div className="flex-row-at-start">
          <div className="remove-task-button disabled"></div>
          <input
            name="name"
            placeholder="Task name"
            className="new-task-title"
            onChange={handleChange}
            value={formData.name}
            required
            ref={inputRef}
            onKeyDown={handleKeyPress}
            data-1p-ignore
          />
        </div>


        <div className="flex-col-at-start">
          <DatePicker
            className="date-picker-new-task"
            selected={formData.date}
            onChange={(date) =>
              setFormData((formData) => ({ ...formData, date: date }))
            }
            minDate={new Date()}
            placeholderText="Set due date..."
            onKeyDown={handleKeyPress}
          />
          <select value={formData.priority} className="select-menu" onChange={(e) => {setFormData((formData) => ({ ...formData, priority: e.target.value }))}}>
            <option value="placeholder" disabled>Priority</option>
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>
        <div>

        </div>
      </div>
      <div className="flex-col-at-end">
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
            <button
              className="button"
              type="submit"
              disabled={formData.name == ""}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TaskSkeleton;

TaskSkeleton.propTypes = {
  addTask: PropTypes.func,
  cancelTask: PropTypes.func,
  inputRefForward: PropTypes.any,
};
