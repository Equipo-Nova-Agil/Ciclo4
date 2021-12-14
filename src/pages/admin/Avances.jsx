import React, { useState, useEffect, useRef } from "react";
import { nanoid } from 'nanoid';
import { useQuery, useMutation } from '@apollo/client';
import { ToastContainer, toast } from "react-toastify";
import { obtenerAvances } from '../../graphql/Avances/Queries.js';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries';
import {obtenerProyectos} from '../../graphql/Proyectos/Queries';
import {crearAvance} from '../../graphql/Avances/Mutations'
import useFormData from 'hooks/useFormData';
import ReactLoading from 'react-loading';
import PrivateComponent from '../../componets/PrivateComponent'

const Avances = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [avances, setAvances] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo Avance');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const {loading, data: dataAvances, error} = useQuery (obtenerAvances);

  useEffect(() => {
      console.log('Datos Avances Servidor', dataAvances);
  }, [dataAvances]);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
          setAvances(dataAvances);
          setEjecutarConsulta(false);
        }
  }, [ejecutarConsulta]);
  console.log('Avances', dataAvances)

  useEffect(() => {
    //obtener lista de avances desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Nuevo Avance');
      
    } else {
      setTextoBoton('Todos Los Avances');
      
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (error) {
      toast.error('Error Consultando Avances');
    }
  }, [error]);

  if (loading) return <div>
                        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
                        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
                      </div>;
    return (
      <div className='flex h-full w-full flex-col items-center justify-start p-8'>
        <div className='flex flex-col'>
          <h2 className='text-3xl pt-12 pb-8 font-extrabold fuenteColor'>
          Gestión de Avances
          </h2>
          <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`shadow-md fondo1 text-gray-200 font-bold p-2 rounded m-6  self-center hover:bg-gray-800`}>
          {textoBoton}
        </button>
        </div>
        {mostrarTabla ? (
        <TablaAvances listaAvances={avances} setEjecutarConsulta={setEjecutarConsulta} />
        ) : (
          <FormularioCreacionAvances
            setMostrarTabla={setMostrarTabla}
            listaAvances={avances}
            setAvances={setAvances}
          />
        )}
        <ToastContainer position='bottom-center' autoClose={3000} />
      </div>
    );
  };

