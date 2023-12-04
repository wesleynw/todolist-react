import './task.css';
const Task = (props) => {
    return (
        <>
            <link href='https://fonts.googleapis.com/css?family=Alice' rel='stylesheet'></link>
            <link href='https://fonts.googleapis.com/css?family=Be Vietnam Pro' rel='stylesheet'></link>
            <div className="task-list">
                <div className="task">
                    <input type="checkbox"/>
                    <span className="task-time">{props.time}</span>
                    <span className="task-name">{props.name}</span>
                    <span className={props.priority}></span>
                </div>
            </div>
        </>
    );
};

export default Task