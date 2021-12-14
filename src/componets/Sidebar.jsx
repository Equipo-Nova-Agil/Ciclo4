import React from 'react';
import Logo from '../media/logo.png';
import { Link} from 'react-router-dom';
// import PrivateComponent from 'components/PrivateComponent';

const Sidebar = () => {
  
  return (
    <div className="min-h-screen flex flex-row fondo1  text-gray-300">
      <div className="flex flex-col w-64 overflow-hidden">
        <div className="flex flex-col items-center justify-center h-20 ">
          <div ><img className="px-2 pt-40 mt-40 " src={Logo} alt="logo" width="100" /></div>
          
          <h1 className="fuente text-xl uppercase text-white text-bold shadow-md mb-40 ">PROYECTORIO</h1>
        </div>
        <ul className="flex flex-col py-10 mt-40 items-center content-center">
          <li>
            <Link to='/admin'>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user"></i></span>
                <span className="text-sm font-medium">Perfil</span>
              </a>
            </Link> 
          </li>
          <li>
            {/* <PrivateComponent roleList={['Administrador']}> */}
              <Link to='/admin/Usuarios' >
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-users"></i></span>
                  <span className="text-sm font-medium">Usuarios</span>
                </a>
              </Link>
              {/* </PrivateComponent>   */}
          </li>
          <li>
          {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}>   */}
            <Link to='/admin/Proyectos'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-book"></i></span>
                  <span className="text-sm font-medium">Proyectos</span>
                </a>
            </Link>
          {/* </PrivateComponent>     */}
          </li>
          <li>
            {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}> */} 
              <Link to='/admin/Inscripciones'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-user-plus"></i></span>
                  <span className="text-sm font-medium">Inscripciones</span>
                </a>
              </Link>
              {/* </PrivateComponent> */}
          </li> 
          <li>
            {/* <PrivateComponent roleList={['Administrador','Lider','Estudiante']}> */} 
              <Link to='/admin/Avances'>
                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-500">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="fas fa-tasks"></i></span>
                  <span className="text-sm font-medium">Avances</span>
                </a>
              </Link>
              {/* </PrivateComponent> */}
          </li> 
          
          
          
          <li>
            <Link to='/'>
              <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-red-500 mt-10">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-200"><i className="bx bx-log-out"></i></span>
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </a>
            </Link>
          </li>
            
            
        </ul>
      </div>
    </div>
      
  );
};

export default Sidebar;
