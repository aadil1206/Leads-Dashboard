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
import UserContext from "../context/UserContext/Context";

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
  const location = useLocation();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);
  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "w-[192px]" : "w-[80px]"
        } h-full bg-[#fff] rounded-[12px] overflow-y-auto relative hidden sm:flex`}
      >
        {isSidebarOpen ? (
          <div>
            <div className="flex items-center justify-between p-4 border-b">
              <p className="text-[#020817] font-bold text-[18px]">LeadCRM</p>
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-[16px]
                ${
                  isActive
                    ? "bg-gray-100 text-[#020817] font-medium"
                    : "text-[#3f3f46] hover:bg-gray-50 font-normal"
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
        ) : (
          <div>
            <div className="flex items-center justify-between p-4 border-b">
              <Users size={24} color="#020817" />

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
              : "text-[#3f3f46] hover:bg-gray-50"
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white rounded-r-[12px] overflow-y-auto
  transition-transform duration-300 sm:hidden flex flex-col
  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: "192px" }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <p className="text-[#020817] font-bold text-[18px]">LeadCRM</p>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="sm:hidden text-gray-500 hover:text-gray-700 transition"
          >
            ✖
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-[16px]
          ${
            isActive
              ? "bg-gray-100 text-[#020817] font-medium"
              : "text-[#3f3f46] hover:bg-gray-50 font-normal"
          }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
