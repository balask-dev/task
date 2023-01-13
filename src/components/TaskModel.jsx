import { ReactComponent as Dropdown } from "../assets/dropdown.svg";
import { ReactComponent as DateIcon } from "../assets/date.svg";
import { ReactComponent as Time } from "../assets/time.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import { USERS } from "../constants/constants";
import {useDeleteTaskMutation,usePostTasksMutation,useUpdateTaskMutation} from "../server/server";
import { removeSelectedTaskId } from "../features/task/TasksSlice";

 

function convertSecondsToHoursMinutes(time_in_seconds) {
  const hour = Math.floor(time_in_seconds / 3600);
  const remaining_seconds = time_in_seconds % 3600;
  const minute = Math.floor(remaining_seconds / 60);

  return `${formatHourMinute(hour)}:${formatHourMinute(minute)}`;
}

const TaskManagerModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [save] = usePostTasksMutation();
  const [remove] = useDeleteTaskMutation();
  const [update] = useUpdateTaskMutation();

  const [selectedTaskId, selectedTask] = useSelector((state) => [
    state.tasks.selectedTaskId,
    state.tasks.tasks.find((task) => task.id === state.tasks.selectedTaskId),
  ]);

  const [description, setDescription] = useState(selectedTask?.task_msg || "");

  const [date, setDate] = useState(selectedTask?.task_date || '');

  const [time, setTime] = useState(
    convertSecondsToHoursMinutes(selectedTask?.task_time || '')
  );
  const [assignedUser, setAssignedUser] = useState(
    selectedTask?.assigned_user || ""
  );

  const handleDelete = async () => {
    try {
      const res = await remove(selectedTaskId);
    } catch (e) {
      console.log(e);
    }
    dispatch(removeSelectedTaskId());
    setShowModal(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
     if (name == "description") setDescription(value);
    if (name == "date") setDate(value);
    if (name == "time") setTime(value);

    if (name == "user") setAssignedUser(value);
  };

  const handleSave = async () => {
    let time_zone = new Date().getTimezoneOffset() * 60;

    const [h, m] = time.split(":");
    let value_in_seconds = parseInt(h) * 3600 + parseInt(m) * 60;
    const payload = {
      assigned_user: assignedUser,
      task_date: date,
      task_time: value_in_seconds,
      is_completed: 0,
      task_msg: description,
      time_zone: Math.abs(time_zone),
    };
    try {
      if (!selectedTaskId) {
        const add = await save(payload).unwrap();

      } else {
        const add = await update({ task_id: selectedTaskId, patch: payload })
          .unwrap;

      }
    } catch (e) {
      console.log(e);
    }
    setShow(false);
  };

  const handleClose = () => {
    if (selectedTaskId) {
      dispatch(removeSelectedTaskId());
    }
    setShow(false);
  };

  return (
    <div className="task-manager__modal">
      <div>
        <label htmlFor="description" className="label">
          Task Description
        </label>

        <div className="task-input__container">
          <input
            type="text"
            className="task-input"
            name="description"
            value={description}
            onChange={(e) => handleInput(e)}
          />
          <span className="task-input__icon"></span>
        </div>
      </div>

       <section className="date-time__container">
         <div className="">
          <label htmlFor="date" className="label">
            Date
          </label>

          <div className="task-input__container">
            <span className="task-input__icon">
              <DateIcon />
            </span>
            <input
              type="date"
              className="task-input"
              name="date"
              value={date}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>

         <div>
          <label htmlFor="time" className="label">
            Time
          </label>

          <div className="task-input__container">
            <span className="task-input__icon">
              <Time />
            </span>
            <input
              type="time"
              className="task-input"
              name="time"
              value={time}
              onChange={(e) => handleInput(e)}
            />
          </div>
        </div>
      </section>

       <div>
        <label htmlFor="user" className="label">
          Assign  
        </label>

        <div className="task-input__container">
          <select
            id="user"
            name="user"
            className="task-input task-input--select"
            onChange={(e) => handleInput(e)}
            value={assignedUser}
          >
            <option value="">Assign</option>
            {USERS.map((user) => (
              <option value={user.user_id}>{user.name}</option>
            ))}
          </select>
          <div
            className="task-input-dropdown__container"
           >
            <Dropdown />
          </div>
        </div>
      </div>

 cd      <div className="task-btn__wrapper">
        <span className="delete-icon__wrapper" onClick={handleDelete}>
          {selectedTask && <Delete />}
        </span>

        <div className="btn__container">
          <button className="btn btn--cancel" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn--save"
            disabled={disableSave}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerModal;
