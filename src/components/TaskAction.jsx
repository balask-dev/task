import { create } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  selectedTaskId: null,
  filteredTasks: []

};

const taskAction = create({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
         state.tasks.push(...action.payload);
       },


       
    },
    setFilteredTasks(state,action){
      state.filteredTasks  = action.payload
    },
    taskCompleted(state, action) {
      const { id, done } = action.payload;

      const completed_todo = state.find((todo) => todo.id == id);
       completed_todo.done = !completed_todo.done;
      state.sort((a, b) => a.done - b.done);
     },
    taskUpdated(state, action) {
      const { id, content } = action.payload;
      const todo_to_edit = state.find((todo) => todo.id == id);
      if (todo_to_edit) {
        todo_to_edit.content = content;
      }
    },
    taskDeleted(state, action) {
      const { id } = action.payload;
      state = state.filter((todo) => todo.id != id);
      return state;
    },
    addSelectedTaskId(state, action) {
      state.selectedTaskId = action.payload;
    },
    removeSelectedTaskId(state, action) {
      state.selectedTaskId = null;
    },
  },
});

export const { addTask,todoCompleted,taskUpdated,taskDeleted,addSelectedTaskId,removeSelectedTaskId,setFilteredTasks} = taskAction.actions;
export default taskAction.reducer;
  // task: [
  //   {
  //     assigned : "user1",
  //     taskDate: "13-01-2023",
   //     taskMsg: "api",
  //   }
  //  ],