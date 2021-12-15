import { gql} from '@apollo/client';

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

const editarProyecto = gql`
  mutation EditarProyecto(
    $_id: String!, 
    $campos: camposProyecto!) 
    {
    editarProyecto(
      _id: $_id, 
      campos: $campos) {
      _id
      estado
    }
  }
`;

// const editarProyecto = gql `

//     mutation EditarProyecto {
//         editarProyecto(
//         nombre: $nombre, 
//         apellido: $apellido, 
//         identificacion: $identificacion, 
//         correo: $correo, 
//         rol: $rol) 
//         {
//             _id
//             nombre
//             apellido
//             identificacion
//             correo
//             rol
//             estado
//             }
//     }
// `;

const eliminarProyecto = gql`
    mutation EliminarProyecto (
        $_id: String!
    ){
        eliminarProyecto(
            _id: $_id
        ){
            _id
            nombre
        }
    }
`
const editarObjetivo = gql`
  mutation EditarObjetivo(
    $idProyecto: String!, 
    $indexObjetivo: Int!, 
    $campos: camposObjetivo!) 
    {
    editarObjetivo(
      idProyecto: $idProyecto, 
      indexObjetivo: 
      $indexObjetivo, 
      campos: $campos) 
      {
        _id
      }
    }
`;

const eliminarObjetivo = gql`
  mutation EliminarObjetivo(
    $idProyecto: String!, 
    $idObjetivo: String!) 
    {
      eliminarObjetivo(
        idProyecto: $idProyecto, 
        idObjetivo: $idObjetivo) 
        {
        _id
        }
    }
`;

export {editarProyecto, crearProyecto, eliminarProyecto, editarObjetivo, eliminarObjetivo};