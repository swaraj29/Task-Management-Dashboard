import React from 'react';
import { MessageCircle, Paperclip, MoreHorizontal } from 'lucide-react';

const TaskCard = ({ task, taskId }) => {
  if (!task) return null;

  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-orange-100 text-orange-600"
  };

  const avatars = task.assignees || [];

  const handleDragStart = (e) => {
    console.log('Dragging task with ID:', taskId); // Debug log
    e.dataTransfer.setData('taskId', taskId);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-4 rounded-xl shadow-md relative transition hover:shadow-lg space-y-2 cursor-move"
      style={{ pointerEvents: 'auto' }} // Ensure pointer events are enabled
    >
      {/* Priority Label + Menu */}
      <div className="flex justify-between items-start">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            priorityColor[task.priority] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.priority}
        </span>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {avatars.map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              alt="user"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>

        {/* Comments & Files */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {task.comments} comments
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="w-4 h-4" />
            {task.files} files
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;