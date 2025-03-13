import { createSlice } from "@reduxjs/toolkit";
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from "../utils/localStorage";

// Load tasks from localStorage on initial state
const initialState = {
  tasks: getTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },

    moveTask: (state, action) => {
      const { id, stage } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return;
      state.tasks[taskIndex].stage = stage;
      saveTasksToLocalStorage(state.tasks);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },

    updateTask: (state, action) => {
      const { id, title, description, priority, tags } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, title, description, priority, tags }
          : task
      );
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, moveTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
