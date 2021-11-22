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

    <table>

      <thead>
        <tr>
        <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Editar</th>
        </tr>
      </thead>
      <tbody>
      {data &&
            data.Usuarios.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                </tr>
                );
              })}
      </tbody>
    </table>


    
  </div>
  );
};




export default Usuarios;

                              
                                      
                                              
                                      
 