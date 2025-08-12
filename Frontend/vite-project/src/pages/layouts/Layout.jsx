import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import UserContext from "../../context/UserContext/Context";

const Layout = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);
  return (
    <div className="flex w-full h-full ">
      <Sidebar />

      {/* <Header /> */}
      <div
        className={` h-auto ${
          isSidebarOpen ? "sm:w-[calc(100%-192px)] w-full" : "sm:w-[calc(100%-80px)] w-full"
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
