import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";

const TaskColumn = ({ title, tasks = [], columnId, status, onDrop }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusMap = {
    "To Do": "todo",
    "In Progress": "inprogress",
    "Done": "done",
  };

  const dotColor = {
    "To Do": "purple",
    "In Progress": "yellow",
    "Done": "green",
  }[title] || "gray";

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log('Dragging over column:', title); // Debug log
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    console.log('Dropped task with ID:', taskId, 'into status:', status); // Debug log
    if (taskId) {
      onDrop(taskId, status);
    } else {
      console.error('No taskId found in dataTransfer');
    }
  };

  return (
    <div className="bg-[#f5f5f7] p-4 rounded-xl shadow-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full bg-${dotColor}-600`}></span>
          <h2 className="font-semibold text-md text-[#1a1a1a]">{title}</h2>
          <span className="text-xs text-white bg-[#d1d1d1] px-2 rounded-full">
            {tasks.length}
          </span>
        </div>

        {title === "To Do" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#e0e7ff] hover:bg-[#c7d2fe] transition-colors text-[#4f46e5] p-1 rounded-lg"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Underline */}
      <div className="w-full h-[2px] bg-[#4f46e5] rounded mb-4" />

      {/* Task Cards */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="space-y-3 min-h-[100px]"
        style={{ pointerEvents: 'auto' }} // Ensure pointer events are enabled
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} taskId={task.id.toString()} />
        ))}
      </div>

      {/* Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={statusMap[title]}
      />
    </div>
  );
};

export default TaskColumn;