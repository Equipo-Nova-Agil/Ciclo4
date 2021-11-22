import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../media/logo.png';


const NavbarAuth = () => {
  return (
  
<div className="fondo1 mt-0 ml-0 mr-2 text-center w-full">  
  
  <nav className="flex items-center justify-between flex-wrap fondo1  text-white font-bold w-100">
        
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <img className="fill-current ml-2 w-6 items-center" src={logo} alt="logo" />
      <span className="text-xl p-2 m-2 tracking-tight">PROYECTORIO</span>
    </div>
        
    <Link to='/'>
      <a href="#" className="inline-block items-end transform hover:translate-y-1 transition-transform ease-in duration-200 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-mediump-2 m-2  ring-2 ring-gray-400"><i className="fas fa-arrow-left w-6"></i>Regresar</a>
    </Link>
                    
  </nav>
  
</div>

 
  );
};

export default NavbarAuth;
