import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../componets/Sidebar';
// import PrivateRoute from 'componets/PrivateRoute';

const PrivateLayout = () => {
  return (
    // <PrivateRoute>

      <div className='flex w-screen h-screen'>
        <div className='flex flex-nowrap h-full w-full'>

          <Sidebar />

          <main className='bg-white flex w-full  overflow-auto items-center justify-center pr-0 '>
            <Outlet/>
          </main>

        </div>
      </div>

    // </PrivateRoute> 
  );
};

export default PrivateLayout;
