import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [
    {
      id: 1,
      title: "Brainstorming",
      description: "Brainstorming brings team members' diverse experience into play.",
      status: "todo",
      priority: "Low", // Make sure these match the filter options exactly
      dueDate: "2025-06-08",
      comments: 12,
      files: 0,
      assignees: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/45.jpg",
        "https://randomuser.me/api/portraits/men/54.jpg"
      ]
    },
    {
      id: 2,
      title: "Research",
      description: "User research helps you to create an optimal product for users.",
      status: "inprogress",
      priority: "High",
      dueDate: "2025-06-09", // Added dueDate
      comments: 10,
      files: 3,
      assignees: [
        "https://randomuser.me/api/portraits/women/65.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg"
      ]
    },
    {
      id: 3,
      title: "Wireframes",
      description: "Low fidelity wireframes include the most basic content and visuals.",
      status: "done",
      priority: "High",
      dueDate: "2025-06-08", // Added dueDate
      comments: 8,
      files: 1,
      assignees: [
        "https://randomuser.me/api/portraits/men/34.jpg"
      ]
    }
  ],
  selectedProject: "Mobile App",
  filter: { // Added filter state
    priority: null,
    dueDate: null
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      console.log('Updating task status - taskId:', taskId, 'newStatus:', newStatus);
      const task = state.taskList.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus;
        console.log('Task updated:', task);
      } else {
        console.error('Task not found with ID:', taskId);
      }
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = { priority: null, dueDate: null };
    }
  }
});

export const { addTask, setSelectedProject, updateTaskStatus, setFilter, clearFilter } = tasksSlice.actions;
export default tasksSlice.reducer;