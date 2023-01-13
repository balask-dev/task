import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./components/Task";
import TaskManage from "./components/TaskManage";
import { useGetTasksQuery } from "./app/api";
import { addTask, setFilteredTasks } from "./features/task/TasksSlice";
import TasksList from "./features/task/TasksList";
import "./App.css";
function App() {
  const [show, setshow] = useState(false);
  const { data } = useGetTasksQuery();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addTask(data?.results));
      dispatch(
        setFilteredTasks(
          data?.results.filter((task, index, array) => {
            return array.indexOf(task) == index;
          })
        )
      );
    }
  }, [data]);

  useEffect(() => {
    dispatch(
      setFilteredTasks(
        data?.results.filter((task, index, array) => {
          return array.indexOf(task) == index;
        })
      )
    );
  }, [tasks])

  return (
    <div className="App">
      <aside className="sidebar"></aside>
      <div className="main">
        <header className="header"></header>
        <main>
          <div className="task-manager__container relative">
            <Task setshow={setshow}>
              {show && <TaskManage setshow={setshow} />}
            </Task>
            <TasksList setshow={setshow} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
