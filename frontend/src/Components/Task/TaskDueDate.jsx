import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";

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

  if (now > date && now.getDate() > date.getDate()) {
    return [
      String(date.getUTCMonth() + 1) + "/" + String(date.getUTCDate()),
      "#ee9090",
    ];
  }
  if (date - now < 7 * 24 * 3600 * 1000) {
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

// function parseTaskPriority() {}

function TaskDueDate({ dateStr, changeTaskDate }) {
  const [date, setDate] = useState(new Date(dateStr));

  async function handleTaskDateChange(date) {
    console.log("lol");
    await changeTaskDate(date.toISOString());
    setDate(date);
  }

  if (dateStr == undefined) {
    return <></>;
  } else {
    return (
      <div
        className="task-time-wrapper"
        style={{ backgroundColor: parseTaskDate(date)[1] }}
      >
        <DatePicker
          className="date-picker"
          showicon
          selected={date}
          onChange={(date) => handleTaskDateChange(date)}
          minDate={subDays(new Date(), 2)}
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
