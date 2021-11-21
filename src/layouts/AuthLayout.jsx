import React from 'react';
import { Outlet } from 'react-router';
import NavAuth from '../componets/NavbarAuth';
import Footer from '../componets/Footer';

const AuthLayout = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      
      <NavAuth />
        <main className='h-full w-full overflow-auto bg-black'>
          <Outlet/>
        </main>
      <Footer/>

    </div>
  );
};

export default AuthLayout;
