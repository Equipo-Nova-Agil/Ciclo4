import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useUser } from "context/userContext";
import { obtenerIncripciones } from "../../../graphql/Incripciones/Queries";
import { Dialog } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import InscriptionRow from "./InscriptionRow";
import { rechazarInscripcion } from "../../../graphql/Incripciones/Mutations";

const HEADERS = [
  "Id",
  "Proyecto",
  "Estudiante",
  "Fecha Ingreso",
  "Fecha Egreso",
  "Estado",
  "Acciones",
];



const Inscripciones = () => {
  const { data, loading, error } = useQuery(obtenerIncripciones);
  const arrData = Array();
const { userData } = useUser();

console.log("DATOS FILTRO")
if (data) {
  data.Inscripciones.filter(
    (datos) => userData.rol==="ESTUDIANTE" ? (datos.estudiante._id === userData._id):(datos.proyecto.lider._id === userData._id) //"61bd85abf851a8d5d159116a"
  ).map((datos) => 

  arrData.push( {
    _id: datos._id,
    estado: datos.estado,
    nombreEstudiante: datos.estudiante.nombre + " "+ datos.estudiante.apellido,
    fechaIngreso: datos.fechaIngreso,
    fechaEgreso: datos.fechaEgreso,
    nombreProyecto: datos.proyecto.nombre,
  })
  );
}

console.log(arrData);

  const [edit, setEdit] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [copyData, setCopyData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState(arrData);

  const handleEditChange = (index, value) => () => {
    setEdit((currentEditList) =>
      currentEditList.map((item, idx) => {
        if (index !== idx) {
          return item;
        }
        return value;
      })
    );
  };

  // TRAER LA MUTACIÓN DE RECHAZAR INSCRIPCION ACÁ Y ACTIVARLA CUANDO EN EL DIALOG SE LE DE OK
  const [
    rechazararInscrip,
    {
      data: mutationDataRechazar,
      loading: mutationLoadingRechazar,
      error: mutationErrorRechazar,
    },
  ] = useMutation(rechazarInscripcion);

  const inscripcionRechazada = () => {
    rechazararInscrip({
      variables: { rechazarInscripcionId: selectedInfo._id },
    });
  };

  const onReject = (info) => {
    setOpenDialog(true);
    setSelectedInfo(info);
  };

  useEffect(() => {
    if (mutationDataRechazar) {
      setBusqueda("");
      toast.success("Inscripción Rechazada Correctamente", 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      });
    }
  }, [mutationDataRechazar]);

  useEffect(() => {
    if (mutationErrorRechazar) {
      toast.error("Error Rechazando Inscripción", 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      });
    }
  }, [mutationErrorRechazar]);

  const handleEditInscription = (index) => (newInfo) => {
    setCopyData((currentCopyData) =>
      currentCopyData.map((item, idx) => {
        if (index !== idx) {
          return item;
        }

        return newInfo;
      })
    );
    setBusqueda("");
    handleEditChange(index, false)();
  };

  const resetEdit = () => {
    setEdit((currentEdit) => Array(currentEdit.length).fill(false));
  };

  useEffect(() => {
    if (!openDialog) {
      resetEdit();
    }
  }, [openDialog]);

  useEffect(() => {
    if (data) {
      const updatedCopyData = arrData.map((i) => ({
        _id: i._id,
        estado: i.estado,
        nombreEstudiante: i.nombreEstudiante,
        fechaIngreso: i.fechaIngreso,
        fechaEgreso: i.fechaEgreso,
        nombreProyecto: i.nombreProyecto,
      }));
      setEdit(updatedCopyData.map(() => false));
      setCopyData(updatedCopyData);
    }
  }, [data]);

 useEffect(() => {
    if (data)
    {
      const filterCopyData = arrData.filter((inscripciones) => {
        return JSON.stringify(inscripciones)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      });
      const updatedCopyData = filterCopyData.map((i) => ({
        _id: i._id,
        estado: i.estado,
        nombreEstudiante: i.nombreEstudiante,
        fechaIngreso: i.fechaIngreso,
        fechaEgreso: i.fechaEgreso,
        nombreProyecto: i.nombreProyecto,
      }));
      setEdit(updatedCopyData.map(() => false));
      setCopyData(updatedCopyData);
    }
  }, [busqueda]);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold">Cargando...</h1>
        <ReactLoading type="bars" color="#11172d" height={467} width={175} />
      </div>
    );
  }


  return (
    <div className='h-full w-full'>
      <div className="flex h-full w-full flex-col items-center justify-start p-8">
        <div className="flex flex-col">
          <h2 className="text-3xl pt-8 pb-10 font-extrabold text-gray-800">
            Administración Inscripciones
          </h2>
        </div>

        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
            {/* Cuadro busqueda */}
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
            {/* Tabla inscripciones */}
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="">
                  <thead>
                    <tr>
                      {HEADERS.map((headerName, index) => (
                        <th
                          key={`inscriptions-header-${index}`}
                          className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44"
                        >
                          {headerName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {copyData.map((item, index) => (
                      <InscriptionRow
                        key={`inscriptions-user-row-${item._id}`}
                        isEditable={edit[index]}
                        user={item}
                        onEdit={handleEditChange(index, !edit[index])}
                        onOk={handleEditInscription(index)}
                        //onCancel={handleEditChange(index, false)}
                        onCancel={handleEditChange(index, !edit[index])}
                        onReject={onReject}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog}>
        <div className="p-8 flex flex-col">
          <h1 className="text-gray-900 text-2xl font-bold">
            ¿Está seguro de querer rechazar la inscripción?
          </h1>
          <div className="flex w-full items-center justify-center my-4">
            <button
              onClick={() => {
                inscripcionRechazada();
                setOpenDialog(false);
              }}
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
      <ToastContainer />
    </div>
  );
};

export default Inscripciones;