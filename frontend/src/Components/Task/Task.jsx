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
    <li className="task flex-row-at-start">
      <button
        className="remove-task-button flexbox-row"
        onClick={() => {
          setTimeout(() => {
            removeTask(task.key);
          }, 250);
        }}
      >
        {/* <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
        <svg
          // className="remove-task-button"
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
      </button>

      <div className="flex-col-at-start">
        <span className="task-name">{task.name}</span>

        {task.date != undefined ? (
          <p className="task-time">{parseTaskDate(task.date)}</p>
        ) : (
          <></>
        )}
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
    date: PropTypes.any,
    priority: PropTypes.string,
  }),
};
