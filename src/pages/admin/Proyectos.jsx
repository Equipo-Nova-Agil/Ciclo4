import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { obtenerProyectos, crearProyecto, editarProyecto, eliminarProyecto } from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateComponent from 'components/PrivateComponent';

const Proyectos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [proyectos, setProyectos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo Proyecto');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProyectos(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setProyectos(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error('Hay un Error:', error);
        }
      );
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de proyectos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Nuevo Proyecto');
      
    } else {
      setTextoBoton('Mostrar Todos Los Proyectos');
      
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl pt-12 pb-8 font-extrabold'>
          Administración de Proyectos
        </h2>
        {/* <PrivateComponent roleList={['Administrador']}> */}
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`shadow-md bg-gray-200 text-gray-600 font-bold p-2 rounded m-6  self-center hover:bg-gray-300`}>
          {textoBoton}
        </button>
        {/* </PrivateComponent> */}
      </div>
      {mostrarTabla ? (
        <TablaProyectos listaProyectos={proyectos} setEjecutarConsulta={setEjecutarConsulta} />
        ) : (
          <FormularioCreacionProyectos
            setMostrarTabla={setMostrarTabla}
            listaProyectos={proyectos}
            setProyectos={setProyectos}
          />
        )}
        <ToastContainer position='bottom-center' autoClose={3000} />
      </div>
    );
  };

const TablaProyectos = ({ listaProyectos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [proyectosFiltrados, setProyectosFiltrados] = useState(listaProyectos);
  
  useEffect(() => {
    setProyectosFiltrados(
      listaProyectos.filter((elemento) => {
      return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProyectos]);

return (
  <div>
    {/* TABLA PROYECTOS */}
    <body class="antialiased font-sans bg-white">
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
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-lg font-extrabold text-gray-600 uppercase tracking-wider w-20">
                        <i class="fas fa-passport"></i>
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Proyecto
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Objativos Generales
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Objetivos Específicos
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Presupuesto
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Inicio
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Fin
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Líder
                      </th>

                      <th class="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Fase
                      </th>

                      <th class="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                        Estado
                      </th>

                      <th class="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                        Acciones
                      </th>

                    </tr>
                  </thead>

                  {/* ARRAY TABLA */}
                  <tbody>
                    {proyectosFiltrados.map((proyecto) => {
                    return <FilaProyectos 
                      key={nanoid()} 
                      proyecto={proyecto}
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

const FilaProyectos = ({proyecto, setEjecutarConsulta})  => {
  const [edit, setEdit] = useState(false)
  const [infoNuevoProyecto, setInfoNuevoProyecto] = useState({
    _id: proyecto._id,
    nombreProyecto: proyecto.nombreProyecto,
    objetivosGenerales: proyecto.objetivosGenerales,
    objetivosEspecificos: proyecto.objetivosEspecificos,
    presupuesto: proyecto.presupuesto,
    fechaInicio: proyecto.fechaInicio,
    fechaFin: proyecto.fechaFin,
    lider: proyecto.lider,
    fase: proyecto.fase,
    estado: proyecto.estado,
  });

  const actualizarProyecto = async () => {
    //enviar la info al backend

    await editarProyecto(
      proyecto._id,
      {
        nombreProyecto: infoNuevoProyecto.nombreProyecto,
        objetivosGenerales: infoNuevoProyecto.objetivosGenerales,
        objetivosEspecificos: infoNuevoProyecto.objetivosEspecificos,
        presupuesto: infoNuevoProyecto.presupuesto,
        fechaInicio: infoNuevoProyecto.fechaInicio,
        fechaFin: infoNuevoProyecto.fechaFin,
        lider: infoNuevoProyecto.lider,
        fase: infoNuevoProyecto.fase,
        estado: infoNuevoProyecto.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success('Proyecto Modificado Exitosamente');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error Modificando Proyecto');
        console.error(error);
      }
    );
    
      
  };
       
  return (

    <tr >
      {edit? (
        <>

          <td className='px-3 py-3  bg-white text-sm text-center w-24'>{infoNuevoProyecto._id.slice(20)}</td> 
          
          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.nombreProyecto}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, nombreProyecto: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.objetivosGenerales}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, objetivosGenerales: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.objetivosEspecificos}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, objetivosEspecificos: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="number" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.presupuesto}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, presupuesto: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="date" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.fechaInicio}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fechaInicio: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="date" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.fechaFin}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fechaFin: e.target.value })}/>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input 
            type="text" 
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            value={infoNuevoProyecto.lider}
            onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, lider: e.target.value })}/>
          </td>

          

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <form>
              <select
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              name='fase'
              required
              onChange ={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fase: e.target.value })}
              defaultValue={infoNuevoProyecto.fase}>
                <option disabled value={0}>
                Seleccione Fase
                </option>
                <option value="Iniciado">Iniciado</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Terminado">Terminado</option>
              </select>
            </form>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <form>
              <select
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              name='estado'
              required
              onChange ={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, estado: e.target.value })}
              defaultValue={infoNuevoProyecto.estado}>
                <option disabled value={0}>
                Seleccione Estado
                </option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </form>
          </td>
          
        </>
        
      ) :(
      <>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-24">{proyecto._id.slice(20)}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.nombreProyecto}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.objetivosGenerales}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.objetivosEspecificos}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.presupuesto}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.fechaInicio}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.fechaFin}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.lider}</td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">{proyecto.fase}</td>
          <td className={proyecto.estado === 'Activo' ? 'relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full':'relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{proyecto.estado}</td>
          
        </>  
        )}
        <td>
          <div className="flex w-24 justify-around text-gray-800 ">
            {edit? (
              <>
                <i
                  onClick={() => actualizarProyecto()} 
                  className="fas fa-check hover:text-green-600"/>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban hover:text-red-700'/>
              </>
            ):(
              <>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-edit hover:text-yellow-600"/>
                
              </>
            )} 
            
          </div>
        </td>
      
    </tr>

  );
};

