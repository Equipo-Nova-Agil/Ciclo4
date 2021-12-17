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
      estado
      fase
    }
    estudiante {
      _id
      nombre
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

  export {obtenerIncripciones, obtenerIncripcionesPorProyecto};