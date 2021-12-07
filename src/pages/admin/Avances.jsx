import React, { useState, useEffect, useRef } from "react";
import ReactLoading from 'react-loading';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ToastContainer, toast } from "react-toastify";
import { Dialog} from '@material-ui/core';

//QUERIES & MUTATUIONS
import {obtenerAvances} from '../../graphql/Avances/Queries.js';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries';
import {obtenerProyectos} from '../../graphql/Proyectos/Queries';
import {crearAvance, editarAvance, eliminarAvance} from '../../graphql/Avances/Mutations'

//COMPONETS
import Input from '../../componets/Input';
import TextArea from '../../componets/textArea';
import useFormData from 'hooks/useFormData';
import DropDown from "componets/Dropdown.jsx";
import ButtonLoading from "componets/ButtonLoading.jsx";
import PrivateComponent from '../../componets/PrivateComponent';


const Avances = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [mostrarObservaciones, setMostrarObservaciones] = useState(false);
  const [textoBoton, setTextoBoton] = useState('Nuevo Avance');
  const {loading: loadingAvances, data: dataAvances, error:errorAvances} = useQuery (obtenerAvances);
  
  useEffect(() => {
    if (mostrarObservaciones) {
      setMostrarTabla(false);
    } else {
      setMostrarTabla(true);
    }
  }, [mostrarObservaciones]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Nuevo Avance');
    } else {
      setTextoBoton('Todos Los Avances');
    }
  }, [mostrarTabla]);


  useEffect(() => {
      console.log('Datos Avances Desde El Backend', dataAvances);
  }, [dataAvances]);


  useEffect(() => {
    if (errorAvances) {
      toast.error('Error Consultando Usuarios');
    }
  }, [errorAvances]);

  if (loadingAvances) return <div>
                        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
                        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
                      </div>;


    return (
      <div className='flex h-full w-full flex-col items-center justify-start p-8'>
        <div className='flex flex-col'>
          <h2 className='text-3xl pt-12 pb-8 font-extrabold fuenteColor'>
          Gestión de Avances
          </h2>
          {mostrarObservaciones & !mostrarTabla ? (
          <></>
        ) : (
          <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`shadow-md fondo1 text-gray-200 font-bold p-2 rounded m-6  self-center hover:bg-gray-800`}>
          {textoBoton}
        </button>
        )}
        </div>
        {mostrarObservaciones & !mostrarTabla ? (
          <Observaciones/>
          ) : mostrarTabla ? (
        <TablaAvances/>
        ) : (
          <FormularioCreacionAvances
            setMostrarTabla={setMostrarTabla}
          />
        )}
        
      </div>
      
    );
  };

