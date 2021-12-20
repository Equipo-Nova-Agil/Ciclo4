import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useUser } from "context/userContext";
import { Dialog } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import PrivateComponent from "componets/PrivateComponent.jsx";
import { obtenerProyectos } from "graphql/Proyectos/Queries.js";
import ComponenteNoAutorizado from "componets/ComponenteNoAutorizado.jsx";
import {
  crearProyecto,
  editarProyecto,
  eliminarProyecto,
} from "graphql/Proyectos/Mutations.js";
import { obtenerUsuariosPorFiltro } from "graphql/Usuarios/Queries.js";
import { crearInscripcion } from "graphql/Incripciones/Mutations.js";
import useFormData from "hooks/useFormData";
//import Paginacion from "componets/Paginacion.jsx";

const Proyectos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [proyectos, setProyectos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Nuevo Proyecto");
  const { userData } = useUser();

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Nuevo Proyecto");
    } else {
      setTextoBoton("Mostrar Todos Los Proyectos");
    }
  }, [mostrarTabla]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      <div>
        <h2 className="text-3xl pt-12 pb-8 font-extrabold">
          Administración de Proyectos
        </h2>
        <PrivateComponent roleList={["LIDER"]}>
          <button
            onClick={() => {
              setMostrarTabla(!mostrarTabla);
            }}
            className={`shadow-md bg-gray-200 text-gray-600 font-bold p-2 rounded m-6  self-center hover:bg-gray-300`}
          >
            {textoBoton}
          </button>
        </PrivateComponent>
      </div>

      {mostrarTabla ? (
        <TablaProyectos
          datosUsuario={userData}
          setMostrarTabla={setMostrarTabla}
        />
      ) : (
        <FormularioCreacionProyectos
          setMostrarTabla={setMostrarTabla}
          datosUsuario={userData}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

//==================================TABLA PROYECTOS==================================
const TablaProyectos = ({ datosUsuario, setMostrarTabla}) => {
  const [busqueda, setBusqueda] = useState("");
  const [proyectosFiltrados, setProyectosFiltrados] = useState([]);
  const [totalRegistrosFiltrados, setTotalRegistrosFiltrados] = useState(proyectosFiltrados.length);
  const [listaProyectos,setListaProyectos] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);

  //FILTRO
  const filtroByRol = new Object();//, setFiltroByRol] = useState(new Object());
  if(datosUsuario.rol==="LIDER")
  {
    filtroByRol.lider=datosUsuario._id;
  }
  //LISTADO PROYECTOS
  const { loading: loadingProyectos,
       data: dataProyectos,
       error: errorProyectos,refetch } = useQuery(obtenerProyectos
    ,
    {
      variables: {
        filtro: filtroByRol
      },
    }
    );
  
  useEffect(() => {
    if(dataProyectos)
    {
      //console.log("Datos Proyectos Servidor", dataProyectos);
      setProyectosFiltrados(dataProyectos.Proyectos);
      setListaProyectos(dataProyectos.Proyectos);
      setTotalRegistros(dataProyectos.Proyectos.length);
    } 
    refetch()
  }, [dataProyectos]);

  useEffect(() => {
    if (errorProyectos) {
      toast.error("Error Consultando Proyectos");
      //console.log("Error", errorProyectos);
    }
  }, [errorProyectos]);

  useEffect(() => {
    setProyectosFiltrados(
      listaProyectos.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
    setTotalRegistrosFiltrados(proyectosFiltrados.length);
  }, [busqueda, listaProyectos]);

  useEffect(() => {
    setTotalRegistrosFiltrados(proyectosFiltrados.length);
  }, [busqueda, proyectosFiltrados, listaProyectos]);

  useEffect(() => {
    if (setMostrarTabla) {
      refetch()
    }
  }, [setMostrarTabla]);

  if (loadingProyectos)
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Cargando proyectos...</h1>
      <ReactLoading type="bars" color="#11172d" height={467} width={175} />
    </div>
  );

  return (
    <div className="container mx-auto antialiased font-sans bg-white">
      {datosUsuario.estado === "AUTORIZADO" ? (
        //<body className="antialiased font-sans bg-white"> 
          <div className="px-4 sm:px-8">
            <div className="py-8">
              {/* BUSCADOR */}
              <div className="my-2 mx-2 flex sm:flex-row flex-col">
                <div className="block relative">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-gray-500"
                    >
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <input
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar"
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              {/* TABLA */}
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                {proyectosFiltrados.length > 0 ? (
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-lg font-extrabold text-gray-600 uppercase tracking-wider w-10">
                            <i className="fas fa-passport"></i>
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                            Proyecto
                          </th>
                          <th
                            hidden
                            className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32"
                          >
                            Presupuesto
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                            Inicio
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                            Fin
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider">
                            Líder
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                            Fase
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
                            Estado
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-24">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      {/* ARRAY TABLA */}
                      <tbody>
                        {proyectosFiltrados &&
                          proyectosFiltrados.map((proyecto) => {
                            return (
                              <FilaProyectos
                                key={proyecto._id}
                                proyecto={proyecto}
                                usuario={datosUsuario._id}
                              />
                            );
                          })}
                      </tbody>
                    </table>
                    {/* <Paginacion
                      fin={totalRegistrosFiltrados}
                      registros={totalRegistros}
                      limite={10}
                    /> */}
                  </div>
                ) : (
                  <div role="alert">
                    <div className="bg-green-500 text-2xl text-white font-bold rounded-t px-4 py-2">
                      Notificación
                    </div>
                    <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                      <p className="text-2xl">
                        Sin información para visualizar
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        //</body>
      ) : (
        <ComponenteNoAutorizado></ComponenteNoAutorizado>
      )}
    </div>
  );
};

//==================================FILA PROYECTOS==================================
const FilaProyectos = ({ proyecto, usuario }) => {
  const fechaActual = new Date();
  fechaActual.setDate(fechaActual.getDate());
  const [edit, setEdit] = useState(false);
  const [openDialogTerminarProyecto, setOpenDialogTerminarProyecto] =
    useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const [openDialogAprobarProyecto, setOpenDialogAprobarProyecto] =
    useState(false);
  const [openDialogInscribirse, setOpenDialogInscribirse] = useState(false);

  //const { _id } = useParams();
  const [infoNuevoProyecto, setInfoNuevoProyecto] = useState({
    _id: proyecto._id,
    nombre: proyecto.nombre,
    presupuesto: proyecto.presupuesto,
    fechaInicio: proyecto.fechaInicio,
    fechaFin: proyecto.fechaFin,
    estado: proyecto.estado,
    fase: proyecto.fase,
    lider: proyecto.lider,
    objetivos: proyecto.objetivos,
  });

  const [
    deleteProyecto,
    {
      data: mutationDataDelete,
      loading: mutationLoadingDelete,
      error: mutationErrorDelete,
    },
  ] = useMutation(eliminarProyecto);

  const eliminarElProyecto = () => {
    deleteProyecto({
      variables: { _id: infoNuevoProyecto._id },
    });
    //console.log("id", infoNuevoProyecto._id);
    if (mutationErrorDelete) {
      toast.error("Proyecto no se pudo eliminar");
    } else {
      toast.success("Proyecto eliminado con éxito");
      //window.location.href = window.location.href;
    }
    setOpenDialogEliminar(false);
  };

    useEffect(() => {
      if (mutationDataDelete) {
          window.location.href = window.location.href;
      }
    }, [mutationDataDelete]);

  const [
    editProyecto,
    {
      data: mutationDataEdit,
      loading: mutationLoadingEdit,
      error: mutationErrorEdit
    },
  ] = useMutation(editarProyecto);

  //EDITAR ESTADO
  const editarEstadoProyecto = () => {
    let lidera = infoNuevoProyecto.lider._id;
    //delete infoNuevoProyecto.lider
    let estadito;
    let faseactual = infoNuevoProyecto.fase;
    let fechaInicial = infoNuevoProyecto.fechaInicio; //fechaActual.toISOString().substr(0, 10);
    let fechaFinal = infoNuevoProyecto.fechaFin;
    if (proyecto.estado === "ACTIVO") {
      //console.log("Estamos en inactivar proyecto", infoNuevoProyecto);
      estadito = "INACTIVO";
    } else {
      //console.log("Estamos en activar proyecto", infoNuevoProyecto);
      estadito = "ACTIVO";
      if (proyecto.fase === "NULO" || proyecto.fase === "") {
        faseactual = "INICIADO";
        fechaInicial = fechaActual.toISOString().substr(0, 10);
        fechaFinal = "";
      }
    }

    // editProyecto({
    //   //variables: { ...infoNuevoProyecto, lidera}
    //   variables: {
    //     _id: infoNuevoProyecto._id,
    //     nombre: infoNuevoProyecto.nombre,
    //     fechaInicio: infoNuevoProyecto.fechaInicio,
    //     fechaFin: infoNuevoProyecto.fechaFin,
    //     lider: lidera,
    //     presupuesto: infoNuevoProyecto.presupuesto,
    //     fase: faseactual,
    //     estado: estadito,
    //   },
    // });

    // variables: {
    //   filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    // },

    editProyecto({
      variables: {
        _id: infoNuevoProyecto._id,
        campos: {
          fase: faseactual,
          estado: estadito
        },
      },
    });

    if (mutationErrorEdit) {
      toast.error("Proyecto no se pudo editar");
      //console.log("error,", mutationErrorEdit);
    } else {
      toast.success("Proyecto editado con éxito");
    }
    setOpenDialogAprobarProyecto(false);
  };

  //EDITAR FASE/terminar
  const editarFaseProyecto = () => {
    //console.log("Estamos en cambio de fase del proyecto", infoNuevoProyecto);
    let lidera = infoNuevoProyecto.lider._id;
    let estadito = infoNuevoProyecto.estado;
    let lafase = infoNuevoProyecto.fase;
    let fechaFinal = infoNuevoProyecto.fechaFin;
    if (proyecto.fase === "DESARROLLO" && proyecto.estado === "ACTIVO") {
      estadito = "INACTIVO";
      lafase = "TERMINADO";
      fechaFinal = Date.now();
    }

    // editProyecto({
    //   //variables: { ...infoNuevoProyecto}
    //   variables: {
    //     _id: infoNuevoProyecto._id,
    //     nombre: infoNuevoProyecto.nombre,
    //     fechaInicio: infoNuevoProyecto.fechaInicio,
    //     fechaFin: fechaFinal,
    //     lider: lidera,
    //     presupuesto: infoNuevoProyecto.presupuesto,
    //     fase: lafase,
    //     estado: estadito,
    //   },
    // });

    editProyecto({
      variables: {
        _id: infoNuevoProyecto._id,
        campos: {
          fase: lafase,
          estado: estadito,
          fechaFin: fechaFinal
        },
      },
    });

    if (mutationErrorEdit) {
      toast.error("Proyecto no se pudo editar");
      //console.log("error,", mutationErrorEdit);
    } else {
      toast.success("Proyecto editado con éxito");
    }
    setOpenDialogTerminarProyecto(false);
  };

  //CREAR INSCRIPCION
  const [
    inscribirProyecto,
    {
      data: mutationDataInscripcion,
      loading: mutationLoadingInscripcion,
      error: mutationErrorInscripcion,
    },
  ] = useMutation(crearInscripcion);

  const inscribirseEnProyecto = () => {
    inscribirProyecto({
      variables: {
        proyecto: infoNuevoProyecto._id,
        estudiante: usuario,
        estado: "PENDIENTE",
      },
    });
    //console.log("id", infoNuevoProyecto._id);
    if (mutationErrorInscripcion) {
      toast.error("No se pudo enviar la inscripción");
    } else {
      toast.success("Inscripción enviada");
    }
    setOpenDialogInscribirse(false);
  };

  return (
    <tr>
      <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-24">
        {proyecto._id.slice(20)}
      </td>
      <td className="px-3 py-3 uppercase border-b border-gray-300 rounded-lg bg-white text-sm text-justify">
        {proyecto.nombre}
      </td>
      <td
        hidden
        className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32"
      >
        {proyecto.presupuesto}
      </td>
      <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
        {proyecto.fechaInicio.split("T")[0]}
      </td>
      <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
        {proyecto.fechaFin.split("T")[0]}
      </td>
      <td className="px-3 py-3 uppercase border-b border-gray-300 rounded-lg bg-white text-sm text-justify">
        {proyecto.lider.nombre} {proyecto.lider.apellido}
      </td>
      <td className="px-3 py-3 border-b border-gray-300 rounded-lg bg-white text-sm text-center w-32">
        {proyecto.fase}
      </td>
      <td
        className={
          proyecto.estado === "ACTIVO"
            ? "relative inline-block m-4 px-5 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full"
            : proyecto.fase !== "TERMINADO"
            ? "relative inline-block m-4 px-3 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full"
            : "relative inline-block m-4 px-3 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full"
        }
      >
        {proyecto.estado}
      </td>

      <td>
        <div className="flex w-24 justify-around text-gray-800 ">
          <>
            <Link
              to={`/admin/vieditproyectos/${proyecto._id}`}
              title="Ver mas detalles"
            >
              <i className="fa fa-eye hover:text-blue-600"></i>
            </Link>
            <PrivateComponent roleList={["ADMINISTRADOR"]}>
              {
                //Editar proyecto cambiar fase
                proyecto.estado === "ACTIVO" &&
                proyecto.fase === "DESARROLLO" ? (
                  <button
                    type="button"
                    title="Terminar proyecto"
                    onClick={() => setOpenDialogTerminarProyecto(true)}
                  >
                    <i className="fas fa-stop-circle text-green-500 hover:text-green-700"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    title="Terminar proyecto"
                    onClick={() => setOpenDialogTerminarProyecto(true)}
                  >
                    <i className="fas fa-stop-circle text-yellow-500 hover:text-red-700"></i>
                  </button>
                )
              }
              {
                //Aprobar proyecto - activar/inactivar
                proyecto.fase !== "TERMINADO" ? (
                  proyecto.estado !== "ACTIVO" ? (
                    <button
                      type="button"
                      title="Activar proyecto"
                      className=" "
                      onClick={() => setOpenDialogAprobarProyecto(true)}
                    >
                      <i className="fas fa-play-circle text-green-500 hover:text-green-700"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      title="Inactivar proyecto"
                      onClick={() => setOpenDialogAprobarProyecto(true)}
                    >
                      <i className="fas fa-pause-circle text-red-500 hover:text-green-700"></i>
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    title="Activar proyecto"
                    onClick={() => setOpenDialogAprobarProyecto(true)}
                  >
                    <i className="fas fa-play-circle text-yellow-500 hover:text-red-700"></i>
                  </button>
                )
              }
            </PrivateComponent>
            <PrivateComponent roleList={["ESTUDIANTE"]}>
              <button
                type="button"
                title="Inscribirse"
                onClick={() => setOpenDialogInscribirse(true)}
              >
                {proyecto.estado === "ACTIVO" &&
                proyecto.fase !== "TERMINADO" ? (
                  <i className="fas fa-folder-plus hover:text-green-700"></i>
                ) : (
                  <i className="fas fa-folder-plus hover:text-red-700"></i>
                )}
              </button>
            </PrivateComponent>
            <PrivateComponent roleList={["LIDER", "ADMINISTRADOR"]}>
              <button
                type="button"
                title="Eliminar"
                onClick={() => setOpenDialogEliminar(true)}
              >
                {proyecto.fase === "TERMINADO" ||
                proyecto.fase === "DESARROLLO" ? (
                  <i className="fas fa-trash-alt text-yellow-500 hover:text-red-700"></i>
                ) : (
                  <i className="fas fa-trash-alt text-red-500 hover:text-green-700"></i>
                )}
              </button>
            </PrivateComponent>
          </>
        </div>
        <Dialog open={openDialogTerminarProyecto}>
          <div className="p-8 flex flex-col">
            <h1 className="text-gray-900 text-2xl font-bold">
              {proyecto.estado === "ACTIVO" &&
              proyecto.fase === "DESARROLLO" ? (
                <>
                  ¿Está seguro de querer cambiar el proyecto "{proyecto.nombre}"
                  a fase <span className="text-green-600"> terminado</span> ?
                </>
              ) : (
                <>
                  El proyecto "{proyecto.nombre}", no puede cambiar de{" "}
                  <span className="text-red-600">fase </span>en este momento.<br /><br /><span className="text-green-600">NOTA:</span> Se encuentra en
                  {
                    proyecto.fase==="DESARROLLO" ? (" estado "+proyecto.estado.toLowerCase()):
                    (" fase "+proyecto.fase.toLowerCase())
                  }
                </>
              )}
              .
            </h1>
            <div className="flex w-full items-center justify-center my-4">
              {proyecto.estado === "ACTIVO" &&
              proyecto.fase === "DESARROLLO" ? (
                <>
                  <button
                    onClick={() => {
                      editarFaseProyecto();
                    }}
                    className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setOpenDialogTerminarProyecto(false)}
                    className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                  >
                    No
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setOpenDialogTerminarProyecto(false)}
                    className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                  >
                    Cerrar
                  </button>
                </>
              )}
            </div>
          </div>
        </Dialog>
        <Dialog open={openDialogEliminar}>
          <div className="p-8 flex flex-col">
            {proyecto.fase === "TERMINADO" || proyecto.fase === "DESARROLLO" ? (
              <>
                <h1 className="text-gray-900 text-2xl font-bold">
                  El proyecto "{proyecto.nombre}"{" "}
                  <span className="text-red-600">no puede ser eliminado.<br /><br /></span><span className="text-green-600">NOTA:</span> Se encuentra en fase {proyecto.fase.toLowerCase()}.
                </h1>
                <div className="flex w-full items-center justify-center my-4">
                  <button
                    onClick={() => setOpenDialogEliminar(false)}
                    className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            ) : (
              <>
              <h1 className="text-gray-900 text-2xl font-bold">
                  ¿Está seguro de querer{" "}
                  <span className="text-red-600">eliminar</span> el proyecto "
                  {proyecto.nombre}
                  "?
                </h1>
                <div className="flex w-full items-center justify-center my-4">
                  <button
                    onClick={() => eliminarElProyecto()}
                    className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setOpenDialogEliminar(false)}
                    className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </Dialog>
        <Dialog open={openDialogAprobarProyecto}>
          <div className="p-8 flex flex-col">
            <>
              {proyecto.fase !== "TERMINADO" ? (
                proyecto.estado === "ACTIVO" ? (
                  <h1 className="text-gray-900 text-2xl font-bold">
                    ¿Está seguro de querer{" "}
                    <span className="text-red-600">inactivar</span> el proyecto
                    "{proyecto.nombre}"?
                  </h1>
                ) : (
                  <h1 className="text-gray-900 text-2xl font-bold">
                    ¿Está seguro de querer{" "}
                    <span className="text-green-600">activar</span> el proyecto
                    "{proyecto.nombre}"?
                  </h1>
                )
              ) : (
                <h1 className="text-gray-900 text-2xl font-bold">
                  <span className="text-red-600">No se puede activar</span> el
                  proyecto "{proyecto.nombre}".
                  <br /><br /><span className="text-green-600">NOTA:</span> Se encuentra en fase {proyecto.fase.toLowerCase()}.
                </h1>
              )}

              <div className="flex w-full items-center justify-center my-4">
                {proyecto.fase !== "TERMINADO" && (
                  <button
                    onClick={() => {
                      editarEstadoProyecto();
                    }}
                    className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
                  >
                    Sí
                  </button>
                )}
                <button
                  onClick={() => setOpenDialogAprobarProyecto(false)}
                  className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                >
                  {proyecto.fase !== "TERMINADO" ? "No" : "Cerrar"}
                </button>
              </div>
            </>
          </div>
        </Dialog>
        <Dialog open={openDialogInscribirse}>
          <div className="p-8 flex flex-col">
            <>
              {proyecto.estado !== "INACTIVO" ? (
                <h1 className="text-gray-900 text-2xl font-bold">
                  ¿Está seguro de querer{" "}
                  <span className="text-green-600">inscribirse</span> en el
                  proyecto "{proyecto.nombre}"?
                </h1>
              ) : (
                <h1 className="text-gray-900 text-2xl font-bold">
                  El proyecto "{proyecto.nombre}"
                  <span className="text-red-600"> no acepta inscripciones</span>{" "}
                  en este momento
                </h1>
              )}

              <div className="flex w-full items-center justify-center my-4">
                {proyecto.estado !== "INACTIVO" &&
                  proyecto.fase !== "TERMINADO" && (
                    <button
                      onClick={() => inscribirseEnProyecto()}
                      className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md"
                    >
                      Sí
                    </button>
                  )}
                <button
                  onClick={() => setOpenDialogInscribirse(false)}
                  className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md"
                >
                  {proyecto.estado !== "INACTIVO" &&
                  proyecto.fase !== "TERMINADO"
                    ? "No"
                    : "Cerrar"}
                </button>
              </div>
            </>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

//==================================FORMULARIO==================================
const FormularioCreacionProyectos = ({ setMostrarTabla, datosUsuario }) => {
  const lidera=datosUsuario.nombre + " " + datosUsuario.apellido;
  // const form = useRef(null);
  const { form, formData, updateFormData } = useFormData();

  //los lideres
  const {
    loading: loadLideres,
    data: dataLideres,
    error: errorLideres,
    refetch
  } = useQuery(obtenerUsuariosPorFiltro, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  //no se esta usando
  useEffect(() => {
    //console.log(dataLideres);
    if (dataLideres) {
      const lu = {};
      dataLideres.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });
      //setListaUsuarios(lu);
    }
  }, [dataLideres]);

  const [
    createProyecto,
    {
      data: mutationDataCreate,
      loading: mutationLoadingCreate,
      error: mutationErrorCreate,
    },
  ] = useMutation(crearProyecto);

  const submitForm = (e) => {
    e.preventDefault();
    var contObjetivos = 0;
    var Objetivos = [];
    const fd = new FormData(form.current);
    fd.delete("objetivoEspecífico");
    const nuevoProyecto = {};
    fd.forEach((value, key) => {
      if (key.includes("objetivoGeneral")) {
        Objetivos[contObjetivos] = { tipo: "GENERAL", descripcion: value };
        contObjetivos++;
      } else {
        if (key.includes("ObjetivoEspecifico_")) {
          Objetivos[contObjetivos] = { tipo: "ESPECIFICO", descripcion: value };
          contObjetivos++;
        } else {
          nuevoProyecto[key] = value;
        }
        nuevoProyecto[key] = value;
      }
    });

    if (Objetivos.length > 1) {
      createProyecto({
        variables: {
          nombre: nuevoProyecto.nombre,
          presupuesto: parseFloat(nuevoProyecto.presupuesto),
          fechaInicio: nuevoProyecto.fechaInicio,
          fechaFin: nuevoProyecto.fechaFin,
          estado: "INACTIVO",
          fase: "NULO",
          lider: datosUsuario._id,
          objetivos: Object.values(Objetivos),
        },
      });
    } else {
      toast.error(
        "El proyecto no fue creado, posible causa los objetivos especificos"
      );
    }
  };

  useEffect(() => {
    //console.log("Mutación creacion", mutationDataCreate);
    if (mutationDataCreate) {
      toast.success("El proyecto fue creado");
      refetch()
      setMostrarTabla(true);
    }
  }, [mutationDataCreate]);

  if (loadLideres)
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Construyendo formulario...</h1>
      <ReactLoading type="bars" color="#11172d" height={467} width={175} />
    </div>
  );


  return (
    <div className="container mx-auto items-center justify-center">
      <h2 className="text-2xl font-extrabold pb-4 text-gray-800">
        Nuevo Proyecto
      </h2>
      <form ref={form} onSubmit={submitForm}>
        <div
          className="flex flex-wrap -mx-3 mt-4"
          style={{ backgroundColor: "#212D5B" }}
        >
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white font-bold pt-2 pb-2"
              for="grid-password"
              style={{ backgroundColor: "#212D5B" }}
            >
              Nombre del Proyecto
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="nombre"
              type="text"
              placeholder="Escribe aquí el Nombre del Proyecto"
              required={true}
            />
          </div>
        </div>

        <div className="-mx-3 mt-4 mb-2" style={{ backgroundColor: "#212D5B" }}>
          <p
            className="flex-row uppercase text-center text-white font-bold pt-2 pb-2 mt-2 "
            style={{ backgroundColor: "#212D5B" }}
          >
            OBJETIVOS
          </p>
          <div className="flex flex-wrap -mx-3 pl-5 pr-5 pt-1 mb-2">
            <div className="w-full bg-white px-3">
              <label className="block uppercase tracking-wide text-black font-bold pt-2 pb-2">
                General
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="objetivoGeneral"
                placeholder="Escribe aquí el Objetivo General del proyecto"
                defaultValue={""}
                required={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 pl-5 pr-5 pt-2 pb-4">
            <div className="w-full bg-white px-3">
              <label className="block uppercase tracking-wide text-black font-bold pt-2 pb-2">
                Específicos
              </label>
              <TablaObjetivos />
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap -mx-3 mt-4"
          style={{ backgroundColor: "#212D5B" }}
        >
          <div className="w-full md:w-1/3 px-3 pb-4 mb-4 md:mb-0">
            <label
              className="block uppercase tracking-wide text-center text-white font-bold mt-2 mb-2"
              style={{ backgroundColor: "#212D5B" }}
            >
              Presupuesto
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="presupuesto"
              type="number"
              min={1}
              placeholder="Ej: 2000000"
              required={true}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 pb-4 mb-4 md:mb-0">
            <label
              className="block uppercase tracking-wide text-center text-white font-bold mt-2 mb-2"
              style={{ backgroundColor: "#212D5B" }}
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fechaInicio"
              type="date"
              className="block appearance-none w-full bg-gray-200 border border-red-500 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required={true}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 pb-4 mb-4 md:mb-0">
            <label
              className="block uppercase tracking-wide text-center text-white font-bold mt-2 mb-2"
              style={{ backgroundColor: "#212D5B" }}
            >
              Fecha de Terminación
            </label>
            <input
              type="date"
              name="fechaFin"
              placeholder="Fecha estimada de terminación"
              className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required={true}
            />
          </div>
        </div>

        <div
          className="flex flex-wrap -mx-3 mt-4 hidden"
          style={{ backgroundColor: "#212D5B" }}
          hidden
        >
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white font-bold pt-2 pb-2"
              style={{ backgroundColor: "#212D5B" }}
            >
              Líder del Proyecto
            </label>
            <span className="block appearance-none w-full bg-gray-200 border border-green-500 text-black py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {lidera}
            </span>
            {/* <select
              name="lider"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              defaultValue=""
               required={true} 
            >
              <option disabled value="">
                Seleccione un lider
              </option>
              {dataLideres &&
                dataLideres.Usuarios.map((el) => {
                  if (el.estado === "AUTORIZADO")
                    return (
                      <option
                        key={nanoid()}
                        value={el._id}
                      >{`${el.nombre} ${el.apellido}`}</option>
                    );
                })}
            </select> */}
          </div>
        </div>

        <div
          className="flex flex-wrap -mx-3 mt-4 mb-6 hidden"
          style={{ backgroundColor: "#212D5B" }}
          hidden
        >
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white font-bold pt-2 pb-2"
              for="grid-zip"
            >
              Fase del proyecto
            </label>
            <span className="block appearance-none w-full bg-gray-200 border border-green-500 text-black mb-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {"NULO"}
            </span>
            {/* <select
              name="fase"
              className="block appearance-none w-full bg-gray-200 border border-red-500 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              defaultValue={0}
               required={true} 
            >
              <option disabled value={0}>
                Seleccione Una Opción
              </option>
              <option>Iniciado</option>
              <option>En Desarrollo</option>
              <option>Terminado</option>
            </select> */}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white font-bold pt-2 pb-2"
              for="grid-zip"
            >
              Estado del Proyecto
            </label>
            <span className="block appearance-none w-full bg-gray-200 border border-green-500 text-black mb-3 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              {"INACTIVO"}
            </span>
            {/* <select
              name="estado"
              className="block appearance-none w-full bg-gray-200 border border-red-500 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              defaultValue={0}
               required={true} 
            >
              <option disabled value={0}>
                Seleccione Una Opción
              </option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select> */}
          </div>
        </div>

        <div className="md:flex md:items-center mt-8 mb-8">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              type="submit"
              className="col-span-2 py-3 fondo1 font-bold text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600"
            >
              Crear Proyecto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

//==================================TABLA OBJETIVOS ESPECIFICOS==================================
const TablaObjetivos = ({ setObjEspecificosTabla }) => {
  const [filasTabla, setFilasTabla] = useState([]);

  const agregarNuevoObjEspecificos = (objetivo) => {
    setFilasTabla([...filasTabla, objetivo]);
    //console.log("Tabla Objetivos Especificos", filasTabla);
  };

  const eliminarObjEspecificos = (objEspecificosAEliminar) => {
    setFilasTabla(
      filasTabla.filter((v) => v._id !== objEspecificosAEliminar._id)
    );
    //setObjEspecificos([...objEspecificos, objEspecificosAEliminar]); //si se esta utilizando elminiar el objEspecificos del select
  };

  const modificarObjEspecificos = (objEspecificos, descripcion) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === objEspecificos.id) {
          ft.descripcion = descripcion;
        }
        return ft;
      })
    );
  };

  const FilaObjetivos = ({
    obj,
    index,
    eliminarObjetivo,
    modificarObjetivo,
  }) => {
    const [objetivo, setObjetivo] = useState(obj);
    useEffect(() => {
      console.log("Fila objetivo ...objetivo");//, objetivo);
    }, [objetivo]);

    return (
      <tr
        className="flex items-center"
        style={{ borderBottom: "1px solid #212D5B", justifyContent: "center" }}
      >
        {/*py-2*/}
        <td hiddden>{index + 1}</td>
        <td>
          <label htmlFor={`descripcion_${index}`}></label>
          <textarea
            type="text"
            id={`ObjetivoEspecifico_${index}`}
            name={`ObjetivoEspecifico_${index}`}
            rows="2"
            cols="125"
            className="w-full pl-2 pr-2"
            style={{ justifyContent: "center" }}
            defaultValue={objetivo.descripcion}
            onChange={(e) => {
              modificarObjetivo(objetivo, e.target.value);
              setObjetivo({
                ...objetivo,
                descripcion: e.target.value,
              });
            }}
          />
        </td>
        <td hidden>{objetivo.tipo}</td>
        <td className="text-center">
          <i
            onClick={() => eliminarObjetivo(objetivo)}
            className="fas fa-trash-alt text-red-500 cursor-pointer"
          />
        </td>
        <td className="hidden">
          <input defaultValue={objetivo._id} name={`Objetivo_${index}`} />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="flex items-center py-2">
        <textarea
          className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 mr-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name="objetivoEspecífico"
          cols={60}
          id="objetivoEspecífico"
          placeholder="Escribe aquí los Objetivos Específicos"
          defaultValue={""}
        />
        <button
          name="addObjetivo"
          type="button"
          onClick={() => {
            if (
              document.getElementById("objetivoEspecífico").value &&
              document.getElementById("objetivoEspecífico").value.length > 5
            ) {
              //console.log(document.getElementById("objetivoEspecífico").value);
              var myObjetivo = {
                descripcion:
                  document.getElementById("objetivoEspecífico").value,
                tipo: "ESPECIFICO",
                _id: nanoid(),
              };
              agregarNuevoObjEspecificos(myObjetivo);
              document.getElementById("objetivoEspecífico").value = "";
            }
          }}
          className={`col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white`}
        >
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>

      <table className="table mb-2">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th hidden>Tipo</th>
            <th></th>
            <th hidden className="hidden">
              Input
            </th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <FilaObjetivos
                key={el._id}
                obj={el}
                index={index}
                eliminarObjetivo={eliminarObjEspecificos}
                modificarObjetivo={modificarObjEspecificos}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Proyectos;