const FormularioCreacionProyectos = ({ setMostrarTabla, listaProyectos, setProyectos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProyecto = {};
    fd.forEach((value, key) => {
      nuevoProyecto[key] = value;
    });

    await crearProyecto(
      {
        nombreProyecto: nuevoProyecto.nombreProyecto,
        objetivosGenerales: nuevoProyecto.objetivosGenerales,
        objetivosEspecificos: nuevoProyecto.objetivosEspecificos,
        presupuesto: nuevoProyecto.presupuesto,
        fechaInicio: nuevoProyecto.fechaInicio,
        fechaFin: nuevoProyecto.fechaFin,
        lider: nuevoProyecto.lider,
        fase: nuevoProyecto.fase,
        estado: nuevoProyecto.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success('Proyecto Creado Exitosamente');
        setMostrarTabla(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error Creando Proyecto');
      }
    );
    setMostrarTabla(true);
  };
    
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 text-gray-800'>Nuevo Proyecto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center text-center pb-10'>
        
        <label className='flex flex-col py-2 text-gray-800' htmlFor='producto'>
          Nombre del Proyecto
          <input
            name='proyecto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='text'
            placeholder='Escribe aquí el Nombre del Proyecto'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='producto'>
          Objetivos Generales
          <textarea
            name='objetivosGenerales'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            placeholder='Escribe aquí los Objetivos Generales'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='producto'>
          Objetivos Específicos
          <textarea
            name='objetivosEspecíficos'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            placeholder='Escribe aquí los Objetivos Específicos'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='modelo'>
          Presupuesto
          <input
            name='presupuesto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={100000}
            max={20000000}
            placeholder='Ej: 2000000'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='nucleos'>
          Fecha de Inicio
          <input
            name='fechaInicio'
            className='bg-gray-50 border border-gray-600 text-center p-2 rounded-lg m-2'
            type='date'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='nucleos'>
          Fecha de Terminación
          <input
            name='fechaFin'
            className='bg-gray-50 border border-gray-600 text-center p-2 rounded-lg m-2'
            type='date'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='producto'>
          Líder del Proyecto
          <input
            name='lider'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 '
            type='text'
            placeholder='Escribe aquí el Nombre del Líder del Proyecto'
            required/>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
          Fase del Proyecto
          <select
            className='bg-gray-50 border border-gray-600 text-center p-2 rounded-lg m-2'
            name='fase'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione Una Opción
            </option>
            <option>Iniciado</option>
            <option>En Desarrollo</option>
            <option>Terminado</option>
          </select>
        </label>

        <label className='flex flex-col py-2 text-gray-800' htmlFor='estado'>
          Estado del Proyecto
          <select
            className='bg-gray-50 border border-gray-600 text-center p-2 rounded-lg m-2'
            name='estado'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione Una Opción
            </option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </label>
        <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600'
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};
    



   

  export default Proyectos;