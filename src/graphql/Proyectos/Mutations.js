import { gql } from "@apollo/client";

const crearProyecto = gql`
  mutation Mutation {
    crearProyecto(
      _id: $id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
    ) {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
`;

const editarProyecto = gql `
mutation EditarProyecto(
  $_id: String!, 
  $nombre: String!,
  $fechaInicio: Date!, 
  $fechaFin: Date!, 
  $lider: String!,
  $presupuesto: Float!, 
  $fase: Enum_FaseProyecto!,
  $estado: Enum_EstadoProyecto!
  ) 
  {
  editarProyecto(
    _id: $_id, 
    nombre: $nombre, 
    fechaInicio: $fechaInicio, 
    fechaFin: $fechaFin, 
    lider: $lider, 
    presupuesto: $presupuesto, 
    fase: $fase, 
    estado: $estado
    ) 
    {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        _id
        nombre
        apellido
        correo
      }
      objetivos {
        _id
        descripcion
        tipo
      }
  }
}
`;


const eliminarProyecto = gql`
  mutation EliminarProyecto($_id: String) {
    eliminarProyecto(_id: $_id) {
      _id
      nombre
    }
  }
`;

export { editarProyecto, crearProyecto, eliminarProyecto };
