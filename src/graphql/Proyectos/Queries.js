import { gql } from "@apollo/client";


// query Proyecto($id: String!) {
//   Proyecto(_id: $id) {
//     _id
//     nombre
//     presupuesto
//     fechaInicio
//     fechaFin
//     estado
//     fase
//     lider {
//       _id
//       nombre
//       apellido
//       correo
//     }
//     objetivos {
//       _id
//       descripcion
//       tipo
//     }
//     avances {
//       _id
//       fecha
//       descripcion
//       observaciones {
//         descripcion
//       }
//     }
//     inscripciones {
//       _id
//       estudiante {
//         _id
//         nombre
//         apellido
//         correo
//       }
//       fechaIngreso
//       fechaEgreso
//       estado
//     }
//   }
// }

const obtenerProyecto = gql`
query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
      correo
    }
    objetivos {
      _id
      descripcion
      tipo
    }
    avances {
      _id
      fecha
      descripcion
      observaciones {
        descripcion
      }
      creadoPor{
        _id
      }

    }
    inscripciones {
      _id
      estudiante {
        _id
        nombre
        apellido
      }
      fechaIngreso
      fechaEgreso
      estado
    }
  }
}
`;

const obtenerProyectos = gql`
  query Proyectos {
    Proyectos {
    _id
    nombre
    presupuesto
    fechaInicio
    fechaFin
    estado
    fase
    lider {
      _id
      nombre
      apellido
      correo
    }
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

export { obtenerProyectos, obtenerProyecto };
