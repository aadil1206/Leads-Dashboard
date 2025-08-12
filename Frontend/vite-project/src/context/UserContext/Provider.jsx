import React, { useRef, useState } from 'react';
import UserContext from './Context';

const ChartProvider = ({ children }) => {


const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <UserContext.Provider
      value={{
    isMobileMenuOpen, setIsMobileMenuOpen,
    isSidebarOpen, setIsSidebarOpen,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default ChartProvider;
