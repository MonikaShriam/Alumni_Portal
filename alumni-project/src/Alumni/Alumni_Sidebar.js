import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Person, Event, Work, Group, Forum, People, Newspaper, VolunteerActivism, Settings, Logout
} from "@mui/icons-material";

const Alumni_Sidebar = ({ userData = { name: "Alumni User" } }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menu = [
    { label: "My Profile", path: "/alumni_profile", icon: <Person /> },
    { label: "Events", path: "/alumni_events", icon: <Event /> },
    { label: "Job Board", path: "/alumni_jobs", icon: <Work /> },
    { label: "Mentorship", path: "/alumni_mentorship", icon: <Group /> },
    { label: "Forum", path: "/alumni_forum", icon: <Forum /> },
    { label: "Networking", path: "/alumni_networking", icon: <People /> },
    { label: "News", path: "/alumni_news", icon: <Newspaper /> },
    { label: "Donations", path: "/alumni_donations", icon: <VolunteerActivism /> },
    { label: "Settings", path: "/alumni_settings", icon: <Settings /> },
    { label: "Logout", path: "/", icon: <Logout /> },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow hover:bg-gray-200"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-500 to-cyan-500 text-white transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 mt-12">
          <h2 className="text-center font-semibold mb-6">{userData.name}</h2>
          <ul className="space-y-3">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Alumni_Sidebar;
