import React, { useEffect, useState, useRef } from "react";
import Profile from "../../media/profile.jpeg";
import useFormData from "hooks/useFormData";
import { useUser } from "context/userContext";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { editarUsuario } from "graphql/Usuarios/Mutations.js";
import { obtenerUsuario } from "graphql/Usuarios/Queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from 'react-loading';
import Input from "componets/Input";

const Perfil = () => {
  const { userData } = useUser();
  const [edit, setEdit] = useState(false);

  const {data, error, loading} = useQuery(obtenerUsuario, {
    variables: {
      _id: userData._id,
    },
  });

  const infoUsuario = data && data.Usuario;
  console.log('InfoUsuario', infoUsuario)

  const [infoNuevaUsuario, setInfoNuevaUsuario] = useState({
    _id: userData._id,
    nombre: userData.nombre,
    apellido: userData.apellido,
    identificacion: userData.identificacion,
    estado: userData.estado,
    rol: userData.rol,
    correo: userData.correo,
  });

  const [modificarUsuario, { data: dataMutation, loading: mutationLoading, error: mutationError }] = useMutation(editarUsuario);
  const actualizarUsuario = () => {
    modificarUsuario({ 
      variables: { ...infoNuevaUsuario }
    })
    if (actualizarUsuario){
      setInfoNuevaUsuario (infoNuevaUsuario);
    }
    if(mutationError){
      toast.error('Error Editando Perfil', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    } 
    else {
      toast.success('Perfil Editado Exitosamente', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
  }


useEffect(() => {
  if (error) {
    toast.error('Error Consultando Perfil', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    })
  }
}, [error]);

if (loading) return <div>
                      <h1 className='text-3xl font-extrabold'>Cargando...</h1>
                      <ReactLoading type='bars' color='#11172d' height={467} width={175} />
                    </div>;

return <div>
    
    {edit? (
      <>
    <section className="relative block" style={{ height: "500px" }}>
          <h1 className="pt-20 mb-0 text-xl text-gray-800 text-center">¡Bienvenido!</h1>
          <h1 className="pt-8 mb-0 text-5xl font-bold text-gray-800 text-center">Panel de Usuario</h1>
          <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span className=" w-full h-full  opacity-50 "></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style={{ height: "20px" }}>
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
            
            <button className='flex mt-2 mx-2 float-right  text-gray-500 hover:text-red-600'onClick={() => {setEdit(!edit);}}>
              <i className="fas fa-ban justify-self-end pr-1"/>
            </button>

            <button className='flex mt-2 float-right  text-gray-500 hover:text-green-600'onClick={() => {actualizarUsuario();setEdit(!edit)}}>
              <i className="fas fa-check justify-self-end pl-2"/>
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
          <div className='flex flex-col'>
          <Input 
            name='nombre' 
            type='text' 
            className='border-0 px-1 py-1 mb-2 placeholder-gray-400 text-gray-700 bg-white rounded text-4xl shadow focus:outline-none focus:ring w-56'
            defaultValue={infoNuevaUsuario.nombre}
            
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, nombre: e.target.value })}/>
          
          {/* Apellido */}
          <Input 
            name='apellido' 
            type='text' 
            className='border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-4xl shadow focus:outline-none focus:ring w-56'
            defaultValue={infoNuevaUsuario.apellido}
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, apellido: e.target.value })}/>

          </div>
          

          {/* Documento */}
          <div className="text-gray-700 mt-2 mb-0 uppercase">
            <i className="fas fa-id-card mr-2 text-md text-gray-500"></i>
            <Input 
              name='identificacion' 
              type='text' 
              className='border-0 px-0 py-0 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-48'
              defaultValue={infoNuevaUsuario.identificacion}
              onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, identificacion: e.target.value })}/>
          </div>
          {/* Correo */}
          <div className="text-gray-700 mt-0 mb-2">
            <i className="fas fa-at mr-2 text-lg text-gray-500"></i>
            <Input 
              name='correo' 
              type='email' 
              className='border-0 px-0 py-0 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-48'
              defaultValue={infoNuevaUsuario.correo}
              onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, correo: e.target.value })}/>
          </div>
          {/* Rol */}
          <div className="text-gray-700 mt-8 mb-0">
            <i className="fas fa-user-tag mr-2 text-md text-gray-500 font-bold"></i>{userData.rol}
          </div>
          {/* Estado */}
          <div className="text-gray-700 -mt-1 mb-2 uppercase">
            <i className="fas fa-info-circle mr-0 text-md text-gray-500"></i>
            <span className={userData.estado === 'AUTORIZADO' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
            :userData.estado === 'PENDIENTE'?('relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
            :'relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{userData.estado}</span>
          </div>
          {/* Opción Cambiar Contraseña */}
          <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase shadow-md bg-gray-200">
            <i className="fas fa-key mr-0 text-lg text-gray-500"></i>
            <Link to='/admin/cambiarpassword'>
              <button className='shadow-md bg-gray-500 text-white font-bold p-2 rounded m-1  self-center hover:bg-gray-400'>Cambiar Contraseña</button>
            </Link>
          </div>
                
        </div>
        
      </div>
      </div>
    </section>
    </>
    ) :(
      <>
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
            <button 
              className='flex mt-2 float-right text-gray-500 hover:text-yellow-600'
              onClick={() => {setEdit(!edit);}}>
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
          <h3 className="text-4xl font-semibold leading-normal mb-0 pb-0 text-gray-800">{infoUsuario.nombre}</h3>
          {/* Apellido */}
          <h3 className="text-4xl font-semibold leading-normal mt-0 mb-2 pb-2 text-gray-800">{infoUsuario.apellido}</h3>
          {/* Documento */}
          <div className="text-gray-700 mt-0 mb-0 uppercase">
            <i className="fas fa-id-card mr-2 text-md text-gray-500"></i>{infoUsuario.identificacion}
          </div>
          {/* Correo */}
          <div className="text-gray-700 mt-0 mb-2">
            <i className="fas fa-at mr-2 text-lg text-gray-500"></i>{infoUsuario.correo}
          </div>
          {/* Rol */}
          <div className="text-gray-700 mt-8 mb-0">
            <i className="fas fa-user-tag mr-2 text-md text-gray-500 font-bold"></i>{infoUsuario.rol}
          </div>
          {/* Estado */}
          <div className="text-gray-700 -mt-1 mb-2 uppercase">
            <i className="fas fa-info-circle mr-0 text-md text-gray-500"></i>
            <span className={userData.estado === 'AUTORIZADO' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
            :userData.estado === 'PENDIENTE'?('relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
            :'relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{userData.estado}</span>
          </div>
          
          
                
        </div>
        
      </div>
      </div>
    </section>
      </>
    )}
  </div>;
  
  
};

export default Perfil;