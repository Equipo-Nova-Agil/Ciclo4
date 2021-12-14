import { gql} from '@apollo/client';

const crearInscripcion = gql `

    mutation CrearInscripcion(
        $proyecto: String!, 
        $estudiante: String!, 
        $estado: Enum_EstadoInscripcion!,
        ){
        crearInscripcion(
            proyecto: $proyecto, 
            estudiante: $estudiante, 
            estado: $estado,
            ) 
            {
            _id
            proyecto {
                _id
                nombre}
            estudiante {
                _id
                nombre}
            fechaIngreso
            fechaEgreso
    }
  }
`;


const aprobarInscripcion = gql `
mutation AprobarInscripcion(
    $aprobarInscripcionId: String!
    ){
    aprobarInscripcion(id: $aprobarInscripcionId) {
      _id
      proyecto {
        _id
        nombre
      }
      estudiante {
        _id
        nombre
      }
      fechaIngreso
      fechaEgreso
      estado
    }
  }
`;

export { crearInscripcion, aprobarInscripcion };