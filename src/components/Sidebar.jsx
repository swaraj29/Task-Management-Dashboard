import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { setSelectedProject } from "../redux/tasksSlice"; // Import the action
import HomeIcon from "../assets/Images/Home.svg";
import MessageIcon from "../assets/Images/Message.svg";
import TasksIcon from "../assets/Images/Tasks.svg";
import MembersIcon from "../assets/Images/Members.svg";
import SettingIcon from "../assets/Images/Setting.svg";
import ArrowIcon from "../assets/Images/Arrow.svg";
import ColorFilterIcon from "../assets/Images/Colorfilter.svg";
import UnionIcon from "../assets/Images/union.svg";
import LightIcon from "../assets/Images/Light.svg";

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.tasks.selectedProject); // Get selected project from Redux

  // Handler to update the selected project
  const handleProjectClick = (projectLabel) => {
    dispatch(setSelectedProject(projectLabel));
  };

  return (
    <div className="w-64 h-screen bg-white p-6 flex flex-col justify-between shadow border-r">
      <div>
        {/* Project M Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src={ColorFilterIcon} alt="Project Icon" width={24} height={24} />
            <h1 className="font-bold text-lg text-gray-900">Project M.</h1>
          </div>
          <button className="text-gray-400">
            <img src={ArrowIcon} alt="Collapse" width={24} height={24} className="rotate-180" />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="space-y-4">
          <MenuItem
            icon={<img src={HomeIcon} alt="Home" width={18} height={18} />}
            label="Home"
          />
          <MenuItem
            icon={<img src={MessageIcon} alt="Messages" width={18} height={18} />}
            label="Messages"
          />
          <MenuItem
            icon={<img src={TasksIcon} alt="Tasks" width={18} height={18} />}
            label="Tasks"
          />
          <MenuItem
            icon={<img src={MembersIcon} alt="Members" width={18} height={18} />}
            label="Members"
          />
          <MenuItem
            icon={<img src={SettingIcon} alt="Settings" width={18} height={18} />}
            label="Settings"
          />
        </nav>

        {/* Projects List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
              My Projects
            </h2>
            <button className="text-lg font-medium text-gray-400">+</button>
          </div>

          <div className="space-y-3">
            <ProjectItem
              color="bg-green-500"
              label="Mobile App"
              active={selectedProject === "Mobile App"} // Dynamically set active
              onClick={() => handleProjectClick("Mobile App")} // Dispatch on click
            />
            <ProjectItem
              color="bg-orange-500"
              label="Website Redesign"
              active={selectedProject === "Website Redesign"}
              onClick={() => handleProjectClick("Website Redesign")}
            />
            <ProjectItem
              color="bg-purple-300"
              label="Design System"
              active={selectedProject === "Design System"}
              onClick={() => handleProjectClick("Design System")}
            />
            <ProjectItem
              color="bg-blue-500"
              label="Wireframes"
              active={selectedProject === "Wireframes"}
              onClick={() => handleProjectClick("Wireframes")}
            />
          </div>
        </div>
      </div>

      {/* Thoughts Time */}
      <div className="mt-6 text-center relative w-full">
        <div className="relative">
          <img src={UnionIcon} alt="Background" className="w-full h-auto" />
          <div className="absolute inset-0 p-4">
            <div className="flex justify-center mb-3">
              <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                <img src={LightIcon} alt="Ideas" width={20} height={20} />
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Thoughts Time</h3>
            <p className="text-xs text-gray-500 mt-1">
              We don't have any notice for you, till then you can share your
              thoughts with your peers.
            </p>
            <button className="mt-3 bg-white text-black font-semibold px-4 py-1 rounded border hover:shadow mx-auto block">
              Write a message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-black cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const ProjectItem = ({ color, label, active, onClick }) => (
  <div
    onClick={onClick} // Add click handler
    className={`flex items-center gap-3 text-sm cursor-pointer px-2 py-1 rounded ${
      active ? "bg-indigo-50 font-semibold text-indigo-900" : "text-gray-700"
    }`}
  >
    <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
    <span>{label}</span>
    {active && (
      <span className="ml-auto text-xl text-gray-400">•••</span>
    )}
  </div>
);

export default Sidebar;