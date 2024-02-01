import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function parseTaskDate(date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const now = new Date();
  console.log(date);
  console.log(now);


  console.log(date.getDate())
  console.log(now.getDate())

  console.log("start")
  console.log(date.getFullYear() <= now.getFullYear())
  console.log(1)
  console.log(date.getMonth() <= now.getMonth())
  console.log(1)
  console.log(date.getDate() < now.getDate())

  if (date.getFullYear() < now.getFullYear() || date.getMonth() < now.getMonth() || date.getDate() < now.getDate()) {
    return [
      String(date.getUTCMonth() + 1) + "/" + String(date.getUTCDate()),
      "#ee9090",
    ];
  }
  if (Math.abs(date - now) < 7 * 24 * 3600 * 1000) {
    if (date.getDay() == now.getDay()) {
      return ["Today", "#90ee90"];
    } else if (date.getDate() == now.getDate() + 1) {
      return ["Tomorrow", "#9090ee"];
    }
    return [weekday[date.getDay()], "#bf90ee"];
  }
  return [
    String(date.getUTCMonth() + 1) + "/" + String(date.getUTCDate()),
    "transparent",
  ];
}

function TaskDueDate({ dateStr, changeTaskDate }) {
  const [date, setDate] = useState(new Date(dateStr));

  async function handleTaskDateChange(date) {
    await changeTaskDate(date.toISOString());
    setDate(date);
  }

  if (isNaN(date)) {
    return (
      <div className="task-time-add-wrapper">
        <DatePicker
          className="date-picker"
          onChange={(date) => handleTaskDateChange(date)}
          minDate={new Date()}
          placeholderText="Set due date..."
          customInput={
            <div className="add-due-date-button">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="add-due-date-svg"
              >
                <path
                  d="M17 11C14.2386 11 12 13.2386 12 16C12 18.7614 14.2386 21 17 21C19.7614 21 22 18.7614 22 16C22 13.2386 19.7614 11 17 11ZM17 11V9M2 9V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H13M2 9V8.2C2 7.0799 2 6.51984 2.21799 6.09202C2.40973 5.71569 2.71569 5.40973 3.09202 5.21799C3.51984 5 4.0799 5 5.2 5H13.8C14.9201 5 15.4802 5 15.908 5.21799C16.2843 5.40973 16.5903 5.71569 16.782 6.09202C17 6.51984 17 7.0799 17 8.2V9M2 9H17M5 3V5M14 3V5M15 16H17M17 16H19M17 16V14M17 16V18"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
        />
      </div>
    );
  } else {
    return (
      <div
        className={
          "task-time-wrapper " +
          (parseTaskDate(date)[1] == "transparent"
            ? "task-time-black-border"
            : "")
        }
        style={{
          backgroundColor: parseTaskDate(date)[1],
        }}
      >
        <DatePicker
          className="date-picker"
          selected={date}
          onChange={(date) => handleTaskDateChange(date)}
          minDate={new Date()}
          placeholderText="Set due date..."
          customInput={<p className="task-time">{parseTaskDate(date)[0]}</p>}
        />
      </div>
    );
  }
}

export default TaskDueDate;

TaskDueDate.propTypes = {
  dateStr: PropTypes.string,
  changeTaskDate: PropTypes.func,
};
