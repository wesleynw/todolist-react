import PropTypes from "prop-types";
import TaskDueDate from "./TaskDueDate";

function Task({ removeTask, changeTaskDate, changeTaskName, task }) {
  return (
    <li className="task flex-col-at-start">
      <div className="flex-row-at-start width-100">
        <div
          className="remove-task-button flexbox-row"
          onClick={() => {
            setTimeout(() => {
              removeTask(task.key);
            }, 250);
          }}
        >
          <svg
            className="remove-task-checkbox"
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <input
          className="new-task-title"
          value={task.name}
          onChange={(e) => {
            changeTaskName(task.key, e.target.value);
          }}
        />
      </div>

      <TaskDueDate
        dateStr={task.date}
        changeTaskDate={(
          (key) => (dateStr) =>
            changeTaskDate(key, dateStr)
        )(task.key)}
      />
    </li>
  );
}

export default Task;

Task.propTypes = {
  removeTask: PropTypes.func,
  changeTaskDate: PropTypes.func,
  changeTaskName: PropTypes.func,
  task: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.any,
    priority: PropTypes.string,
  }),
};
