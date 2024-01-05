import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";

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
    console.log(event);
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
          <button className="remove-task-button" disabled={true}></button>
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

        <div className="flex-row-at-start">
          <DatePicker
            className="date-picker-new-task"
            // showicon
            selected={formData.date}
            onChange={(date) =>
              setFormData((formData) => ({ ...formData, date: date }))
            }
            minDate={subDays(new Date(), 2)}
            placeholderText="Set due date..."
          />
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
            <button className="button" type="submit">
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
