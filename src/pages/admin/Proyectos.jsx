import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client'; 
import { Dialog} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { obtenerProyectos } from '../../graphql/Proyectos/Queries.js';
import { crearProyecto, editarProyecto, eliminarProyecto} from '../../graphql/Proyectos/Mutations.js';

// import PrivateComponent from 'components/PrivateComponent';

const Proyectos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [proyectos, setProyectos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Nuevo Proyecto');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  //LISTADO PROYECTOS
  const { loading, data, error } = useQuery(obtenerProyectos);

  useEffect(() => {
    if (ejecutarConsulta && data) {
      setProyectos(data);
      console.log(JSON.stringify(setProyectos))
      setEjecutarConsulta(false);
    }
    if (error) {
      console.error("Error: ", error);
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Nuevo Proyecto");
    } else {
      setTextoBoton("Mostrar Todos Los Proyectos");
    }
  }, [mostrarTabla]);

  useEffect(() => {
    console.log("Datos proyectos servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error Consultando proyectos");
      console.log("Error", error);
    }
  }, [error]);

if (loading)
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Cargando...</h1>
      <ReactLoading type="bars" color="#11172d" height={467} width={175} />
    </div>
  );
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div>
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
  const {data} = useQuery (obtenerProyectos);

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
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
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
                  {/* {proyectosFiltrado.Proyectos.map((proyecto) => {
                    return <FilaProyectos 
                      key={nanoid()} 
                      proyecto={proyecto}
                      setEjecutarConsulta={setEjecutarConsulta}/>;
                    })} */}

                  {data &&
                    data.Proyectos.map((proyecto) => {
                      return (
                        <FilaProyectos key={proyecto._id} proyecto={proyecto} />
                      );
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

const FilaProyectos = ({proyecto,setEjecutarConsulta})  => {
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const { _id } = useParams();
  const [infoNuevoProyecto, setInfoNuevoProyecto] = useState({
    _id: proyecto._id,
    nombre: proyecto.nombre,
    presupuesto: proyecto.presupuesto,
    fechaInicio: proyecto.fechaInicio,
    fechaFin: proyecto.fechaFin,
    //lider: proyecto.lider,
    
    fase: proyecto.fase,
    estado: proyecto.estado,
  });

  const [editProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(editarProyecto);

  const [deleteProyecto, { data: mutationDataDelete, loading: mutationLoadingDelete, error: mutationErrorDelete }] = useMutation(eliminarProyecto);

  const enviarDatosEditadosProyecto = () => {
    console.log("le di a editar:", infoNuevoProyecto)
    editProyecto({ 
      variables: { ...infoNuevoProyecto }
    })
    if(mutationError){toast.error('Proyecto no se pudo editar')} else {toast.success('Proyecto editado con éxito')}
  }

  const eliminarUser = () => {
    deleteProyecto({
      variables: { "_id": infoNuevoProyecto._id }
    });
    console.log("id", infoNuevoProyecto._id)
    if(mutationErrorDelete){toast.error('Proyecto no se pudo eliminar')} else {toast.success('Proyecto eliminado con éxito')}
    setOpenDialog(false);
  }
      
  return (
    <tr>
      {edit ? (
        <>
          <td className="px-3 py-3  bg-white text-sm text-center w-24">
            {infoNuevoProyecto._id.slice(20)}
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input
              type="text"
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              value={infoNuevoProyecto.nombre}
              onChange={(e) =>
                setInfoNuevoProyecto({
                  ...infoNuevoProyecto,
                  nombre: e.target.value,
                })
              }
            />
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input
              type="number"
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              value={infoNuevoProyecto.presupuesto}
              onChange={(e) =>
                setInfoNuevoProyecto({
                  ...infoNuevoProyecto,
                  presupuesto: e.target.value,
                })
              }
            />
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input
              type="date"
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              value={infoNuevoProyecto.fechaInicio}
              onChange={(e) =>
                setInfoNuevoProyecto({
                  ...infoNuevoProyecto,
                  fechaInicio: e.target.value,
                })
              }
            />
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input
              type="date"
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              value={infoNuevoProyecto.fechaFin}
              onChange={(e) =>
                setInfoNuevoProyecto({
                  ...infoNuevoProyecto,
                  fechaFin: e.target.value,
                })
              }
            />
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <input
              type="text"
              className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
              value={infoNuevoProyecto.lider}
              onChange={(e) =>
                setInfoNuevoProyecto({
                  ...infoNuevoProyecto,
                  lider: e.target.value,
                })
              }
            />
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <form>
              <select
                className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
                name="fase"
                required
                onChange={(e) =>
                  setInfoNuevoProyecto({
                    ...infoNuevoProyecto,
                    fase: e.target.value,
                  })
                }
                defaultValue={infoNuevoProyecto.fase}
              >
                <option disabled value={0}>
                  Seleccione Fase
                </option>
                <option value="INIACIADO">Iniciado</option>
                <option value="DESARROLLO">Desarrollo</option>
                <option value="TERMINADO">Terminado</option>
              </select>
            </form>
          </td>

          <td className="px-3 py-3  bg-white text-sm text-center w-32">
            <form>
              <select
                className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
                name="estado"
                required
                onChange={(e) =>
                  setInfoNuevoProyecto({
                    ...infoNuevoProyecto,
                    estado: e.target.value,
                  })
                }
                defaultValue={infoNuevoProyecto.estado}
              >
                <option disabled value={0}>
                  Seleccione Estado
                </option>
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </form>
          </td>
        </>
      ) : (
        <>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-24">
            {proyecto._id.slice(20)}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.nombre}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.presupuesto}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.fechaInicio.split("T")[0]}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.fechaFin.split("T")[0]}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.lider}
          </td>
          <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
            {proyecto.fase}
          </td>
          <td
            className={
              proyecto.estado === "ACTIVO"
                ? "relative inline-block m-4 px-2 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full"
                : "relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full"
            }
          >
            {proyecto.estado}
          </td>
        </>
      )}
      <td>
        <div className="flex w-24 justify-around text-gray-800 ">
          {edit ? (
            <>
              <button
                type="button"
                title="Editar"
                onClick={() => {
                  setEdit(!edit);
                  enviarDatosEditadosProyecto();
                }}
              >
                <i className="fas fa-check hover:text-green-600"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                <i className="fas fa-ban hover:text-red-700"></i>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                title="Ver mas detalles"
              >
                <i className="fa fa-eye hover:text-blue-600"></i>
              </button>
              <button
                type="button"
                title="Eliminar"
                onClick={() => setOpenDialog(true)}
              >
                <i className="fas fa-trash-alt hover:text-red-700"></i>
              </button>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">
              ¿Está seguro de querer eliminar el proyecto?
            </h1>
            <div className="flex w-full items-center justify-center my-4">
              <button
                onClick={() => eliminarUser()}
                className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};


// FORMULARIO
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
        nombre: nuevoProyecto.nombre,
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
      <form class="w-full max-w-lg" ref={form} onSubmit={submitForm}>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Nombre del Proyecto
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="proyecto" id="proyecto" type="text" placeholder="Escribe aquí el Nombre del Proyecto" required />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Objetivo General
            </label>
            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="objetivoGeneral" id="objetivoGeneral" placeholder="Escribe aquí el Objetivo General del proyecto" required />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Objetivos Específicos
            </label>
            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='objetivosEspecíficos' id='objetivosEspecíficos' placeholder="Escribe aquí los Objetivos Específicos" required />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Presupuesto
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="presupuesto" id="presupuesto" type="number" min={100000} max={20000000} placeholder="Ej: 2000000" requerid />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Fecha de Inicio
            </label>
            <input type="date" name="fechaInicio" id="fechaInicio" type="date" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" requerid />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Fecha de Terminación
            </label>
            <input type="date" name="fechaFin" id="fechaFin" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" requerid />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Líder del Proyecto
            </label>
            <select name="lider" id="lider" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={0} requerid>
              <option disabled value={0}>Seleccione Una Opción</option>
              <option>Lider 1</option>
              <option>Lider 2</option>
              <option>Lider 3</option>
            </select>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Fase del proyecto
            </label>
            <select name="fase" id="fase" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={0} requerid >
              <option disabled value={0}>Seleccione Una Opción</option>
              <option>Iniciado</option>
              <option>En Desarrollo</option>
              <option>Terminado</option>
            </select>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Estado del Proyecto
            </label>
            <select name="estado" id="estado" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={0} requerid >
              <option disabled value={0}>Seleccione Una Opción</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>

        {/* <button
          type='submit'
          className='col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600'
        >
          Crear Proyecto
        </button> */}
        <div class="md:flex md:items-center mb-8">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button type="submit" class="col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600">
              Crear Proyecto
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
    
  export default Proyectos;