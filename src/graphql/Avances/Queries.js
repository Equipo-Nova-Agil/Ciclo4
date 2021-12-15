import { gql} from '@apollo/client';

const obtenerAvances = gql `

query Avances {
  Avances {
    _id
    fecha
    descripcion
    # observaciones
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

const filtrarAvance = gql`
query FiltrarAvance($proyecto: String!) {
  filtrarAvance(proyecto: $proyecto) {
    _id
    fecha
    proyecto {
      _id
    }
    descripcion
    creadoPor {
      _id
    }
  }
}
`;
  export {obtenerAvances, filtrarAvance};