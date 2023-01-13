import React from "react";
import { useSelector } from "react-redux";
import Task from "./TaskCard";

const TasksList = ({ setShow }) => {
  const tasks = useSelector((state) => state.tasks.filteredTasks);
return (
    <div className="task__list">
      {tasks &&
        tasks.map((task, id) => (
          <Task
            message={task.task_msg}
            date={task.task_date}
            task_id={task.id}
            setShowModal={setShow}
            key={id}
          />
        ))}
    </div>
  );
};

export default TasksList;
