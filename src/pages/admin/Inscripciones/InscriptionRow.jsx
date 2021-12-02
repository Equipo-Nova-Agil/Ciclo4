import { useState } from "react";

function ReadOnlyInscriptionRow({ user, onEdit, onCancel, setOpenDialog }) {
  return (
    <tr>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.estado}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreEstudiante}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaIngreso}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.fechaEgreso}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user.nombreProyecto}</td>
      <td className="px-3 py-3  bg-white text-sm text-center w-44">{user._id}</td>
      <td className="flex px-3 py-3 justify-evenly bg-white text-sm w-44">
        <button type="button" title="Editar" onClick={onEdit}>
            <i className="fas fa-user-edit hover:text-yellow-600"></i>
        </button>
            <button type="button" title="Eliminar" onClick={() => setOpenDialog(true)}>
            <i className="fas fa-trash-alt hover:text-yellow-600"></i>
            </button>
        </td>
    </tr>
  );
}

function InscriptionRowForm(props) {
  const { onOk, onCancel, user } = props;
  const [info, setInfo] = useState({ ...user });

  const handleChange = (fieldName) => (e) => {
    setInfo((currentInfo) => ({
      ...currentInfo,
      [fieldName]: e.target.value
    }));
  };

  const onSubmit = () => {
    console.log(info)
    onOk(info);
  };

  return (
    <tr>
      <td>
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
        </select>
        
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
