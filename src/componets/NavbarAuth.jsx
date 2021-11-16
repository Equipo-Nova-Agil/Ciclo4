import React from 'react';
import { Link } from 'react-router-dom';
import brand from '../media/logo.png';
import '../styles/styles.css'

const Navbar = () => {
  return (
  
<div className="mt-0 ml-0 mr-2 text-center w-full">  
    <nav class="flex items-center justify-between flex-wrap fondo1  text-white font-bold w-100">
        <div class="flex flex-1 items-center flex-shrink-0 text-white mr-6">
            <img class="fill-current ml-2 w-6 items-center" src={brand} alt="logo" />
            <span class="p-2 m-2 tracking-tight fuente">PROYECTORIO</span>
        </div>
        
        <Link to='/'>
            <a href="#" class="inline-block items-end transform hover:translate-y-1 transition-transform ease-in duration-200 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-mediump-2 m-2  ring-2 ring-gray-400"><i class="fas fa-arrow-left w-6"></i>Regresar</a>
        </Link>
                    
    </nav>
</div>

 
  );
};

export default Navbar;
