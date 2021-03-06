import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client'; 
import { aprobarInscripcion } from '../../../graphql/Incripciones/Mutations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateComponent from "componets/PrivateComponent";


function ReadOnlyInscriptionRow({ user, onEdit, onCancel }) {

  return (
    <tr>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user._id.slice(18)}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.nombreProyecto}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.nombreEstudiante}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.fechaIngreso && user.fechaIngreso.slice(0, -14)}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.fechaEgreso && user.fechaEgreso.slice(0, -14)}</td>

      <td className={
        user.estado === 'ACEPTADO' 
          ? 'flex justify-center my-3 px-4 py-2 border-b border-gray-300 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
        :user.estado === 'PENDIENTE' 
          ?('flex justify-center my-3 px-6 py-2 border-b border-gray-300 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
          :'flex justify-center my-3 px-4 py-2 border-b border-gray-300 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{user.estado}
        </td>

        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
      <td className="px-3 py-3 text-center bg-white text-sm w-44">
        <button type="button" title="Editar" onClick={onEdit}>
            <i className="fas fa-user-edit hover:text-yellow-600"></i>
        </button>
        </td>
        </PrivateComponent>
        {/* <ToastContainer /> */}
    </tr>
  );
}


function InscriptionRowForm(props) {
  const { onOk, onCancel, user, onReject } = props;
  const [info, setInfo] = useState({ ...user });
  const handleChange = (fieldName) => (e) => {
    setInfo((currentInfo) => ({
      ...currentInfo,
      [fieldName]: e.target.value
    }));
  };

  const [ aprobarInscrip , { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(aprobarInscripcion);


  const onSubmit = () => {
    onOk(info);
    aprobarInscrip({ 
      variables: { aprobarInscripcionId: info._id }
    })
    toast.success("Inscripci??n Aprobada Correctamente", 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    });
  };

  useEffect(() => {
    if (mutationData){
      toast.success("Inscripci??n Aprobada Correctamente", 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      });
    }
  }, [mutationData])

  useEffect(() => {
    if (mutationError){
      toast.error("Error Aprobando Inscripci??n", 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      });
    }
  }, [mutationError])



  return (
    <tr>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user._id.slice(18)}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.nombreProyecto}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.nombreEstudiante}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.fechaIngreso && user.fechaIngreso.slice(0, -14)}</td>
      <td className="px-3 py-3 border-b border-gray-300 bg-white text-sm text-center w-44">{user.fechaEgreso && user.fechaEgreso.slice(0, -14)}</td>
      <td className={
        user.estado === 'ACEPTADO' 
          ? 'flex justify-center my-3 px-4 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'
        :user.estado === 'PENDIENTE' 
          ?('flex justify-center my-3 px-6 py-2 leading-tight bg-yellow-500 text-white text-center text-sm font-semibold opacity-80 rounded-full')
          :'flex justify-center my-3 px-1 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>{user.estado}
        </td>
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
          <td className="px-3 py-3 text-center bg-white text-sm w-44">
              <button className="mr-5" type="button" title="Aceptar inscripci??n"  onClick={onSubmit}>
                <i className="fas fa-check hover:text-green-600"></i>
              </button>
              <button className="ml-5" type="button" title="Rechazar inscripci??n" onClick={() => onReject(info)}>
                <i className="fas fa-skull-crossbones hover:text-red-700"></i>
              </button>
              <ToastContainer />
          </td>
        </PrivateComponent>

      {/* <td>
        <select
            className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
            name='estado'
            required
            onChange={handleChange("estado")}
            defaultValue={info.estado}
        >
                    <option disabled value={0}>
                    Seleccione Rol
                    </option>
                    <option value="ACEPTADO">Aceptado</option>
                    <option value="RECHAZADO">Rechazado</option>
                    <option value="PENDIENTE">Pendiente</option>
        </select> */}
      {/* <td>
        <input
          onChange={handleChange("estado")}
          value={info.estado}
          className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
        />
      </td>
        
      </td>
      <td>
        <input
          onChange={handleChange("nombreEstudiante")}
          value={info.nombreEstudiante}
          className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"
        />
      </td>
      <td>
        <input onChange={handleChange("fechaIngreso")} value={info.fechaIngreso} className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"/>
      </td>
      <td>
        <input onChange={handleChange("fechaEgreso")} value={info.fechaEgreso} className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"/>
      </td>
      <td>
        <input onChange={handleChange("nombreProyecto")} value={info.nombreProyecto} className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"/>
      </td>
      <td>
        <input onChange={handleChange("_id")} value={info._id} className="px-3 py-1 w-full border border-gray-600 rounded-lg bg-white text-sm text-center"/>
      </td>

      <td className="flex px-3 py-3 justify-evenly bg-white text-sm w-44">
            <button type="button" title="Editar"  onClick={onSubmit}>
            <i className="fas fa-check hover:text-green-600"></i>
            </button>
            <button type="button" title="Cancelar" onClick={onCancel}>
            <i className="fas fa-ban hover:text-red-700"></i>
            </button>
      </td>  */}
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
