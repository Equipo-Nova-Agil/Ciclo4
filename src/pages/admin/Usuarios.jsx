import React, { useEffect, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';
import { obtenerUsuarios } from '../../graphql/Usuarios/Queries.js';
import {editarUsuario} from '../../graphql/Usuarios/Mutations.js';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';



const Usuarios = () => {

  


  const {loading, data, error} = useQuery (obtenerUsuarios);
  
  useEffect(() => {
    console.log('Datos Usuarios Servidor', data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error Consultando Usuarios');
    }
  }, [error]);

  if (loading) return <div>
                        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
                        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
                      </div>;

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
        Administración de Usuarios
        </h2>
      </div>
      <TablaUsuarios/>
      <ToastContainer position='bottom-center' autoClose={4000} />
    </div>
  );
};

const TablaUsuarios = () => {
  const {data} = useQuery (obtenerUsuarios);
  
  return (

    <div>
      <body class="antialiased font-sans bg-white">
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            {/* <div class="my-2 flex sm:flex-row flex-col">
              <div class="block relative">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar"
                  class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
              </div>
            </div> */}

            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Nombre
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Apellidos
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Documento
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Email
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Rol
                      </th>

                      <th class="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-36">
                        Estado
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Editar
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                    data.Usuarios.map((usuario) => {
                    return <FilaUsuarios 
                      key={usuario._id}
                      usuario={usuario}/>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>  
  );
};

const FilaUsuarios = ({usuario})  => {
  const [edit, setEdit] = useState(false);
  const { _id } = useParams();
  const [infoNuevaUsuario, setInfoNuevaUsuario] = useState({
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    identificacion: usuario.identificacion,
    correo: usuario.correo,
    rol: usuario.rol,
    estado: usuario.estado,
  });

  const [editUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(editarUsuario);

  const enviarDatosEditadosUsuario = () => {
    console.log("le di a editar:", infoNuevaUsuario)
    editUsuario({ 
      variables: { ...infoNuevaUsuario }
    }) 

    
  }

  //console.log("info nueva usuario",infoNuevaUsuario)

  // const {
  //   data: queryData,
  //   error: queryError,
  //   loading: queryLoading,
  // } = useQuery(editarUsuario, {
  //   variables: { _id },
  // });

  // console.log(queryData);

  // const [actualizarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(editarUsuario);
  
  // const submitEdit= (e)=> {
  //   e.preventDefault();
  //   console.log(e);

  // useEffect(() => {
  //   if (mutationData) {
  //     toast.success('Usuario Modificado Exitosamente');
  //   }
  // }, [mutationData]);

  // useEffect(() => {
  //   if (mutationError) {
  //     toast.error('Error Modificando Usuario');
  //   }

  //   if (queryError) {
  //     toast.error('Error consultando el usuario');
  //   }
  // }, [queryError, mutationError]);

  // if (queryLoading) return <div>
  //                           <h1 className='text-3xl font-extrabold'>Cargando...</h1>
  //                           <ReactLoading type='bars' color='#11172d' height={467} width={175} />
  //                         </div>;
                          
  // const actualizarUsuario = async () => {
  //   //enviar la info al backend

  //   await editarUsuario(
  //     usuario._id,
  //     // usuario.picture,
  //     {
  //       nombre: infoNuevaUsuario.nombre,
  //       apellido: infoNuevaUsuario.apellido,
  //       identificacion: infoNuevaUsuario.identificacion,
  //       correo: infoNuevaUsuario.correo,
  //       rol: infoNuevaUsuario.rol,
  //       estado: infoNuevaUsuario.estado,
        
  //     },
  //     (response) => {
  //       console.log(response.data);
  //       toast.success('Usuario Modificado Exitosamente');
  //       setEdit(false);
  //       setEjecutarConsulta(true);
  //     },
  //     (error) => {
  //       toast.error('Error Modificando Usuario');
  //       console.error(error);
  //     }
  //   );
    
      
  // };
       
  return (
    <tr >
      {edit? (
        <>

          <td className="px-3 py-3  bg-white text-sm text-center w-44">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevaUsuario.nombre}
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, nombre: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-44">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevaUsuario.apellido}
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, apellido: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-44">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevaUsuario.identificacion}
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, identificacion: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-44">
            <input 
            type="email" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevaUsuario.correo}
            onChange={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, correo: e.target.value })}/>
          </td>
          
          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <form>
              <select
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              name='rol'
              required
              onChange ={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, rol: e.target.value })}
              defaultValue={infoNuevaUsuario.rol}>
                <option disabled value={0}>
                Seleccione Rol
                </option>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="LIDER">Líder</option>
                <option value="ESTUDIANTE">Estudiante</option>
              </select>
            </form>
          </td>
          <td className="px-3 py-3  bg-white text-sm text-center w-36">
            <form>
              <select
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              name='estado'
              required
              onChange ={(e) => setInfoNuevaUsuario({ ...infoNuevaUsuario, estado: e.target.value })}
              defaultValue={infoNuevaUsuario.estado}>
                <option disabled value={0}>
                Seleccione Estado
                </option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="AUTORIZADO">Autorizado</option>
                <option value="NO_AUTORIZADO">No Autorizado</option>
              </select>

            </form>
          </td>
          
        </>
        
      ) :(
      <>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.nombre}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.apellido}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.identificacion}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.correo}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{usuario.rol}</td>
          <td className={usuario.estado === 'AUTORIZADO' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full':'relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{usuario.estado}</td>
          
        </>  
        )}
        <td>
          <div className="flex w-24 justify-around text-gray-800 ">
            {edit? (
              <>
                <i
                  onClick={() => {setEdit(!edit); enviarDatosEditadosUsuario();}}
                  className="fas fa-check hover:text-green-600"/>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban hover:text-red-700'/>
              </>
            ):(
              <>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-user-edit hover:text-yellow-600"/>
                
              </>
            )} 
            
          </div>
        </td>
      
    </tr>

  );
};

export default Usuarios;

                              
                                      
                                              
                                      
 