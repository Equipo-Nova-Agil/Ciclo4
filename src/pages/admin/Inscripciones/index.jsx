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
      console.log("mutationDataRechazar:", mutationDataRechazar)
    }
  }, [mutationDataRechazar])

  useEffect(() => {
    if (mutationErrorRechazar){
      toast.error("Hay un error rechazando la inscripción")
      console.log("mutationErrorRechazar:", mutationErrorRechazar)
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
      console.log('Datos inscripciones Servidor', data);

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


// const Inscripciones = () => {

//     const {data, loading, error} = useQuery(obtenerIncripciones)
//     const [edit, setEdit] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);

//     console.log(data)

//     const [infoInscripción, setInfoInscripción] = useState({
//         _id: Inscripciones._id,
//         estado: Inscripciones.estado,
//         // estudiante: Inscripciones.estudiante.nombre,
//         fechaIngreso: Inscripciones.fechaIngreso,
//         fechaEgreso: Inscripciones.fechaEgreso,
//         // proyecto: Inscripciones.proyecto.nombre,
//     });

//     const [copyData, setCopyData] = useState([])
    

//     useEffect(() => {
//       if (data){
//         console.log('Datos inscripciones Servidor', data);
//         // JSON.parse(JSON.stringify(data.Inscripciones))
//         const updatedCopyData = data.Inscripciones.map((i) => ({
//           _id: i._id,
//           estado: i.estado,
//           nombreEstudiante: i.estudiante.nombre,
//           fechaIngreso: i.fechaIngreso,
//           fechaEgreso: i.fechaEgreso,
//           nombreProyecto: i.proyecto.nombre,
//         }))
//         setEdit(updatedCopyData.map(() => false))
//         setCopyData(updatedCopyData)
//       }
//     }, [data]);
  
//     useEffect(() => {
//       if (error) {
//         toast.error('Error Consultando Inscripciones');
//       }
//     }, [error]);
  
//     if (loading) return <div>
//                           <h1 className='text-3xl font-extrabold'>Cargando...</h1>
//                           <ReactLoading type='bars' color='#11172d' height={467} width={175} />
//                         </div>;

//     const prueba = (i) => {
//         console.log("hola", i.estudiante.nombre)
//     }

//     const setRow = (index, fieldName) => (e) => {
//       e.preventDefault()
//       e.stopPropagation()
//       const currentCopy = copyData
//       currentCopy[index][fieldName] = e.target.value
//       console.log({index, fieldName, e, currentCopy})
//       setCopyData(currentCopy)
//     }

//     const handleEditChange = (index, newValue) => () => {
//       setEdit((currentEdit) => currentEdit.map((value, idx) => {
//         return index !== idx ?value :newValue
//       }))
//     }

//     console.log(copyData)
                        
//     return (
//         <div>
//         <div className='flex h-full w-full flex-col items-center justify-start p-8'>
//             <div className='flex flex-col'>
//                 <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
//                     Administración Inscripciones
//                 </h2>
//             </div>
//         </div>
//       <body className="antialiased font-sans bg-white">
//         <div className="container mx-auto px-4 sm:px-8">
//           <div className="py-8">
//             <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//               <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                
//                 <table className="min-w-full leading-normal">
//                   <thead>
//                     <tr>

//                       <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                         Estado
//                       </th>

//                       <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                         Estudiante
//                       </th>

//                       <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
//                         Fecha Ingreso
//                       </th>

//                       <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-44">
//                       Fecha Egreso
//                       </th>

//                       <th className="px-3 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-32">
//                         Proyecto
//                       </th>

//                       <th className="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-36">
//                         Id
//                       </th>
//                       <th className="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-center text-xs font-extrabold text-gray-600 uppercase tracking-wider w-36">
//                         Acciones
//                       </th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     {copyData.map((i, index) => {
//                       console.log({edit, index, i})
//                       if (!edit[index]){
//                         return (
//                           <tr key={i._id}>
//                           <td className="px-3 py-3  bg-white text-sm text-center w-44">{i.estado}</td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">{i.nombreEstudiante}</td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">{i.fechaIngreso}</td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">{i.fechaEgreso}</td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">{i.nombreProyecto}</td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">{i._id}</td>
//                             <td className="flex px-3 py-3 justify-evenly bg-white text-sm w-44">
//                                 <button type="button" title="Editar" onClick={handleEditChange(index, true)}>
//                                     <i className="fas fa-user-edit hover:text-yellow-600"></i>
//                                 </button>
//                                 <button type="button" title="Eliminar" onClick={() => setOpenDialog(true)}>
//                                     <i className="fas fa-trash-alt hover:text-yellow-600"></i>
//                                 </button>
//                             </td>
//                             <Dialog open={openDialog}>
//                                 <div className='p-8 flex flex-col'>
//                                 <h1 className='text-gray-900 text-2xl font-bold'>
//                                     ¿Está seguro de querer eliminar la inscripción?
//                                 </h1>
//                                 <div className='flex w-full items-center justify-center my-4'>
//                                     <button
//                                     onClick={() => console.log("hi")}
//                                     className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
//                                     >
//                                     Sí
//                                     </button>
//                                     <button
//                                     onClick={() => setOpenDialog(false)}
//                                     className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
//                                     >
//                                     No
//                                     </button>
//                                 </div>
//                                 </div>
//                             </Dialog>
//                           </tr>
//                         )
//                       }
//                        return (
//                          <tr key={i._id}>
//                            <td className="px-3 py-3  bg-white text-sm text-center w-44">
                                
//                                 <select
//                                 className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                                 name='estado'
//                                 required
//                                 onChange ={setRow(index, "estado")}
//                                 defaultValue={i.estado}>
//                                     <option disabled value={0}>
//                                     Seleccione Rol
//                                     </option>
//                                     <option value="ACEPTADO">Aceptado</option>
//                                     <option value="RECHAZADO">Rechazado</option>
//                                     <option value="PENDIENTE">Pendiente</option>
//                                 </select>
                            
//                             </td>
                  
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">
//                               <input 
//                               type="text" 
//                               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                               value={i.nombreEstudiante}
//                               onChange={setRow(index, "nombreEstudiante")}
//                               />
//                             </td>
                  
//                             {/* <td className="px-3 py-3  bg-white text-sm text-center w-44">
//                               <input 
//                               type="text" 
//                               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                               value={i.fechaIngreso}
//                               onChange={(e) => setInfoInscripción({ ...infoInscripción, fechaIngreso: e.target.value })}
//                               />
//                             </td>
                  
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">
//                               <input 
//                               type="text" 
//                               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                               value={i.fechaEgreso}
//                               onChange={(e) => setInfoInscripción({ ...infoInscripción, fechaEgreso: e.target.value })}
//                               />
//                             </td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">
//                               <input 
//                               type="text" 
//                               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                               value={i.nombreProyecto}
//                               onChange={(e) => setInfoInscripción({ ...infoInscripción, proyecto: e.target.value })}
//                               />
//                             </td>
//                             <td className="px-3 py-3  bg-white text-sm text-center w-44">
//                               <input 
//                               type="text" 
//                               className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
//                               value={i._id}
//                               onChange={(e) => setInfoInscripción({ ...infoInscripción, _id: e.target.value })}
//                               />
//                             </td>
//                             <td className="flex px-3 py-3 justify-evenly bg-white text-sm w-44">
//                             <button type="button" title="Editar"  onClick={handleEditChange(index, !edit[index])}>
//                             <i className="fas fa-check hover:text-green-600"></i>
//                             </button>
//                             <button type="button" title="Cancelar" onClick={handleEditChange(index, false)}>
//                             <i className="fas fa-ban hover:text-red-700"></i>
//                             </button>
//                             </td> */}
//                          </tr>
//                        )
//                     })}                                 
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body> 
//     </div>
          
//     )   
    
    
// }

export default Inscripciones
