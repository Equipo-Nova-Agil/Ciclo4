import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/userContext";
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "@apollo/client";
import { obtenerProyecto } from "graphql/Proyectos/Queries";
import { editarProyecto } from "graphql/Proyectos/Mutations";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enum";
import { obtenerUsuariosPorFiltro } from "graphql/Usuarios/Queries";
import { obtenerAvancesPorProyecto } from "graphql/Avances/Queries";
import { obtenerIncripcionesPorProyecto } from "graphql/Incripciones/Queries";

import Input from "componets/Input";
import ButtonLoading from "componets/ButtonLoading";
import ReactLoading from "react-loading";
import useFormData from "hooks/useFormData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, getListSubheaderUtilityClass } from "@mui/material";

import DropDown from "componets/Dropdown";
import PrivateComponent from "componets/PrivateComponent";

import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "componets/Accordion";

//PANEL PRINCIPAL
const VieditProyectos = (vistaProyecto) => {
  const { userData } = useUser();
  const { _id } = useParams();
  const [activeVistaProyecto, setActiveVistaProyecto] = useState(true);
  const [tituloVentana, setTituloVentana] = useState("");
  const [tituloBoton, setTituloBoton] = useState("Editar");
  // const { form, formData, updateFormData } = useFormData(null);

  //Avances del proyecto ...filtrarAvance
  const {
    data: queryAvances,
    error: queryAvancesError,
    loading: queryAvancesLoading,
  } = useQuery(obtenerAvancesPorProyecto, { variables: { proyecto: _id } });

  //Inscripciones del proyecto....
  const {
    data: queryInscripciones,
    error: queryInscripcionesError,
    loading: queryInscripcionesLoading,
  } = useQuery(obtenerIncripcionesPorProyecto, {
    variables: { proyecto: _id },
  });

  //Listado lideres
  const {
    loading: queryLideresLoading,
    data: queryLideres,
    error: queryLideresError,
  } = useQuery(obtenerUsuariosPorFiltro, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  //Consulta Proyecto...Proyecto
  const {
    data: queryProyecto,
    error: queryErrorProyecto,
    loading: queryProyectoLoading,
  } = useQuery(obtenerProyecto, { variables: { _id } }); //{_id}

  useEffect(() => {
    if (activeVistaProyecto) {
      console.log("Vista proyecto");
      setTituloVentana("VISTA PROYECTO");
    } else {
      console.log("Vista formulario");
      setTituloVentana("EDICION FORMULARIO");
    }
  }, [activeVistaProyecto]);

  useEffect(() => {
    if (queryProyecto && queryProyecto.Proyecto) {
      console.log("Datos Proyecto Servidor", queryProyecto.Proyecto);
    }
  }, [queryProyecto]);

  useEffect(() => {
    if (queryErrorProyecto) {
      toast.error("Error Consultando Proyecto");
      console.log("Error", queryErrorProyecto);
    }
  }, [queryErrorProyecto]);

  useEffect(() => {
    if (queryLideres) {
      console.log("Los lideres:", queryLideres);
    }
  }, [queryLideres]);

  if (queryProyectoLoading && queryLideresLoading) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold">Cargando proyecto...</h1>
        <ReactLoading type="bars" color="#11172d" height={467} width={175} />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
          <Link to="/admin/proyectos">
            <i className="fas fa-arrow-left text-left mr-20 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
          </Link>
          {tituloVentana}
        </h1>
      </div>

      {activeVistaProyecto ? (
        <VistaProyecto
          setActiveVistaProyecto={setActiveVistaProyecto}
          proyecto={queryProyecto && queryProyecto.Proyecto}
          datosUsuario={userData}
        />
      ) : (
        <VistaFormulario
          setActiveVistaProyecto={setActiveVistaProyecto}
          proyecto={queryProyecto && queryProyecto.Proyecto}
          datosUsuario={userData}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

//***********************************************************************************
//==================================VISTA PROYECTO==================================*
//***********************************************************************************

  //==================================ACORDEONES==================================
  //OBJETIVOS
  const AcordeonObjetivos = ({ objetivos, titulo }) => {
    {
      var losObjetivosEsp = [];
      var losObjetivosGen = [];
      losObjetivosGen = objetivos.filter((obj) => obj.tipo === "GENERAL");
      losObjetivosEsp = objetivos.filter((obj) => obj.tipo === "ESPECIFICO");
      return (
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="flex w-full justify-between">
              <div className="uppercase font-bold text-gray-100 ">{titulo}</div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <div>
              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-2">
                <b>OBJETIVO GENERAL</b>
              </p>
              {objetivos ? (
                objetivos.length > 0 ? (
                  losObjetivosGen.map((elObj) => {
                    return (
                      <p className="w-full text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                        {elObj.descripcion}
                      </p>
                    );
                  })
                ) : (
                  <p className="w-full text-black border border-gray-200 rounded py-2 px-4 mt-2">
                    Proyecto no contiene objetivos generales
                  </p>
                )
              ) : (
                <p className="w-full text-black border border-gray-200 rounded py-2 px-4 mt-2">
                  No se ha cargado información
                </p>
              )}
            </div>
            <div>
              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-2 mt-2">
                <b>OBJETIVOS ESPECIFICOS</b>
              </p>
              {objetivos ? (
                objetivos.length > 0 ? (
                  losObjetivosEsp.map((elObj) => {
                    return (
                      <p className="w-full text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                        {elObj.descripcion}
                      </p>
                    );
                  })
                ) : (
                  <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                    Proyecto no contiene objetivos especificos
                  </p>
                )
              ) : (
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                  No se ha cargado información
                </p>
              )}
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      );
      return "no se han cargado objetivos";
    }
  };
  //LIDER
  const AcordeonLider = ({ lider, titulo }) => {
    {
      return (
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="flex w-full justify-between">
              <div className="uppercase font-bold text-gray-100 ">{titulo}</div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <div>
              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                {lider && lider.nombre} {lider && lider.apellido}
              </p>

              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                <ul>{lider && lider.correo}</ul>
              </p>
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      );
      return "no se han cargado información del lider";
    }
  };
  //AVANCES
  const AcordeonAvances = ({ avances, titulo }) => {
    {
      return (
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="flex w-full justify-between">
              <div className="uppercase font-bold text-gray-100 ">{titulo}</div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <div>
              {avances ? (
                avances.length > 0 ? (
                  avances.map((elavan) => {
                    return (
                      <p className="w-full bg-gray-200 text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                        {elavan.descripcion}
                        <span>
                          <br />
                          {elavan.creadoPor.nombre &&
                            "By - " +
                              elavan.creadoPor.nombre +
                              " " +
                              elavan.creadoPor.apellido}
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                    Proyecto no contiene avances
                  </p>
                )
              ) : (
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                  No se ha cargado información
                </p>
              )}
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      );
    }
  };
  //INSCRIPCIONES
  const AcordeonInscripciones = ({ inscripciones, titulo }) => {
    {
      return (
        <AccordionStyled>
          <AccordionSummaryStyled
            expandIcon={<i className="fas fa-chevron-down" />}
          >
            <div className="flex w-full justify-between">
              <div className="uppercase font-bold text-gray-100 ">{titulo}</div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <div>
              {inscripciones ? (
                inscripciones.length > 0 ? (
                  inscripciones.map((inscripcion) => {
                    return (
                      <p className="w-full bg-gray-200 text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                        {inscripcion.estudiante.nombre}{" "}
                        {inscripcion.estudiante.apellido}{" "}
                        {inscripcion.estado==="ACEPTADO" && <i className="fas fa-check-circle text-green-600"></i>}
                        {inscripcion.estado==="RECHAZADO" && <i className="fas fa-ban text-red-600"></i>}
                        {inscripcion.estado==="PENDIENTE" && <i className="fas fa-concierge-bell text-yellow-600"></i>}
                      </p>
                    );
                  })
                ) : (
                  <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                    Proyecto no contiene inscripciones
                  </p>
                )
              ) : (
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mt-2">
                  No se ha cargado información
                </p>
              )}
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      );
    }
  };

const VistaProyecto = ({ datosUsuario, setActiveVistaProyecto, proyecto }) => {

  return (
    <div class="box-border h-full w-100 p-4 border-4 border-gray">
      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-full px-3">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="application-link"
          >
            Nombre del proyecto
            <span className="text-red-500 text-xs italic"> *</span>
          </label>

          <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
            {proyecto && proyecto.nombre}
          </p>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-full px-3">
          {proyecto && (
            <AcordeonObjetivos
              objetivos={proyecto.objetivos}
              titulo={"OBJETIVOS"}
            />
          )}
        </div>
      </div>

      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="fase"
          >
            Fase del proyecto
            <span className="text-red-500 text-xs italic"> *</span>
          </label>
          <div>
            <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
              {proyecto && proyecto.fase}
            </p>
          </div>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="estado"
          >
            Estado del proyecto
            <span className="text-red-500 text-xs italic"> *</span>
          </label>
          <div>
            <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
              {proyecto && proyecto.estado}
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="presupuesto"
          >
            Presupuesto <span className="text-red-500 text-xs italic"> *</span>
          </label>
          <div>
            <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
              {/* {queryProyecto.Proyecto.presupuesto} */}
              {proyecto &&
                new Intl.NumberFormat("es-CO").format(proyecto.presupuesto)}
            </p>
          </div>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="fechaInicio"
          >
            Inicio <span className="text-red-500 text-xs italic"> *</span>
          </label>
          <div>
            <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
              {proyecto && proyecto.fechaInicio.split("T")[0]}
            </p>
          </div>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="fechaFin"
          >
            Finalización <span className="text-red-500 text-xs italic"> *</span>
          </label>
          <div>
            <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
              {proyecto && proyecto.fechaFin.split("T")[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-full px-3">
          <AcordeonLider
            lider={proyecto && proyecto.lider}
            titulo={"RESPONSABLE DEL PROYECTO"}
          />
        </div>
      </div>

      {/* <PrivateComponent roleList={["LIDER","ADMINISTRADOR"]}> */}
      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-full px-3">
          {proyecto && (
            <AcordeonAvances avances={proyecto.avances} titulo={"AVANCES"} />
          )}
        </div>
      </div>
      {/* </PrivateComponent> */}

      {/* <PrivateComponent roleList={["LIDER","ADMINISTRADOR"]}> */}
      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-full px-3">
          {proyecto && (
            <AcordeonInscripciones
              inscripciones={proyecto.inscripciones}
              titulo={"INSCRIPCIONES"}
            />
          )}
        </div>
      </div>
      {/* </PrivateComponent> */}

      {proyecto && proyecto.fase !== "TERMINADO" && (
        <PrivateComponent roleList={["LIDER", "ADMINISTRADOR"]}>
          <div className="-mx-3 md:flex mt-2">
            <div className="md:w-1/4 px-3">
              <button
                className="md:w-full col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600"
                onClick={() => {
                  setActiveVistaProyecto(false);
                }}
              >
                Editar
              </button>
            </div>
          </div>
        </PrivateComponent>
      )}
    </div>
  );
};

//*************************************************************************************
//==================================VISTA FORMULARIO==================================*
//*************************************************************************************
const VistaFormulario = ({ setActiveVistaProyecto, proyecto, datosUsuario}) => {
//----------------------------Tabla objetivos especificos----------------------------
  const TablaObjetivos = ({ objetivosEspecificos }) => {
    const [filasTabla, setFilasTabla] = useState(objetivosEspecificos);

    const agregarNuevoObjEspecificos = (objetivo) => {
      setFilasTabla([...filasTabla, objetivo]);
      console.log("Tabla Objetivos Especificos", filasTabla);
    };

    const eliminarObjEspecificos = (objEspecificosAEliminar) => {
      setFilasTabla(
        filasTabla.filter((v) => v._id !== objEspecificosAEliminar._id)
      );
      //setObjEspecificos([...objEspecificos, objEspecificosAEliminar]); //si se esta utilizando elminiar el objEspecificos del select
    };

    const FilaObjetivos = ({ obj, index, eliminarObjetivo }) => {
      const [objetivo, setObjetivo] = useState(obj);
      useEffect(() => {
        console.log("Fila objetivo ...objetivo", objetivo);
      }, [objetivo]);

      return (
        <tr
          className="flex items-center"
          style={{
            borderBottom: "1px solid #212D5B",
            justifyContent: "center",
          }}
        >
          {/*py-2*/}
          <td hiddden>{index + 1}</td>
          <td>
            <label htmlFor={`descripcion_${index}`}></label>
            <textarea
              type="text"
              id={`ObjetivoEspecifico_${index}`}
              name={`ObjetivoEspecifico_${index}`}
              cols="125"
              className="w-full pl-2 pr-2"
              style={{ justifyContent: "center" }}
              defaultValue={objetivo.descripcion}
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
      <>
        <div className="flex items-center py-2">
          <textarea
            className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 mr-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                console.log(
                  document.getElementById("objetivoEspecífico").value
                );
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
              console.log("fila obejtivos", el);
              return (
                <FilaObjetivos
                  key={el._id}
                  obj={el}
                  index={index}
                  eliminarObjetivo={eliminarObjEspecificos}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  };
//----------------------------Lideres----------------------------
  const {
    loading: loadLideres,
    data: dataLideres,
    error: errorLideres,
  } = useQuery(obtenerUsuariosPorFiltro, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  useEffect(() => {
    //console.log("los lideres",dataLideres);
    if (dataLideres) {
      const listaUser = {};
      dataLideres.Usuarios.forEach((usuario) => {
        listaUser[usuario._id] = usuario.nombre + " " + usuario.apellido;
      });
      //setListaUsuarios(listaUser);
    }
  }, [dataLideres]);

  //----------------------------Actualizacion proyecto----------------------------
  //const { userData } = useUser();
  const [edit, setEdit] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const [
    editProyecto,
    {
      data: mutationDataUpdate,
      loading: mutationLoadingUpdate,
      error: mutationErrorUpdate,
    },
  ] = useMutation(editarProyecto);

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

    if (datosUsuario.rol === "LIDER") {
      if (Objetivos.length > 1) {
        editProyecto({
          variables: {
            _id: proyecto._id,
            nombre: nuevoProyecto.nombre,
            presupuesto: parseFloat(nuevoProyecto.presupuesto),
            fechaInicio: proyecto.fechaInicio,
            fechaFin: proyecto.fechaFin,
            estado: proyecto.estado,
            fase: proyecto.fase,
            lider: proyecto.lider._id,
            objetivos: Object.values(Objetivos),
          },
        });
      } else {
        toast.error(
          "El proyecto no fue editado, posible causa los objetivos especificos"
        );
      }
    }

    if (datosUsuario.rol === "ADMINISTRADOR") {
      editProyecto({
        variables: {
          _id: proyecto._id,
          nombre: proyecto.nombre,
          presupuesto: parseFloat(proyecto.presupuesto),
          fechaInicio: proyecto.fechaInicio,
          fechaFin: proyecto.fechaFin,
          estado: proyecto.estado,
          fase: proyecto.fase,
          lider: nuevoProyecto.lider
        },
      });
    }
  };

  useEffect(() => {
    console.log("Mutación actualización", mutationDataUpdate);
    if (mutationDataUpdate) {
      toast.success("El proyecto fue editado");
      setActiveVistaProyecto(true);
    }
  }, [mutationDataUpdate]);

  if (loadLideres) return <div>...Construyendo formulario</div>;
//----------------------------Formulario----------------------------
  return (
    <div className="container mx-auto items-center justify-center">
      <form ref={form} onSubmit={submitForm}>
        <div class="box-border h-full w-100 p-4 border-4 border-gray">
          <div className="-mx-3 md:flex mt-2">
            <div className="md:w-full px-3">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="application-link"
              >
                Nombre del proyecto
                <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <PrivateComponent roleList={["LIDER"]}>
              <input
                className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="nombre"
                type="text"
                defaultValue={proyecto.nombre}
                placeholder="Escribe aquí el Nombre del Proyecto"
                required={true}
              />
              </PrivateComponent>
              <PrivateComponent roleList={["ADMINISTRADOR"]}>
              <span className="block appearance-none w-full bg-gray-200 text-black py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {proyecto.nombre}
              </span>
              </PrivateComponent>
            </div>
          </div>

          <PrivateComponent roleList={["LIDER"]}>
            <>
              <div className="-mx-3 md:flex mt-2">
                <div className="md:w-full px-3">
                  <label
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="application-link"
                  >
                    Objetivo general
                    <span className="text-red-500 text-xs italic"> *</span>
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="objetivoGeneral"
                    defaultValue={proyecto.objetivos[0].descripcion}
                    placeholder="Escribe aquí el Objetivo General del proyecto"
                    required={true}
                  />
                </div>
              </div>

              <div className="-mx-3 md:flex mt-2">
                <div className="md:w-full px-3">
                  <label
                    className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                    for="application-link"
                  >
                    Objetivos especificos
                    <span className="text-red-500 text-xs italic"> *</span>
                  </label>
                  {/* proyecto.objetivos.filter((obj)=>obj.tipo==="ESPECIFICO") */}
                  <TablaObjetivos
                    objetivosEspecificos={proyecto.objetivos.filter(
                      (obj) => obj.tipo === "ESPECIFICO"
                    )}
                  />
                </div>
              </div>
            </>
          </PrivateComponent>

          <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <div className="-mx-3 md:flex mt-2">
            <div className="md:w-full px-3">
              {proyecto && (
                <AcordeonObjetivos
                  objetivos={proyecto.objetivos}
                  titulo={"OBJETIVOS"}
                />
              )}
            </div>
          </div>

            <div className="-mx-3 md:flex mt-2">
              <div className="md:w-full px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  for="application-link"
                >
                  Lider del proyecto
                  <span className="text-red-500 text-xs italic"> *</span>
                </label>
                {/* <span className="block appearance-none w-full bg-gray-200 text-black py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {proyecto.lider.nombre + " " + proyecto.lider.apellido}
              </span> */}
                <select
                  name="lider"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  defaultValue={proyecto.lider._id}
                  required={true}
                >
                  <option disabled value="">
                    Seleccione un lider
                  </option>
                  {dataLideres &&
                    dataLideres.Usuarios.map((el) => {
                      if (el.estado === "AUTORIZADO") {
                        var selected = "";
                        if (el._id == proyecto.lider._id) {
                          selected = "selected";
                        }
                        return (
                          <option
                            key={nanoid()}
                            value={el._id}
                            selected={selected}
                          >{`${el.nombre} ${el.apellido}`}</option>
                        );
                      }
                    })}
                </select>
              </div>
            </div>
          </PrivateComponent>

          {/* <div className="-mx-3 md:flex mt-2 hidden" hidden>
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="fase"
              >
                Fase del proyecto
                <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <div>
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-2">
                  {proyecto && proyecto.fase}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="estado"
              >
                Estado del proyecto
                <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <div>
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-2">
                  {proyecto && proyecto.estado}
                </p>
              </div>
            </div>
          </div> */}

          <div className="-mx-3 md:flex mt-2">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="presupuesto"
              >
                Presupuesto{" "}
                <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <div>
              <PrivateComponent roleList={["LIDER"]}>
                <input
                  className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="presupuesto"
                  type="number"
                  min={1}
                  defaultValue={proyecto.presupuesto}
                  placeholder="Ej: 2000000"
                  required={true}
                />
                </PrivateComponent>
                <PrivateComponent roleList={["ADMINISTRADOR"]}>
                <span className="block appearance-none w-full bg-gray-200 text-black py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                { new Intl.NumberFormat("es-CO").format(proyecto.presupuesto)}
              </span>
              </PrivateComponent>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="fechaInicio"
              >
                Inicio <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <div>
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
                  {proyecto && proyecto.fechaInicio.split("T")[0]}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 px-3">
              <label
                className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                for="fechaFin"
              >
                Finalización{" "}
                <span className="text-red-500 text-xs italic"> *</span>
              </label>
              <div>
                <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
                  {proyecto && proyecto.fechaFin.split("T")[0]}
                </p>
              </div>
            </div>
          </div>

          <PrivateComponent roleList={["LIDER", "ADMINISTRADOR"]}>
            <div className="-mx-3 md:flex mt-2">
              <>
                <div className="md:w-1/4 px-3">
                  <button
                    type="submit"
                    className="md:w-full col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-green-600"
                  >
                    Guardar
                  </button>
                </div>
                <div className="md:w-1/4 px-3">
                  <button
                    className="md:w-full col-span-2 py-3 fondo1 font-bold  text-white p-2 rounded-full shadow-md hover:bg-red-600"
                    onClick={() => {
                      setEdit(!edit);
                      setActiveVistaProyecto(true);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            </div>
          </PrivateComponent>
        </div>
      </form>
    </div>
  );
};

export default VieditProyectos;