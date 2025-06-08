import React from "react";
import SearchIcon from "../assets/Images/Search.svg";
import CalendarIcon from "../assets/Images/Calendar.svg";
import Message1Icon from "../assets/Images/Message1.svg";
import NotificationIcon from "../assets/Images/Notification.svg";
import ArrowIcon from "../assets/Images/Arrowdown.svg";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Search */}
      <div className="w-1/3 relative">
        <input
          type="text"
          placeholder="Search for anything..."
          className="bg-gray-100 pl-10 pr-4 py-2 rounded-md w-full text-sm placeholder:text-gray-400 focus:outline-none"
        />
        <img
          src={SearchIcon}
          alt="Search"
          width={18}
          height={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Right Side Icons + Profile */}
      <div className="flex items-center gap-6">
        <img
          src={CalendarIcon}
          alt="Calendar"
          width={18}
          height={18}
          className="text-gray-500"
        />
        <img
          src={Message1Icon}
          alt="Messages"
          width={18}
          height={18}
          className="text-gray-500"
        />
        <div className="relative">
          <img
            src={NotificationIcon}
            alt="Notifications"
            width={18}
            height={18}
            className="text-gray-500"
          />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-2">
          <div className="text-sm text-right">
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
            width={18}
            height={18}
            className="text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
