import React from "react";
import { useState } from "react";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Alarm } from "../../assets/alarm.svg";
import { ReactComponent as Tick } from "../../assets/tick.svg";
import { addSelectedTaskId } from "./TaskAction";
import { useDispatch } from "react-redux";


function Task({date,message,task_id,setShow}){
  const dispatch = useDispatch()
  const [showTootlip, setShowTooltip] = useState(false);
  const  [toolTipFor, setTooltipFor] = useState("")


  function handleHover(iconType) {
    setTooltipFor(iconType)
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 400);
  };

  const handleEditTask = () => {
     dispatch(addSelectedTaskId(task_id))
     setShow(true)

  }

  const formatDate = (date) => {
    let arr = date.split('-');
    date = `${arr[2]}/${arr[1]}/${arr[0]}`;
    return date;
  };
  return (
    <div className="task-card">
      
      <div className="task-card__desc">
        <p className="task-card__desc-text">{message}</p>
        <p className="task-card__date">{formatDate(date)}</p>
      </div>
      <div className="flex">

      <div className="task-card-icon__wrapper task-card-icon__wrapper-optional " onClick={handleEditTask}>
        {showTootlip && toolTipFor == "edit" && <p className="task-card__tooltip">Edit this task</p>}
        <span className="task-card__icon" onMouseOver={() => handleHover("edit")}>
          <Edit />
        </span>
      </div>
      <div className="task-card-icon__wrapper">
        {showTootlip && toolTipFor == "snooze" && <p className="task-card__tooltip">Snooze alarm</p>}
        <span className="task-card__icon" onMouseOver={() => handleHover("snooze")}>
          <Alarm />
        </span>
      </div>
      <div className="task-card-icon__wrapper">
        {showTootlip && toolTipFor == "done" && <p className="task-card__tooltip">Complete task.</p>}
        <span className="task-card__icon" onMouseOver={() => handleHover("done")}>
          <Tick />
        </span>
      </div>
      </div>
    </div>
  );
};

export default Task;
