import React, { useState } from "react";
import SearchIcon from "../assets/Images/Search.svg";
import CalendarIcon from "../assets/Images/Calendar.svg";
import Message1Icon from "../assets/Images/Message1.svg";
import NotificationIcon from "../assets/Images/Notification.svg";
import ArrowIcon from "../assets/Images/Arrowdown.svg";

const Topbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              className="bg-gray-100 pl-10 pr-4 py-2 rounded-md w-full text-sm placeholder:text-gray-400 focus:outline-none"
              autoFocus
            />
            <img
              src={SearchIcon}
              alt="Search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setIsSearchOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Topbar Content */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Search - Hidden on mobile, shown as icon */}
        <div className="hidden md:block md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="bg-gray-100 pl-10 pr-4 py-2 rounded-md w-full text-sm placeholder:text-gray-400 focus:outline-none"
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          />
        </div>

        {/* Mobile Search Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsSearchOpen(true)}
        >
          <img
            src={SearchIcon}
            alt="Search"
            className="w-5 h-5 text-gray-500"
          />
        </button>

        {/* Right Side Icons + Profile */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Icons - Hidden on smaller screens */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <img
              src={CalendarIcon}
              alt="Calendar"
              className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-500"
            />
            <img
              src={Message1Icon}
              alt="Messages"
              className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-500"
            />
            <div className="relative">
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-500"
              />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-sm text-right">
              <p className="font-medium text-gray-900">Palak Jain</p>
              <p className="text-xs text-gray-500">Rajasthan, India</p>
            </div>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Palak Jain"
              className="w-8 h-8 rounded-full object-cover"
            />
            <img
              src={ArrowIcon}
              alt="Expand"
              className="w-4 h-4 md:w-[18px] md:h-[18px] text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
