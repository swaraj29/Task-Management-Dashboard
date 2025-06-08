import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../redux/tasksSlice';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MobileAppHeader from '../components/TopbarLowerSection'; // Fixed import
import TaskColumn from '../components/TaskColumn';
import AddTaskModal from '../components/AddTaskModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.taskList ?? []);
  const filter = useSelector((state) => state.tasks?.filter ?? { priority: null, dueDate: null });

  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    let matchesPriority = true;
    let matchesDueDate = true;

    // Filter by priority
    if (filter.priority) {
      matchesPriority = task.priority === filter.priority;
    }

    // Filter by due date (Today)
    if (filter.dueDate === "Today") {
      const today = new Date().toISOString().split('T')[0]; // Dynamic today's date
      matchesDueDate = task.dueDate === today;
    }

    return matchesPriority && matchesDueDate;
  });

  // Split filtered tasks into columns
  const todoTasks = filteredTasks?.filter((task) => task?.status === 'todo') ?? [];
  const inProgressTasks = filteredTasks?.filter((task) => task?.status === 'inprogress') ?? [];
  const doneTasks = filteredTasks?.filter((task) => task?.status === 'done') ?? [];

  const handleDrop = (taskId, newStatus) => {
    if (!taskId) {
      console.error('taskId is undefined or empty');
      return;
    }
    const parsedTaskId = parseInt(taskId);
    if (isNaN(parsedTaskId)) {
      console.error('taskId is not a valid number:', taskId);
      return;
    }
    dispatch(updateTaskStatus({ taskId: parsedTaskId, newStatus }));
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="absolute top-[72px] left-0 w-full h-px bg-gray-300 z-0" />
        <div className="p-6 bg-gray-50 h-full overflow-auto bg-white">
          <MobileAppHeader />
          <AddTaskModal />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <TaskColumn title="To Do" tasks={todoTasks} columnId="todo-column" status="todo" onDrop={handleDrop} />
            <TaskColumn title="In Progress" tasks={inProgressTasks} columnId="inprogress-column" status="inprogress" onDrop={handleDrop} />
            <TaskColumn title="Done" tasks={doneTasks} columnId="done-column" status="done" onDrop={handleDrop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;