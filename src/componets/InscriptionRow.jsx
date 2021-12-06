import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client'; 
import { aprobarInscripcion } from '../graphql/Incripciones/Mutations.js';


function ReadOnlyInscriptionRow({ user, onEdit, onCancel, setOpenDialog }) {
  return (
    <tr>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user._id.slice(20)}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreProyecto}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreEstudiante}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaIngreso.slice(0, -14)}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaEgreso}</td>

      <td className={
        user.estado === 'ACEPTADO' 
          ? 'flex justify-center my-3 px-4 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
        :user.estado === 'PENDIENTE' 
          ?('flex justify-center my-3 px-6 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
          :'flex justify-center my-3 px-4 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{user.estado}
        </td>


      <td className="px-3 py-3 text-center bg-white text-sm w-44">
        <button type="button" title="Editar" onClick={onEdit}>
            <i className="fas fa-user-edit hover:text-yellow-600"></i>
        </button>
        {/* <button type="button" title="Eliminar" onClick={() => setOpenDialog(true)}>
            <i className="fas fa-trash-alt hover:text-yellow-600"></i>
        </button> */}
        </td>
    </tr>
  );
}


function InscriptionRowForm(props) {
  const { onOk, onCancel, user, setOpenDialog } = props;
  const [info, setInfo] = useState({ ...user });

  const handleChange = (fieldName) => (e) => {
    setInfo((currentInfo) => ({
      ...currentInfo,
      [fieldName]: e.target.value
    }));
  };

  const [ aprobarInscrip , { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(aprobarInscripcion);

  const onSubmit = () => {
    //console.log(typeof(info._id))
    onOk(info);
    aprobarInscrip({ 
      variables: { aprobarInscripcionId: info._id }
    })
  };

  const reject = () => {
    console.log("Estoy en reject")
    setOpenDialog(true)
    onOk(info);
  }
  

  return (
    <tr>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user._id.slice(18)}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreProyecto}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreEstudiante}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaIngreso}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaEgreso}</td>
      <td className={
        user.estado === 'ACEPTADO' 
          ? 'flex justify-center my-3 px-4 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
        :user.estado === 'PENDIENTE' 
          ?('flex justify-center my-3 px-6 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
          :'flex justify-center my-3 px-1 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{user.estado}
        </td>
      <td className="px-3 py-3 text-center bg-white text-sm w-44">
          <button className="mr-5" type="button" title="Aceptar inscripción"  onClick={onSubmit}>
            <i className="fas fa-check hover:text-green-600"></i>
          </button>
          <button className="ml-5" type="button" title="Rechazar inscripción" onClick={reject}>
            <i className="fas fa-skull-crossbones hover:text-red-700"></i>
          </button>
      </td>
      
     
    </tr>
  );
}

export default function InscriptionRow(props) {
  const { isEditable } = props;

  if (!isEditable) {
    return <ReadOnlyInscriptionRow {...props} />;
  }

  return <InscriptionRowForm {...props} />;
}
