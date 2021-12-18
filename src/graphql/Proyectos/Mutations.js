import { gql } from "@apollo/client";

const crearProyecto = gql `
    mutation CrearProyecto(
    $nombre: String!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $presupuesto: Float!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;


// const editarProyecto = gql `
// mutation EditarProyecto(
//   $_id: String!, 
//   $nombre: String!,
//   $fechaInicio: Date!, 
//   $fechaFin: Date!, 
//   $lider: String!,
//   $presupuesto: Float!, 
//   $fase: Enum_FaseProyecto!,
//   $estado: Enum_EstadoProyecto!,
//   $objetivos: [crearObjetivo]
//   ) 
//   {
//   editarProyecto(
//     _id: $_id, 
//     nombre: $nombre, 
//     fechaInicio: $fechaInicio, 
//     fechaFin: $fechaFin, 
//     lider: $lider, 
//     presupuesto: $presupuesto, 
//     fase: $fase, 
//     estado: $estado,
//     objetivos: $objetivos
//     ) 
//     {
//       _id
//       nombre
//       presupuesto
//       fechaInicio
//       fechaFin
//       estado
//       fase
//       lider {
//         _id
//         nombre
//         apellido
//         correo
//       }
//       objetivos {
//         _id
//         descripcion
//         tipo
//       }
//   }
// }
// `;

const editarProyecto = gql `
mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
  editarProyecto(_id: $_id, campos: $campos) {
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
