import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

const AddTaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(""); // Added dueDate state
  const [comments, setComments] = useState(0);
  const [files, setFiles] = useState(0);
  const [avatarInput, setAvatarInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    setFiles(uploadedFiles.length + files.length);
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(uploadedFiles.filter((_, index) => index !== indexToRemove));
    setFiles(uploadedFiles.length - 1);
  };

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;

    const assignees = avatarInput
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url);

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined, // Include dueDate
      comments: parseInt(comments) || 0,
      files: uploadedFiles.length,
      fileNames: uploadedFiles.map(file => file.name),
      assignees
    };

    dispatch(addTask(newTask));
    setUploadedFiles([]);
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("Low");
    setDueDate(""); // Reset dueDate
    setComments(0);
    setFiles(0);
    setAvatarInput("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="bg-white/95 backdrop-blur-sm rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>

        <input
          type="text"
          placeholder="Task title"
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <select
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="date"
          placeholder="Due date (YYYY-MM-DD)"
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Number of comments"
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Number of files"
          className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none"
          value={files}
          onChange={(e) => setFiles(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar image URLs (comma separated)"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none"
          value={avatarInput}
          onChange={(e) => setAvatarInput(e.target.value)}
        />

        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full border-2 border-dashed border-gray-300 p-4 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            Click to upload files
          </button>

          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm text-gray-600 truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;