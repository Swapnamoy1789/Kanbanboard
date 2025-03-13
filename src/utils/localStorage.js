// Utility functions for working with localStorage

// Save tasks to localStorage
export const saveTasksToLocalStorage = (tasks) => {
    try {
      const serializedTasks = JSON.stringify(tasks);
      localStorage.setItem('tasks', serializedTasks);
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  };
  
  // Retrieve tasks from localStorage
  export const getTasksFromLocalStorage = () => {
    try {
      const serializedTasks = localStorage.getItem('tasks');
      if (serializedTasks === null) {
        return []; // Return an empty array if no tasks are found
      }
      return JSON.parse(serializedTasks);
    } catch (error) {
      console.error('Error retrieving tasks from localStorage:', error);
      return [];
    }
  };