import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import {nanoid} from 'nanoid';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries.js';
import {editarUsuario} from '../../graphql/Usuarios/Mutations.js';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';


const Usuarios = () => {
  const {loading, data, error} = useQuery (obtenerUsuarios);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  

  useEffect(() => {
    console.log('data servidor', data);
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

    {/* TÍTULO */}
    <div className='flex flex-col'>
      <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
        Administración de Usuarios
      </h2>
    </div>

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
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{u.nombre}</td>
                  <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{u.apellido}</td>
                  <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{u.identificacion}</td>
                  <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{u.correo}</td>
                  <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{Enum_Rol[u.rol]}</td>
                  <td className={Enum_EstadoUsuario[u.estado] === 'Autorizado' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full':'relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{Enum_EstadoUsuario[u.estado]}</td>
                </tr>
                );
              })}
      </tbody>
    </table>


    
  </div>
  );
};




export default Usuarios;

                              
                                      
                                              
                                      
 