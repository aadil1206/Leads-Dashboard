import React, { useContext } from "react";
import UserContext from "../../context/UserContext/Context";
import { GiHamburgerMenu } from "react-icons/gi";

const Notification = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useContext(UserContext);
  return (
    <div className="flex justify-between h-[78px] items-center bg-white p-4  shadow-sm gap-1">
      <GiHamburgerMenu
        className="sm:hidden flex"
        onClick={() => {
          setIsMobileMenuOpen(true);
        }}
      />
      <div className="flex flex-col">
        <p className="text-[#020817] font-bold text-[21px]">Notfication</p>
        <span className="text-[#64748b] font-normal text-[14px]">
          Manage And Track Your Leads
        </span>
      </div>
    </div>
  );
};

export default Notification;
