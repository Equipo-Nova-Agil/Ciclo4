import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "@apollo/client";
import { obtenerProyecto } from "graphql/Proyectos/Queries";
import { editarProyecto } from "graphql/Proyectos/Mutations";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enum";
import { obtenerUsuariosPorRol } from "graphql/Usuarios/Queries";
import { obtenerAvancesPorProyecto } from "graphql/Avances/Queries";
import { obtenerIncripcionesPorProyecto } from "graphql/Incripciones/Queries";

import Input from "componets/Input";
import ButtonLoading from "componets/ButtonLoading";
import ReactLoading from "react-loading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { Dialog } from "@mui/material";

import DropDown from "componets/Dropdown";
import PrivateComponent from "componets/PrivateComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const AccordionStyled = styled((props) => <Accordion {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#212D5B",
  })
);
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "#212D5B",
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  backgroundColor: "#ccc",
}));

//PANEL PRINCIPAL
const ViewProyectos = (vistaProyecto) => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const [activeVistaFormulario, setActiveVistaFormulario] = useState(false);
  const [objetivosEspecificos, setObjetivosEspecificos] = useState([]);

  const [tituloVentana, setTituloVentana] = useState("")
  const [tituloBoton, setTituloBoton] = useState("Editar");

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
  } = useQuery(obtenerUsuariosPorRol, { variables: { rol: "LIDER" } });

  //Consulta Proyecto...Proyecto
  const {
    data: queryProyecto,
    error: queryErrorProyecto,
    loading: queryProyectoLoading,
  } = useQuery(obtenerProyecto, { variables: { _id } }); //{_id}

  useEffect(() => {
    if (activeVistaFormulario) {
      console.log("Vista formulario");
      setTituloVentana("VISTA FORMULARIO");
    } else {
      console.log("Vista proyecto");
      setTituloVentana("VISTA PROYECTO");
    }
  }, [activeVistaFormulario]);

  useEffect(() => {
    console.log("Datos Proyecto Servidor", queryProyecto);
    // console.log("El proyecto: ", queryProyecto);
    // console.log("Objetivos ", queryProyecto.Proyecto.objetivos);
    // console.log("Avances ", queryProyecto.Proyecto.avances);
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

  if (
    queryProyectoLoading &&
    queryAvancesLoading &&
    queryInscripcionesLoading &&
    queryLideresLoading
  ) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold">Cargando proyecto...</h1>
        <ReactLoading type="bars" color="#11172d" height={467} width={175} />
      </div>
    );
  }

  if (queryProyecto && queryAvances && queryInscripciones && queryLideres) {
    //DATOS DEL PROYECTO
    console.log("id proyecto", _id);
    console.log("Datos del proyecto ", queryProyecto);
    console.log("Avances del proyecto ", queryAvances);
    console.log("Inscripciones en el proyecto ", queryInscripciones);
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
              {queryProyecto && queryProyecto.Proyecto.nombre}
            </p>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            {queryProyecto && (
              <AcordeonObjetivos
                objetivos={queryProyecto.Proyecto.objetivos}
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
                {queryProyecto && queryProyecto.Proyecto.fase}
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
                {queryProyecto && queryProyecto.Proyecto.estado}
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
              Presupuesto{" "}
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <div>
              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
                {/* {queryProyecto.Proyecto.presupuesto} */}
                {queryProyecto &&
                  new Intl.NumberFormat("es-CO").format(
                    queryProyecto.Proyecto.presupuesto
                  )}
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
                {queryProyecto &&
                  queryProyecto.Proyecto.fechaInicio.split("T")[0]}
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
                {queryProyecto && queryProyecto.Proyecto.fechaFin.split("T")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <AcordeonLider
              lider={queryProyecto && queryProyecto.Proyecto.lider}
              titulo={"RESPONSABLE DEL PROYECTO"}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            {queryAvances && queryAvances.FiltrarAvances && (
              <AcordeonAvances
                losavances={queryAvances.FiltrarAvances}
                titulo={"AVANCES"}
              />
            )}
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            {queryProyecto && (
              <AcordeonInscripciones
                inscripciones={queryInscripciones.InscripcionesPorProyecto}
                titulo={"INTEGRANTES"}
              />
            )}
          </div>
        </div>

        <div className="-mx-3 md:flex mt-2">
          <div className="md:w-1/4 px-3">
            <button className="md:w-full col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600">
              {tituloBoton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//==================================VISTAS ==================================
//VISTA PROYECTO
const vistaProyecto = ({ tituloBoton, proyecto }) => {
  console.log("Vista proyecto ", proyecto);
  return (
    <div className="container mx-auto">
      <div>
        <Link to="/admin/proyectos">
          <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
        </Link>
        <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
          Vista proyecto
        </h1>
      </div>
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
              {proyecto.nombre}
            </p>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <AcordeonObjetivos
              objetivos={proyecto.objetivos}
              titulo={"OBJETIVOS"}
            />
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
                {proyecto.fase}
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
                {proyecto.estado}
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
              Presupuesto{" "}
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <div>
              <p className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3">
                {/* {queryProyecto.Proyecto.presupuesto} */}
                {new Intl.NumberFormat("es-CO").format(proyecto.presupuesto)}
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
                {proyecto.fechaInicio.split("T")[0]}
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
                {proyecto.fechaFin.split("T")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <AcordeonLider
              lider={proyecto.lider}
              titulo={"RESPONSABLE DEL PROYECTO"}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <AcordeonObjetivos
              objetivos={proyecto.objetivos}
              titulo={"AVANCES"}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <AcordeonObjetivos
              objetivos={proyecto.objetivos}
              titulo={"INTEGRANTES"}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mt-2">
          <div className="md:w-1/4 px-3">
            <button className="md:w-full col-span-2 py-3 fondo1 font-bold  text-gray-300 p-2 rounded-full shadow-md hover:bg-gray-600">
              {tituloBoton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//VISTA FORMULARIO PROYECTO
const vistaFormulario = ({ proyecto }) => {
  return (
    <form>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="application-link"
            >
              Nombre del proyecto
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <input
              className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3"
              id="nombre"
              type="text"
              placeholder="Ingrese titulo del proyecto"
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="objetivoGeneral"
            >
              Objetivo general
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <textarea
              className="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3"
              id="objetivoGeneral"
              placeholder="Objetivo del proyecto"
              requerid
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-full px-3">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="objetivoGeneral"
            >
              Objetivos especificos
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            {/* <TablaObjetivos
                objetivosEspecificos={objetivosEspecificos}
              ></TablaObjetivos> */}
            <AcordeonObjetivos
              objetivos={proyecto.objetivos}
              titulo={"OBJETIVOS"}
            />
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
              <select
                className="w-full bg-gray-200 border border-gray-200 text-black py-2 px-4 pr-8 mb-3 rounded"
                id="fase"
                defaultValue={0}
                requerid
              >
                <option disabled value={0}>
                  Seleccione una fase para el proyecto
                </option>
                <option>Iniciado</option>
                <option>En Desarrollo</option>
                <option>Terminado</option>
              </select>
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
              <select
                className="w-full bg-gray-200 border border-gray-200 text-black py-2 px-4 pr-8 mb-3 rounded"
                id="estado"
                defaultValue={0}
                requerid
              >
                <option disabled value={0}>
                  Seleccione un estado para el proyecto
                </option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="-mx-3 md:flex mb-3">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="presupuesto"
            >
              Presupuesto{" "}
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <div>
              <input
                type="number"
                min={1}
                id="presupuesto"
                className="w-full bg-gray-200 border border-gray-200 text-black py-2 px-4 pr-8 mb-3 rounded"
                placeholder="2000000"
                requerid
              ></input>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="fechaInicio"
            >
              Fecha de inicio{" "}
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <div>
              <input
                type="date"
                className="w-full bg-gray-200 border border-gray-200 text-black py-2 px-4 pr-8 mb-3 rounded"
                id="fechaInicio"
                requerid
              ></input>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="uppercase tracking-wide text-black text-xs font-bold mb-2"
              for="fechaFin"
            >
              Fecha de finalización{" "}
              <span className="text-red-500 text-xs italic"> *</span>
            </label>
            <div>
              <input
                type="date"
                className="w-full bg-gray-200 border border-gray-200 text-black py-2 px-4 pr-8 mb-3 rounded"
                id="fechaFin"
                requerid
              ></input>
            </div>
          </div>
        </div>

        <div className="-mx-3 md:flex mt-2">
          <div className="md:w-full px-3">
            <button className="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
              Button
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

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
    return "no se han cargado objetivos";
  }
};
//AVANCES
const AcordeonAvances = ({ losavances, titulo }) => {
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
            {losavances ? (
              losavances.length > 0 ? (
                losavances.map((elavan) => {
                  return (
                    <p className="w-full bg-gray-200 text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                      {elavan.descripcion}
                      <br />
                      <span>
                        By - {elavan.creadoPor.nombre}{" "}
                        {elavan.creadoPor.apellido}
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
                      {inscripcion.estudiante.apellido}
                      <br />
                      <span>By - {inscripcion.correo}</span>
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

export default ViewProyectos;