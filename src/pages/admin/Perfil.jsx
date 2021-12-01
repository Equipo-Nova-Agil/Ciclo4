import React, { useEffect, useState} from 'react';
import { useUser } from 'context/userContext';
import Profile from '../../media/profile.jpeg'


const Perfil = () => {
  const { userData } = useUser();
  console.log(userData.nombre)
  const [edit, setEdit] = useState(false)
  
  return <div>
    <section className="relative block" style={{ height: "500px" }}>
          <h1 className="pt-20 mb-0 text-xl text-gray-800 text-center">¡Bienvenido!</h1>
          <h1 className="pt-8 mb-0 text-5xl font-bold text-gray-800 text-center">Panel de Usuario</h1>
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span className=" w-full h-full  opacity-50 "></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style={{ height: "70px" }}>
            <svg className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
          </svg>
          </div>
    </section>

    <section className="relative py-16 ">
      
      <div className="container mx-auto px-4">
          
        <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">

            {/* BOTÓN EDITAR */}
            <button className='flex mt-2 float-right text-gray-500 hover:text-yellow-600'>
              <i className="fas fa-edit justify-self-end"/>
            </button>
            
            {/* FOTO PERFIL */}
            <div className="flex flex-wrap justify-center">
              <div  className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <img alt="Perfil" src={Profile} class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                       style={{ maxWidth: "150px" }}/>
                </div>
              </div>
                  
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div className="py-6 px-3 mt-32 sm:mt-0"></div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
              </div>
            </div>

          </div>
        
        {/* INFORMACIÓN USURIO */}
        <div className="text-center mt-12">

          {/* Nombre */}
          <h3 className="text-4xl font-semibold leading-normal mb-2 pb-2 text-gray-800">{userData.nombre+' '+userData.apellido}</h3>
          {/* Documento */}
          <div className="text-gray-700 mt-0 mb-0 uppercase">
            <i className="fas fa-id-card mr-2 text-md text-gray-500"></i>{userData.identificacion}
          </div>
          {/* Correo */}
          <div className="text-gray-700 mt-0 mb-2">
            <i className="fas fa-at mr-2 text-lg text-gray-500"></i>{userData.correo}
          </div>
          {/* Rol */}
          <div className="text-gray-700 mt-8 mb-2">
            <i className="fas fa-user-tag mr-2 text-md text-gray-500 font-bold"></i>{userData.rol}
          </div>
          {/* Estado */}
          <div className="text-gray-700 mt-0 mb-2 uppercase">
            <i className="fas fa-info-circle mr-2 text-md text-gray-500"></i>
            <span className={userData.estado === 'AUTORIZADO' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
            :userData.estado === 'PENDIENTE'?('relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
            :'relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{userData.estado}</span>
          </div>
          {/* Opción Cambiar Contraseña */}
          <div className="text-sm leading-normal mt-8 mb-6 text-gray-500 font-bold uppercase">
            <i className="fas fa-key mr-2 text-md text-gray-500"></i>
            <button>Cambiar Contraseña</button>
          </div>
                
                
        </div>
        
      </div>
      </div>
    </section>
  
  </div>;
  
  
};

export default Perfil;