import React, { useRef, useState } from "react";
import UserContext from "./Context";

const ChartProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [statusShow, setStatusShow] = useState([]);

  return (
    <UserContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        statusShow,
        setStatusShow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ChartProvider;
