import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {nanoid} from 'nanoid';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries.js';
import {editarUsuario} from '../../graphql/Usuarios/Mutations.js';


const Usuarios = () => {
  const {loading, data, error} = useQuery (obtenerUsuarios);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log ("Datos Servidor", data);
  },[data]);



  return <div>Lista Usuarios</div>

//   useEffect(() => {
//     console.log('consulta', ejecutarConsulta);
//     if (ejecutarConsulta) {
//         obtenerUsuarios(
//           (data) => {
//             console.log('La Respuesta de obtenerUsuarios fue', data);
//             setUsuarios(data);
//             setEjecutarConsulta(false);
//           },
//           (error) => {
//             console.error('Salio un error:', error);
//           }
//         );
//       }
//     }, [ejecutarConsulta]);
//     useEffect(() => {
//       //obtener lista de usuarios desde el backend
//       if (mostrarTabla) {
//         setEjecutarConsulta(true);
//       }
//     }, [mostrarTabla]);

//     return (
//       <div className='flex h-full w-full flex-col items-center justify-start p-8'>
//         <div className='flex flex-col'>
//           <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
//           Administración de Usuarios
//           </h2>
//         </div>
//         {mostrarTabla ? (
//         <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/>
//         ) : (
//         <TablaUsuarios
//           setMostrarTabla={setMostrarTabla}
//           listaUsuarios={usuarios}
//           setUsuarios={setUsuarios}/>
//         )}
//         <ToastContainer position='bottom-center' autoClose={4000} />
//       </div>
//   );
// };

// const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
//   const [busqueda, setBusqueda] = useState('');
//   const [usuriosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  
//   useEffect(() => {
//     setUsuariosFiltrados(
//       listaUsuarios.filter((elemento) => {
//         return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
//       })
//     );
//   }, [busqueda, listaUsuarios]);
  
  
//   return (

//     <div>
//       <body class="antialiased font-sans bg-white">
//         <div class="container mx-auto px-4 sm:px-8">
//           <div class="py-8">
//             <div class="my-2 flex sm:flex-row flex-col">
//               <div class="block relative">
//                 <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
//                   <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
//                     <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
//                     </path>
//                   </svg>
//                 </span>
//                 <input 
//                   value={busqueda}
//                   onChange={(e) => setBusqueda(e.target.value)}
//                   placeholder="Buscar"
//                   class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
//               </div>
//             </div>

//             <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//               <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                
//                 <table class="min-w-full leading-normal">
//                   <thead>
//                     <tr>

//                       {/* <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-lg font-extrabold text-gray-600 uppercase tracking-wider w-20">
//                         <i class="fas fa-address-card"></i>
//                       </th> */}

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                         Nombre
//                       </th>

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                         Apellidos
//                       </th>

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
//                         Documento
//                       </th>

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                         Email
//                       </th>

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
//                         Rol
//                       </th>

//                       <th class="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-36">
//                         Estado
//                       </th>

//                       <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
//                         Editar
//                       </th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     {usuriosFiltrados.map((usuario) => {
//                     return <FilaUsuarios 
//                       key={nanoid()} 
//                       usuario={usuario}
//                       setEjecutarConsulta={setEjecutarConsulta}/>;
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </div>  
//   );
// };

// const FilaUsuarios = ({usuario, setEjecutarConsulta})  => {
//   const [edit, setEdit] = useState(false)
//   const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
//     _id: usuario._id,
//     nombre: usuario.nombre,
//     apellido: usuario.apellido,
//     identificacion: usuario.identificacion,
//     correo: usuario.correo,
//     rol: usuario.rol,
//     estado: usuario.estado,
//   });
//   const actualizarUsuario = async () => {
//     //enviar la info al backend

//     await editarUsuario(
//       usuario._id,
//       // usuario.picture,
//       {
//         nombre: infoNuevoUsuario.nombre,
//         apellido: infoNuevoUsuario.apellido,
//         identificacion: infoNuevoUsuario.identificacion,
//         correo: infoNuevoUsuario.correo,
//         rol: infoNuevoUsuario.rol,
//         estado: infoNuevoUsuario.estado,
        
