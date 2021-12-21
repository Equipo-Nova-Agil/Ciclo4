import React from 'react';
import Logo from '../media/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from '../componets/PrivateComponent';
import { nanoid } from "nanoid";

const Sidebar = () => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.setItem('token', null);
    navigate('/');
    };
    
  
  return (
    <div className="min-h-screen flex flex-row fondo1  text-gray-300">
      <div className="flex flex-col w-64 overflow-hidden">
        <div className="flex flex-col items-center justify-center h-20 ">
          <div ><img className="px-2 pt-40 mt-40 " src={Logo} alt="logo" width="100" /></div>
          
          <h1 className="fuente text-xl uppercase text-white text-bold shadow-md mb-40 ">PROYECTORIO</h1>
        </div>
        <ul className="flex flex-col py-10 mt-40 items-center content-center">
          <li key="1a{nanoid()}">
            <Link to='/admin' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user"></i></span>
                <span className="text-sm font-medium">Perfil</span>
            </Link> 
          </li>
          <li  key="2a{nanoid()}">
            <PrivateComponent roleList={['ADMINISTRADOR','LIDER']}>
              <Link to='/admin/Usuarios' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-users"></i></span>
                  <span className="text-sm font-medium">Usuarios</span>
              </Link>
              </PrivateComponent>
          </li>
          <li key="3a{nanoid()}">
          {/* <PrivateComponent roleList={['ADMINISTRADOR','LIDER','ESTUDIANTE']}>   */}
            <Link to='/admin/Proyectos' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-book"></i></span>
                  <span className="text-sm font-medium">Proyectos</span>
            </Link>
          {/* </PrivateComponent>     */}
          </li>
          <li key="4a{nanoid()}">
            {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}> */} 
              <Link to='/admin/Inscripciones' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user-plus"></i></span>
                  <span className="text-sm font-medium">Inscripciones</span>
              </Link>
              {/* </PrivateComponent> */}
          </li> 
          <li key="{5ananoid()}">
            {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}> */} 
              <Link to='/admin/Avances' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-tasks"></i></span>
                  <span className="text-sm font-medium">Avances</span>
              </Link>
              {/* </PrivateComponent> */}
          </li> 
          
          <li key="6a{nanoid()}">
            <Link to='/' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-red-500 mt-10">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="bx bx-log-out"></i></span>
                <span className="text-sm font-medium" onClick={() => cerrarSesion()}>Cerrar Sesión</span>
            </Link>
          </li>
            
        </ul>
      </div>
    </div>
      
  );
};

export default Sidebar;
