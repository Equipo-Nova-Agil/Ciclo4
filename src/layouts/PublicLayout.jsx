import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../componets/NavBar';
import Footer from '../componets/Footer';

const PublicLayout = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>

      <Navbar/>
        <main className='h-full w-full overflow-auto'>
          <Outlet/>
        </main>
      <Footer/>

    </div>
  );
};

export default PublicLayout;