//       },
//       (response) => {
//         console.log(response.data);
//         toast.success('Usuario Modificado Exitosamente');
//         setEdit(false);
//         setEjecutarConsulta(true);
//       },
//       (error) => {
//         toast.error('Error Modificando Usuario');
//         console.error(error);
//       }
//     );
    
      
//   };
       
//   return (
//     <tr >
//       {edit? (
//         <>

//           {/* <td className="px-3 py-3  bg-white text-sm text-center w-20">
//             <div class="flex items-center flex-shrink-0 w-10 h-10">
//                 <img class="rounded-full" src={usuario.picture} alt="ProfilePicture" />
//             </div>
//           </td>   */}

//           <td className='px-3 py-3  bg-white text-sm text-center w-32'>{infoNuevoUsuario._id.slice(20)}</td>
          
//           <td className="px-3 py-3  bg-white text-sm text-center w-44">
//             <input 
//             type="text" 
//             className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//             value={infoNuevoUsuario.nombre}
//             onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, nombre: e.target.value })}/>
//           </td>

//           <td className="px-3 py-3  bg-white text-sm text-center w-44">
//             <input 
//             type="text" 
//             className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//             value={infoNuevoUsuario.apellido}
//             onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, apellido: e.target.value })}/>
//           </td>

//           <td className="px-3 py-3  bg-white text-sm text-center w-44">
//             <input 
//             type="text" 
//             className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//             value={infoNuevoUsuario.identificacion}
//             onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, identificacion: e.target.value })}/>
//           </td>

//           <td className="px-3 py-3  bg-white text-sm text-center w-44">
//             <input 
//             type="email" 
//             className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//             value={infoNuevoUsuario.correo}
//             onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, correo: e.target.value })}/>
//           </td>
          
//           <td className="px-3 py-3  bg-white text-sm text-center w-32">
//             <form>
//               <select
//               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//               name='rol'
//               required
//               onChange ={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })}
//               defaultValue={infoNuevoUsuario.rol}>
//                 <option disabled value={0}>
//                 Seleccione Rol
//                 </option>
//                 <option value="ADMINISTRADOR">Administrador</option>
//                 <option value="LIDER">Líder</option>
//                 <option value="ESTUDIANTE">Estudiante</option>
//               </select>
//             </form>
//           </td>
//           <td className="px-3 py-3  bg-white text-sm text-center w-36">
//             <form>
//               <select
//               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//               name='estado'
//               required
//               onChange ={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, estado: e.target.value })}
//               defaultValue={infoNuevoUsuario.estado}>
//                 <option disabled value={0}>
//                 Seleccione Estado
//                 </option>
//                 <option value="PENDIENTE">Pendiente</option>
//                 <option value="AUTORIZADO">Autorizado</option>
//                 <option value="NO_AUTORIZADO">No Autorizado</option>
//               </select>

//             </form>
//           </td>
          
//         </>
        
//       ) :(
//       <>
//           {/* <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-20">
//             <div class="flex items-center flex-shrink-0 w-10 h-10">
//                 <img class="w-full h-full rounded-full" src={usuario.picture} alt="ProfilePicture" />
//             </div>
//           </td> */}
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{usuario._id.slice(20)}</td>
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.nombre}</td>
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.apellido}</td>
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.identificacion}</td>
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.correo}</td>
//           <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{usuario.rol}</td>
//           <td className={usuario.estado === 'AUTORIZADO' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full':'relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{usuario.estado}</td>
          
//         </>  
//         )}
//         <td>
//           <div className="flex w-24 justify-around text-gray-800 ">
//             {edit? (
//               <>
//                 <i
//                   onClick={() => actualizarUsuario()} 
//                   className="fas fa-check hover:text-green-600"/>
//                 <i
//                   onClick={() => setEdit(!edit)}
//                   className='fas fa-ban hover:text-red-700'/>
//               </>
//             ):(
//               <>
//                 <i
//                   onClick={() => setEdit(!edit)}
//                   className="fas fa-user-edit hover:text-yellow-600"/>
                
//               </>
//             )} 
            
//           </div>
//         </td>
      
//     </tr>

//   );
};

export default Usuarios;

                              
                                      
                                              
                                      
 