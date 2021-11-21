import { gql} from '@apollo/client';

const obtenerAvances = gql `

query Avances {
  Avances {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      _id
      nombre
    }
    creadoPor {
      _id
      nombre
    }
  }
}
  `;

  export {obtenerAvances};