const Observaciones = ()=> {
  <div>Observaciones</div>
};
const TablaAvances = ({ setEjecutarConsulta }) => {
  const {data:dataAvances} = useQuery (obtenerAvances);
  const [busqueda, setBusqueda] = useState('');
  const listaAvances = dataAvances.Avances;
  const [avancesFiltrados, setAvancesFiltrados] = useState(listaAvances);
  
  useEffect(() => {
    setAvancesFiltrados(
    listaAvances.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
      );
      console.log('Avances Filtrados', avancesFiltrados)
    }, [busqueda, listaAvances]);
    console.log('AvancesFiltrados', avancesFiltrados)

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
                    <th class="px-1 py-1 m-0 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Observaciones
                    </th>
                    <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
                    <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Acciones
                    </th> 
                    </PrivateComponent>
                  </tr>
                </thead>
                <tbody>
                {avancesFiltrados.map((avance) => {
                    return <FilaAvances 
                      key={nanoid()} 
                      avance={avance}/>;
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

const FilaAvances = ({avance, mostrarObservaciones,setMostrarObservaciones})  => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {data: dataUsuarios} = useQuery (obtenerUsuarios);
  const {data: dataProyectos} = useQuery (obtenerProyectos);
  const [modificarAvance, { data: mutacionEditar, loading: mutationLoading, error: mutationError }] = useMutation(editarAvance, {refetchQueries:[{ query: obtenerAvances }]});
  const [borrarAvance, { data: mutacionEliminar, loading: mutationLoadingDelete, error: mutationErrorDelete }] = useMutation(eliminarAvance, {refetchQueries:[{ query: obtenerAvances }]});
  const { _id } = useParams();
  
  const listaEstudiantes = dataUsuarios.Usuarios.filter(e => (e.rol === 'ESTUDIANTE') && (e.estado === 'AUTORIZADO'));
  console.log('Lista Estudiantes', listaEstudiantes);
  const listaProyectos = dataProyectos.Proyectos.filter(p => (p.fase === 'INICIADO')||(p.fase ==='DESARROLLO'));
  console.log('Lista Proyectos', listaProyectos);
    
  const [infoNuevoAvance, setInfoNuevoAvance] = useState({
    _id: avance._id,
    fecha: avance.fecha,
    proyecto: avance.proyecto,
    descripcion: avance.descripcion,
    creadoPor: avance.creadoPor,    
  });

  const actualizarAvance = () => {
    console.log("Le Di a Editar Avance:", infoNuevoAvance)
    modificarAvance({ 
      variables: { ...infoNuevoAvance }
    })
  };

  const suprimirAvance = () => {
    borrarAvance({
      variables: { "_id": infoNuevoAvance._id }
    });
    console.log("id", infoNuevoAvance._id)
    if(mutationErrorDelete){
      toast.error('Error Eliminando Avance', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
    else {
      toast.success('Avance Eliminado Exitosamente', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    };
  };

  const verObservaciones =()=> {
    
    setMostrarObservaciones(true);
  }
  

  return (
    <tr >
      {edit? (
        <>
        
          <td className='text-center'>{infoNuevoAvance._id.slice(20)}</td>
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
                {listaEstudiantes.map((e) => {
             return (
               <option
                 key={nanoid()}
                 value={e._id}
               >{e.nombre}</option>
             );
           })}
            </select>
            </label> 
          </td>
          <td className='text-center'>
            Observaciones
          </td>
            
            
            
        </>
        
      ) :(
      <>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance._id.slice(20)}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.fecha.slice(0, -14)}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.proyecto.nombre}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.descripcion}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800">{avance.creadoPor.nombre}</td>
          <td className=" border-b border-gray-300 rounded-lg bg-white text-md text-center text-gray-800 m-0">
            <button
              type="button"
              title="Ver Detalles"
              onClick={() => {mostrarObservaciones(true);}}>
              <i className="fa fa-eye hover:text-blue-600"></i>
            </button>
          </td>
      </>  
        )}
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <td>
            <div className="flex w-full justify-around text-gray-600 ">
              {edit? (
                <>
                <button type="button" title="Editar"  onClick={() => {setEdit(!edit); actualizarAvance();}}>
                  <i className="fas fa-check hover:text-green-600"></i>
                </button>
                <button type="button" title="Cancelar" onClick={() => {setEdit(!edit);}}>
                  <i className="fas fa-ban hover:text-red-700"></i>
                </button>
              </>
            ):(
              <>
                <button type="button" title="Editar"  onClick={() => setEdit(!edit)}>
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
                ¿Seguro que desea eliminar este avance?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => {suprimirAvance();setOpenDialog(false)}}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-3 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div> 
          </Dialog>
        </td>
      </PrivateComponent>
    </tr>

  );
};


const FormularioCreacionAvances = ({ setMostrarTabla, listaAvances, setAvances }) => {
  const { form, formData, updateFormData } = useFormData();
  const {data: dataUsuarios, loading: loadingUsuarios} = useQuery (obtenerUsuarios);
  const {data: dataProyectos, loading: loadingProyectos} = useQuery (obtenerProyectos);
  const [nuevoAvance, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =useMutation(crearAvance, {refetchQueries:[{ query: obtenerAvances }]});
  
  useEffect(() => {
    if ((loadingUsuarios)||(loadingProyectos)) return <div>
        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
      </div>;
  });

  const listaEstudiantes = dataUsuarios.Usuarios.filter(e => (e.rol === 'ESTUDIANTE') && (e.estado === 'AUTORIZADO'));
  const listaProyectos = dataProyectos.Proyectos.filter(p => (p.fase === 'INICIADO')||(p.fase ==='DESARROLLO'));
  
  const submitForm = (e) => {
    e.preventDefault();
    nuevoAvance({ variables: formData });
    toast.success('Avance Creado Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    });
    setMostrarTabla(true);
  };

    
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nuevo Avance</h2>
      <form onSubmit={submitForm} onChange={updateFormData} ref={form} className='flex flex-col justify-center text-center pb-10'>
        
        <label className='flex flex-col py-2 text-gray-800 font-bold' for='fecha'>
          Fecha del Avance
        </label>
        <Input
        name='fecha' 
        type='date' 
        className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-full'
        required />
        
        <label className='flex flex-col mt-2 py-2 text-gray-800 font-bold' htmlFor='proyecto'>
          Proyecto
        
        <select
          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-400 bg-gray-200 rounded text-sm text-center shadow focus:outline-none focus:ring w-full'
          name='proyecto'
          required
          defaultValue={0}>
          <option disabled value={0}>
            Elija una Opción
          </option>
          {listaProyectos.map((p) => {
            return( <option key={nanoid()}  value={p._id}>
                    {p.nombre}
                  </option>
                  );
            })}
        </select>
        </label>
        
        <label className='flex flex-col mt-2 py-2 font-bold text-gray-800' for='descripcion'>
        Descripción del Avance
        </label>
        <TextArea
        name='descripcion'
        className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200 rounded text-sm shadow-lg focus:outline-none focus:ring w-full'
        rows="8"
        cols="32"
        required={true}/>

        
        <label className='flex flex-col py-2 text-gray-800 font-bold' htmlFor='creadoPor'>
        Creador del Avance
        
          <select
            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200 rounded text-sm text-center shadow-lg focus:outline-none focus:ring w-full'
            name='creadoPor'
            required
            defaultValue={0}>
            <option disabled value={0}>
              Elija una Opción
            </option>
            {listaEstudiantes.map((e) => {
              return <option key={nanoid()}  value={e._id}>{e.nombre}</option>;
            })}
          </select>
        </label>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loadingMutation}
          className='fondo1 text-white active:bg-gray-700 text-sm font-bold mt-5 px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-full transform hover:translate-y-1 transition-transform ease-in duration-200'
          text='Crear Avance'/>
        
      </form>
    </div>
  );
};
      
    


export default Avances;