import { gql} from '@apollo/client';

const obtenerAvances  = gql `

query Avances ($filtro: FiltroAvances){
  Avances (filtro: $filtro){
    _id
    fecha
    proyecto {
      _id
      nombre
      lider {
        _id
        nombre
        apellido
      }
    }
    descripcion
    observaciones {
      _id
      tipo
      descripcion
    }
    creadoPor {
      _id
      nombre
      apellido
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