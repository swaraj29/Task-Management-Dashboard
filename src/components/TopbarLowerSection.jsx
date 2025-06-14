import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Add useDispatch
import { Filter, Calendar, Share2, Plus } from "lucide-react";
import { setFilter, clearFilter } from "../redux/tasksSlice"; // Import actions
import LinkIcon from "../assets/Images/Link.svg";
import ArrowSquareIcon from "../assets/Images/ArrowSquare.svg";
import HamburgerIcon from "../assets/Images/Hamburger.svg";
import GridIcon from "../assets/Images/Grid.svg";

const MobileAppHeader = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const selectedProject = useSelector((state) => state.tasks.selectedProject);

  // Filter handling functions
  const handlePriorityFilter = (priority) => {
    dispatch(setFilter({ priority }));
    setIsFilterOpen(false);
  };

  const handleDateFilter = (date) => {
    dispatch(setFilter({ dueDate: date }));
    setIsDateOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "Board" ? "List" : "Board");
  };

  return (
    <div className="bg-white w-full">
      {/* Main Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Left Side - Title and Icons */}
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto mb-3 md:mb-0">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">{selectedProject}</h1>
          <div className="hidden md:flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src={ArrowSquareIcon} alt="External Link" className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <img src={LinkIcon} alt="Link" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side - User Avatars and Invite */}
        <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-3">
          {/* Plus Icon in Rounded Square - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
              <Plus size={14} className="text-purple-600" />
            </div>
            <span className="text-sm text-purple-600 font-medium">Invite</span>
          </div>

          {/* User Avatars - Limit on mobile */}
          <div className="flex items-center -space-x-2">
            <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              J
            </div>
            <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              A
            </div>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-blue-500 border-2 border-white items-center justify-center text-xs font-medium text-white">
              M
            </div>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-purple-500 border-2 border-white items-center justify-center text-xs font-medium text-white">
              S
            </div>
            <div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center text-xs font-medium text-white">
              +4
            </div>
          </div>
        </div>
      </div>

      {/* Lower Action Bar */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-6 py-3 md:py-4 border-t border-gray-100 gap-3 md:gap-0">
        <div className="flex items-center gap-2 order-1 md:order-none w-full md:w-auto">
          {/* Priority Filter Button */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-700 border border-gray-300 px-2 md:px-3 py-2 rounded-md hover:bg-gray-50 font-medium ${filter.priority ? 'bg-indigo-50 border-indigo-200' : ''}`}
            >
              <Filter size={14} className="shrink-0" />
              <span>{filter.priority || 'Filter'}</span>
            </button>

            {/* Priority Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <button onClick={() => handlePriorityFilter('Low')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Low</button>
                  <button onClick={() => handlePriorityFilter('Medium')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Medium</button>
                  <button onClick={() => handlePriorityFilter('High')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">High</button>
                  <button onClick={() => dispatch(clearFilter())} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Clear Filter</button>
                </div>
              </div>
            )}
          </div>

          {/* Date Filter Button */}
          <div className="relative">
            <button 
              onClick={() => setIsDateOpen(!isDateOpen)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-700 border border-gray-300 px-2 md:px-3 py-2 rounded-md hover:bg-gray-50 font-medium ${filter.dueDate ? 'bg-indigo-50 border-indigo-200' : ''}`}
            >
              <Calendar size={14} className="shrink-0" />
              <span>{filter.dueDate || 'Today'}</span>
            </button>

            {/* Date Filter Dropdown */}
            {isDateOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <button onClick={() => handleDateFilter('Today')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Today</button>
                  <button onClick={() => dispatch(clearFilter())} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Clear Filter</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Other Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3 order-2 md:order-none">
          <button className="hidden md:flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 bg-white">
            <Share2 size={16} className="text-gray-500" />
            <span>Share</span>
          </button>

          <button className="bg-indigo-600 text-white px-2 md:px-3 py-2 md:py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center w-8 md:w-10 h-8 md:h-10">
            <img src={HamburgerIcon} alt="Menu" className="w-3 md:w-4 h-3 md:h-4" />
          </button>

          <button className="text-gray-400 hover:text-gray-600 px-2 py-2 flex items-center justify-center">
            <img src={GridIcon} alt="More options" className="w-4 md:w-5 h-4 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAppHeader;