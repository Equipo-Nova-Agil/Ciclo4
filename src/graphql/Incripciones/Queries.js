import { gql} from '@apollo/client';

const obtenerIncripciones = gql `

query Inscripciones ($filtro: FiltroInscripciones)  {
  Inscripciones (filtro: $filtro){
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      lider {
        _id
      }
      nombre
      estado
      fase
    }
    estudiante {
      _id
      nombre
      apellido
    }
  }
}
`;

const obtenerIncripcionesPorProyecto = gql `
  query InscripcionesPorProyecto($proyecto: String!) {
    InscripcionesPorProyecto(proyecto: $proyecto) {
      _id
       proyecto {
        _id
        nombre
      }
      estudiante {
        _id
        nombre
        apellido
        correo
      }
      fechaIngreso
      fechaEgreso
      estado   
    }
  }
    `;

    const obtenerConteoInscripcionesPorProyecto = gql `
    query CountInscripcionesPorProyecto($proyecto: String!, $estudiante: String!) {
      CountInscripcionesPorProyecto(proyecto: $proyecto, estudiante: $estudiante) {
        total
        pendientes
        abiertas
        cerradas
      }
    }
    `;

  export {obtenerIncripciones, obtenerIncripcionesPorProyecto, obtenerConteoInscripcionesPorProyecto};