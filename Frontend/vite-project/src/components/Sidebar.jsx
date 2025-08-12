import { useContext, useEffect, useRef, useState } from "react";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Calendar,
  Activity,
  Package,
  Bell,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <LayoutGrid size={20} /> },
  { name: "Leads", path: "/leads", icon: <Users size={20} /> },
  { name: "Follow-Ups", path: "/follow-ups", icon: <Calendar size={20} /> },
  {
    name: "Sales Activity",
    path: "/sales-activity",
    icon: <Activity size={20} />,
  },
  { name: "Products", path: "/products", icon: <Package size={20} /> },
  { name: "Notifications", path: "/notifications", icon: <Bell size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`${
        isSidebarOpen ? "w-[180px]" : "w-[80px]"
      } h-full bg-[#fff] rounded-[12px] overflow-y-auto relative`}
    >
      {isSidebarOpen ? (
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <p>LeadCRM</p>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              {isSidebarOpen ? (
                <RiArrowDropLeftLine />
              ) : (
                <RiArrowDropRightLine />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
                ${
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) :
      
       (
        <div>

              <div className="flex items-center justify-between p-4 border-b">
           

<Users size={24} color="#2563eb" />

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              {isSidebarOpen ? (
                <RiArrowDropLeftLine />
              ) : (
                <RiArrowDropRightLine />
              )}
            </button>
          </div>

              <div className="flex items-center justify-between p-4 border-b">
         <nav className="space-y-2">
  {menuItems.map((item) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        data-tooltip-id={`tooltip-${item.name}`}
        data-tooltip-content={item.name}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
          ${
            isActive
              ? "bg-gray-100 text-black font-medium"
              : "text-gray-700 hover:bg-gray-50"
          }`}
      >
        {item.icon}
        <Tooltip id={`tooltip-${item.name}`} place="right" />
      </Link>
    );
  })}
</nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
