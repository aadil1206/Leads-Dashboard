import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';


const Layout = () => {
 

  return (
    <div className="flex w-full h-full ">
      <Sidebar />
   
        {/* <Header /> */}
        <div className="flex-1 h-auto ">
          <Outlet />
        </div>
  
    </div>
  );
};

export default Layout;
