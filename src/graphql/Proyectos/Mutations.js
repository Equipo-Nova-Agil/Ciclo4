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

const editarProyecto = gql `
    mutation Mutation {

        editarProyecto(
        nombre: $nombre, 
        apellido: $apellido, 
        identificacion: $identificacion, 
        correo: $correo, 
        rol: $rol) 
        {
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
export {editarProyecto, crearProyecto, eliminarProyecto};