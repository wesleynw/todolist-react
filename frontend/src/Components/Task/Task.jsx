import PropTypes from "prop-types";

function parseTaskDate(dateStr) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let result = "";

  const date = new Date(dateStr);
  const now = new Date();
  if (date - now < 7 * 24 * 3600 * 1000) {
    result += weekday[date.getDay()] + "  ";
  }
  return (
    result + String(date.getUTCMonth() + 1) + "/" + String(date.getUTCDate())
  );
}

function Task({ removeTask, task }) {
  return (
    <li className="task">
      <div className="flexbox-row">
        <span className="task-name">{task.name}</span>
      </div>
      <div className="flexbox-row">
        <span className="task-time">{parseTaskDate(task.date)}</span>
        <button
          className="task-button"
          onClick={() => {
            setTimeout(() => {
              removeTask(task.key);
            }, 250);
          }}
        >
          <svg viewBox="0 0 512 512">
            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Task;

Task.propTypes = {
  removeTask: PropTypes.func,
  task: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    priority: PropTypes.string,
  }),
};
