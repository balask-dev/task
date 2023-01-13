import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as todo} from "../assets/plus.svg";


const TaskManagerHeader = ({setShow,children}) => {
const tasks_count = useSelector(state => state?.tasks?.filteredTasks?.length)
  return (
    <div className="task-manager__header">
      <p className="task-manager__header-text">
        {" "}
        TASK &nbsp; <span className="task__count">{tasks_count}</span>
      </p>
      <button
        className="task-manager__header-icon"
        onClick={() => setShow(value => !value)}
      >
        <todo />
      </button>
      {children}
    </div>
  );
};

export default TaskManagerHeader;