const TablaAvances = ({ listaAvances, setEjecutarConsulta }) => {
  const {data:dataAvances} = useQuery (obtenerAvances);
  const [busqueda, setBusqueda] = useState('');
  const [avancesFiltrados, setAvancesFiltrados] = useState(listaAvances);
  
  // useEffect(() => {
  //   setAvancesFiltrados(
  //   listaAvances.filter((elemento) => {
  //       return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
  //       })
  //     );
  //   }, [busqueda, listaAvances]);

  return (
  <div>
    <body className="antialiased font-sans bg-white">
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">

          {/* BUSCADOR */}
          <div class="my-2 mx-2 flex sm:flex-row flex-col">
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
          </div>
          
            {/* HEADERS TABLA */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              
              <table className="tabla w-full">
                <thead>
                  <tr>
                    
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Código
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Fecha
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Proyecto
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Descripción
                    </th>
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
                        Creado Por
                    </th>
                    
                    {/* <PrivateComponent roleList={['Administrador']}> */}
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Acciones
                    </th> 
                    {/* </PrivateComponent> */}
                  </tr>
                </thead>
                <tbody>
                {dataAvances.Avances.map((avance) => {
                    return <FilaAvances 
                      key={avance._id} 
                      avance={avance}
                      setEjecutarConsulta={setEjecutarConsulta}/>;
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

const FilaAvances = ({avance, ejecutarConsulta, setEjecutarConsulta})  => {
  const [edit, setEdit] = useState(false);
  const {data: dataUsuarios} = useQuery (obtenerUsuarios);
  const {data: dataProyectos} = useQuery (obtenerProyectos);
  
  const listaEstudiantes = dataUsuarios && dataUsuarios.Usuarios.filter(e => (e.rol === 'ESTUDIANTE') && (e.estado === 'AUTORIZADO'));
  console.log('Lista Estudiantes', listaEstudiantes);
  const listaProyectos = dataProyectos && dataProyectos.Proyectos.filter(p => (p.fase === 'INICIADO')||(p.fase ==='DESARROLLO'));
  console.log('Lista Proyectos', listaProyectos);
    
  const [infoNuevoAvance, setInfoNuevoAvance] = useState({
    _id: avance._id,
    fecha: avance.fecha,
    proyecto: avance.proyecto,
    descripcion: avance.descripcion,
    creadoPor: avance.creadoPor,    
  });
  

  return (
    <tr >
      {edit? (
        <>
        
          <td className='text-center'>{infoNuevoAvance._id.slice(20)}
          </td>
          <td><input 
            type="date" 
            className="bg-gray-50 border border-gray-600 p-1 text-center rounded-lg m-1 w-full"
            value={infoNuevoAvance.fecha}
            onChange={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, fecha: e.target.value })}/>
          </td>
          <td>
          <label className='flex flex-col py-2 text-gray-800' htmlFor='proyecto'>
              
              <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='proyecto'
              onChange ={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, proyecto: e.target.value })}
              defaultValue={infoNuevoAvance.proyecto}>
                {listaProyectos.map((p) => {
             return (
               <option
                 key={nanoid()}
                 value={p._id}
               >{p.nombre}</option>
             );
           })}
            </select>
            </label>
          </td>
            
          
          <td>
            <input 
            type="text" 
            className="bg-gray-50 border border-gray-600 p-1 text-center rounded-lg m-1 w-full"
            value={infoNuevoAvance.descripcion}
            onChange={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, descripcion: e.target.value })}/>
          </td>
          <td>
            <label className='flex flex-col py-2 text-gray-800' htmlFor='creadoPor'>
              
              <select
              className="bg-gray-50 border border-gray-600 p-1 rounded-lg m-1 w-full"
              name='creadoPor'
              onChange ={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, creadoPor: e.target.value })}
              defaultValue={infoNuevoAvance.creadoPor}>
                {listaEstudiantes.map((p) => {
             return (
               <option
                 key={nanoid()}
                 value={p._id}
               >{p.nombre}</option>
             );
           })}
            </select>
            </label> 
          </td>
            
            
            
        </>
        
      ) :(
      <>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance._id.slice(20)}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.fecha}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.proyecto.nombre}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.descripcion}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.creadoPor.nombre}</td>
      </>  
        )}
          {/* <PrivateComponent roleList={['Administrador']}> */}
        <td>
            <div className="flex w-full justify-around text-gray-600 ">
              {edit? (
                <>
                  <i
                    // onClick={() => actualizarAvance()} 
                    className="fas fa-check hover:text-green-600"/>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban hover:text-yellow-700'/>
                </>
              ):(
                <>
                  <i
                    onClick={() => setEdit(!edit)}
                    className="fas fa-edit hover:text-yellow-600"/>
                
                    
                  <i
                      // onClick={() => borrarAvance()}
                      class="fas fa-trash text-gray-600 hover:text-red-500"/>
                </>
              )} 
              
            </div>
            

        </td>
          {/* </PrivateComponent> */}
      
    </tr>

  );
};

const FormularioCreacionAvances = ({ setMostrarTabla, listaAvances, setAvances }) => {
  const { form, formData, updateFormData } = useFormData();
  const {data: dataUsuarios} = useQuery (obtenerUsuarios);
  const {data: dataProyectos} = useQuery (obtenerProyectos);
  const [nuevoAvance, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =useMutation(crearAvance);

  const listaEstudiantes = dataUsuarios.Usuarios.filter(e => (e.rol === 'ESTUDIANTE') && (e.estado === 'AUTORIZADO'));
  console.log('Lista Estudiantes', listaEstudiantes);
  const listaProyectos = dataProyectos.Proyectos.filter(p => (p.fase === 'INICIADO')||(p.fase ==='DESARROLLO'));
  console.log('Lista Proyectos', listaProyectos);
  
  const submitForm = (e) => {
    e.preventDefault();
    nuevoAvance({ variables: formData });
  };

  useEffect(() => {
    console.log ('Datos Nuevo Avance', dataMutation);
  },[dataMutation])
    
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nuevo Avance</h2>
      <form onSubmit={submitForm} onChange={updateFormData} ref={form} className='flex flex-col justify-center text-center pb-10'>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='fecha'>
          Fecha del Avance
          <input
            name='fecha'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='date'
            required/>
        </label>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='proyecto'>
        Proyecto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='proyecto'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaProyectos.map((p) => {
              return <option key={nanoid()}  value={p._id}>{`${p.nombre}`}</option>;
            })}
          </select>
        </label>
        
        
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='precio'>    
          Descripción del Avance
          <input
            name='descripcion'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            required/>
        </label>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='creadoPor'>
        Creador del Avance
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='creadoPor'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaEstudiantes.map((e) => {
              return <option key={nanoid()}  value={e._id}>{`${e.nombre}`}</option>;
            })}
          </select>
        </label>
        <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-700'
        >
          Guardar Avance
        </button>
      </form>
    </div>
  );
};
      
    


export default Avances;