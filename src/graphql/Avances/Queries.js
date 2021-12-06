import { gql} from '@apollo/client';

const obtenerAvances = gql `

query Avances {
  Avances {
    _id
    fecha
    descripcion
    proyecto {
      _id
      nombre
    }
    creadoPor {
      _id
      nombre
    }
    observaciones {
      descripcion
    }
  }
}
  `;

  const obtenerAvancesPorProyecto = gql `
  query FiltrarAvances($proyecto: String!) {
    FiltrarAvances(proyecto: $proyecto) {
      _id
      fecha
      descripcion
      proyecto {
        _id
        nombre
      }
      creadoPor {
        _id
        nombre
        apellido
      }
      observaciones {
        descripcion
      }
    }
  }  `;

  export {obtenerAvances, obtenerAvancesPorProyecto};