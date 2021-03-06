import React, { useEffect, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { nanoid } from 'nanoid'; 
import { Dialog} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import PrivateComponent from '../../componets/PrivateComponent';
import { useParams } from 'react-router-dom';
import { obtenerUsuarios } from '../../graphql/Usuarios/Queries.js';
import {editarUsuario, eliminarUsuario} from '../../graphql/Usuarios/Mutations.js';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enum';
import { useUser } from "context/userContext";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
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
        <TablaUsuarios listaUsuarios={data && data.Usuarios} />
      </div>
  );
};

const TablaUsuarios = () => {
  const {data: dataUsuarios} = useQuery (obtenerUsuarios);
  const listaUsuarios = dataUsuarios && dataUsuarios.Usuarios;
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  const { userData } = useUser();
  //console.log('listaUsuarios', dataUsuarios)

  useEffect(() => {
    setUsuariosFiltrados(
    listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
    }, [busqueda, listaUsuarios]);
  
  return (

    <div>
      <div className="antialiased font-sans bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">

            {/* BUSCADOR */}
            <div className="my-2 mx-2 flex sm:flex-row flex-col">
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
              </div>
            </div>

            {/* HEADERS TABLA */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>

                      <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Nombre
                      </th>

                      <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Apellidos
                      </th>

                      <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Documento
                      </th>

                      <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Email
                      </th>

                      <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Rol
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-36">
                        Estado
                      </th>
                      {userData.rol === "ADMINISTRADOR" && (
                        <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                          Acciones
                        </th>
                      )
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.map((usuario) => {
                    return <FilaUsuarios 
                      key={nanoid()}
                      usuario={usuario}
                      dataUsuarioConect={userData}
                      />;
                      
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
};

const FilaUsuarios = ({usuario,dataUsuarioConect})  => {
  const [openDialog, setOpenDialog] = useState(false);
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
  

  const [editUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(editarUsuario, {refetchQueries:[{ query: obtenerUsuarios }]});

  const [deleteUsuario, { data: mutationDataDelete, loading: mutationLoadingDelete, error: mutationErrorDelete }] = useMutation(eliminarUsuario, {refetchQueries:[{ query: obtenerUsuarios }]});

  const enviarDatosEditadosUsuario = () => {
    console.log("le di a editar:", infoNuevaUsuario)
    editUsuario({ 
      variables: { ...infoNuevaUsuario }
    })
    if(mutationError){toast.error('Error Editando Usuario')} 
    else {toast.success('Usuario Editado Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    })
  }
  }

  const eliminarUser = () => {
    deleteUsuario({
      variables: { "_id": infoNuevaUsuario._id }
    });
    console.log("id", infoNuevaUsuario._id)
    if(mutationErrorDelete){toast.error('Error Eliminando Usuario')} else 
    {toast.success('Usuario Eliminado Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    })
  }
    setOpenDialog(false);
  }
      
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
            {/* <form>
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
            </form> */} 
            {infoNuevaUsuario.rol}
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
                {/* <PrivateComponent roleList={['ADMINISTRADOR']} */}
                  <option value="NO_AUTORIZADO">No Autorizado</option>
                {/* </PrivateComponent> */}
              </select>
            </form>
          </td>
          
        </>
        
      ) :(
      <>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.nombre}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.apellido}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{usuario.identificacion}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-44">{usuario.correo}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{usuario.rol}</td>
          <td className={usuario.estado === 'AUTORIZADO' ? 'relative inline-block mx-0 my-3 px-4 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
          :usuario.estado === 'PENDIENTE'?('relative inline-block mx-0 my-3 px-6 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
        :'relative inline-block m-1 px-1 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{usuario.estado}</td>
        </>  
        )}
      {dataUsuarioConect.rol === "ADMINISTRADOR" &&
        (
          <td>
            <div className="flex w-24 justify-around text-gray-800 ">
              {edit ? (
                <>
                  <button type="button" title="Editar" onClick={() => { setEdit(!edit); enviarDatosEditadosUsuario(); }}>
                    <i className="fas fa-check hover:text-green-600"></i>
                  </button>
                  <button type="button" title="Cancelar" onClick={() => { setEdit(!edit); }}>
                    <i className="fas fa-ban hover:text-red-700"></i>
                  </button>
                </>
              ) : (
                <>
                  <button type="button" title="Editar" onClick={() => setEdit(!edit)}>
                    <i className="fas fa-user-edit hover:text-yellow-600"></i>
                  </button>
                  <button type="button" title="Eliminar" onClick={() => setOpenDialog(true)}>
                    <i className="fas fa-trash-alt hover:text-red-700"></i>
                  </button>
                </>
              )}

            </div>
            <Dialog open={openDialog}>
              <div className='p-8 flex flex-col'>
                <h1 className='text-gray-900 text-2xl font-bold'>
                  ¿Está seguro de querer eliminar el usuario?
                </h1>
                <div className='flex w-full items-center justify-center my-4'>
                  <button
                    onClick={() => eliminarUser()}
                    className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setOpenDialog(false)}
                    className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                  >
                    No
                  </button>
                </div>
              </div>
            </Dialog>
          </td>
        )
      }
    </tr>

  );
};

export default Usuarios;                    