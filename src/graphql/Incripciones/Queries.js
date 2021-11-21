import { gql} from '@apollo/client';

const obtenerIncripciones = gql `

query Inscripciones {
  Inscripciones {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
    }
    estudiante {
      _id
      nombre
    }
  }
}
  `;

  export {obtenerIncripciones};