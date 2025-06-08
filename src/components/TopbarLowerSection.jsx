import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, Calendar, Share2, Plus } from "lucide-react";
import { setFilter, clearFilter } from "../redux/tasksSlice";
import LinkIcon from "../assets/Images/Link.svg";
import ArrowSquareIcon from "../assets/Images/ArrowSquare.svg";
import HamburgerIcon from "../assets/Images/Hamburger.svg";
import GridIcon from "../assets/Images/Grid.svg";

const MobileAppHeader = () => {
  const [viewMode, setViewMode] = useState("Board");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDueDateFilterActive, setIsDueDateFilterActive] = useState(false);
  const selectedProject = useSelector((state) => state.tasks.selectedProject);
  const currentFilter = useSelector((state) => state.tasks?.filter ?? { priority: null, dueDate: null });
  const dispatch = useDispatch();

  const toggleViewMode = () => {
    setViewMode(viewMode === "Board" ? "List" : "Board");
  };

  const handlePriorityFilter = (priority) => {
    dispatch(setFilter({ ...currentFilter, priority }));
    setIsFilterOpen(false);
  };

  const handleDueDateFilter = () => {
    const newDueDate = isDueDateFilterActive ? null : "Today";
    setIsDueDateFilterActive(!isDueDateFilterActive);
    dispatch(setFilter({ ...currentFilter, dueDate: newDueDate }));
  };

  const handleClearFilter = () => {
    setIsDueDateFilterActive(false);
    dispatch(clearFilter());
  };

  return (
    <div className="bg-white w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{selectedProject}</h1>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src={ArrowSquareIcon} alt="External Link" className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src={LinkIcon} alt="Link" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
              <Plus size={14} className="text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">Invite</span>
          </div>

          <div className="flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              J
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              A
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              M
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              S
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              +2
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 font-medium"
          >
            <Filter size={16} />
            <span>Filter{currentFilter.priority ? `: ${currentFilter.priority}` : ""}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {isFilterOpen && (
            <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-2">
                <h4 className="text-sm font-medium text-gray-700">Filter by Priority</h4>
                <button
                  onClick={() => handlePriorityFilter("High")}
                  className={`block w-full text-left px-2 py-1 text-sm ${currentFilter.priority === "High" ? "bg-gray-100" : "hover:bg-gray-100"}`}
                >
                  High
                </button>
                <button
                  onClick={() => handlePriorityFilter("Medium")}
                  className={`block w-full text-left px-2 py-1 text-sm ${currentFilter.priority === "Medium" ? "bg-gray-100" : "hover:bg-gray-100"}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handlePriorityFilter("Low")}
                  className={`block w-full text-left px-2 py-1 text-sm ${currentFilter.priority === "Low" ? "bg-gray-100" : "hover:bg-gray-100"}`}
                >
                  Low
                </button>
                <button
                  onClick={handleClearFilter}
                  className="block w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-gray-100"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleDueDateFilter}
            className={`flex items-center gap-2 text-sm border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 font-medium ${
              isDueDateFilterActive ? "bg-blue-100 text-blue-700" : "text-gray-700"
            }`}
          >
            <Calendar size={16} />
            <span>Today</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 bg-white">
            <Share2 size={16} className="text-gray-500" />
            <span>Share</span>
          </button>

          <button className="bg-indigo-600 text-white px-3 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center w-10 h-10">
            <img src={HamburgerIcon} alt="Menu" className="w-4 h-4" />
          </button>

          <button className="text-gray-400 hover:text-gray-600 px-2 py-2 flex items-center justify-center">
            <img src={GridIcon} alt="More options" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAppHeader;