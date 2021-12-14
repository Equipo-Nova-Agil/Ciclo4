import React, {useEffect, useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'; 
import { obtenerIncripciones } from '../../../graphql/Incripciones/Queries';
import { Dialog} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import InscriptionRow from './InscriptionRow'
import { rechazarInscripcion } from '../../../graphql/Incripciones/Mutations';


const HEADERS = [
  "Id",
  "Proyecto",
  "Estudiante",
  "Fecha Ingreso",
  "Fecha Egreso",
  "Estado", 
  "Acciones"
];

const Inscripciones = () => {
  const {data, loading, error} = useQuery(obtenerIncripciones)
  const [edit, setEdit] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [copyData, setCopyData] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)

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
  const [ rechazararInscrip , { data: mutationDataRechazar, loading: mutationLoadingRechazar, error: mutationErrorRechazar }] = useMutation(rechazarInscripcion);

  const inscripcionRechazada = () => {
    rechazararInscrip({ 
      variables: { rechazarInscripcionId: selectedInfo._id }
    })
  
  }

  const onReject = (info) => {
    setOpenDialog(true)
    setSelectedInfo(info)
  }

  useEffect(() => {
    if (mutationDataRechazar){
      toast.success("La inscripción se rechazó correctamente")
    }
  }, [mutationDataRechazar])

  useEffect(() => {
    if (mutationErrorRechazar){
      toast.error("Hay un error rechazando la inscripción")
    }
  }, [mutationErrorRechazar])


  const handleEditInscription = (index) => (newInfo) => {
    setCopyData((currentCopyData) =>
      currentCopyData.map((item, idx) => {
        if (index !== idx) {
          return item;
        }

        return newInfo;
      })
    );

    handleEditChange(index, false)();
  };

  const resetEdit = () => {
    setEdit((currentEdit) => Array(currentEdit.length).fill(false))
  }

  useEffect(() => {
    if (!openDialog){
      resetEdit()
    }
  }, [openDialog])


  useEffect(() => {
    if (data){
      const updatedCopyData = data.Inscripciones.map((i) => ({
        _id: i._id,
        estado: i.estado,
        nombreEstudiante: i.estudiante.nombre,
        fechaIngreso: i.fechaIngreso,
        fechaEgreso: i.fechaEgreso,
        nombreProyecto: i.proyecto.nombre,
      }))
      setEdit(updatedCopyData.map(() => false))
      setCopyData(updatedCopyData)
    }
  }, [data]);

  if (loading) {
    return (
      <div>
          <h1 className='text-3xl font-extrabold'>Cargando...</h1>
            <ReactLoading type='bars' color='#11172d' height={467} width={175} />
      </div>
    )
  } 

  return (
    <div>
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
        <div className='flex flex-col'>
            <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
                Administración Inscripciones
            </h2>
        </div>
    </div>
    <table>
      <thead>
        <tr>
          {HEADERS.map((headerName, index) => (
            <th key={`inscriptions-header-${index}`} className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">{headerName}</th>

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
    <Dialog open={openDialog}>
      <div className='p-8 flex flex-col'>
      <h1 className='text-gray-900 text-2xl font-bold'>
          ¿Está seguro de querer rechazar la inscripción?
      </h1>
      <div className='flex w-full items-center justify-center my-4'>
          <button
          onClick={() => {inscripcionRechazada();setOpenDialog(false);}}
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
  <ToastContainer />
    </div>
  );


}


export default Inscripciones
