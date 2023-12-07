import PropTypes from "prop-types";

function Task({ removeTask, task }) {
  return (
    <li className="task">
      <div>
        <input
          type="checkbox"
          onChange={() => {
            setTimeout(() => {
              removeTask(task.key);
            }, 250);
          }}
        />
        <span className="task-name">{task.name}</span>
      </div>
      <div>
        <span className="task-time">{task.date}</span>
        <span className={task.priority}></span>
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
