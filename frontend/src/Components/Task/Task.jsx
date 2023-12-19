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
        className="remove-task-button"
        onClick={() => {
          setTimeout(() => {
            removeTask(task.key);
          }, 250);
        }}
      />

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
