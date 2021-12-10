import { gql} from '@apollo/client';

// const obtenerProyectos = gql `

// query Proyectos {
//   Proyectos {
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
//     }
//     objetivos {
//       descripcion
//       tipo
//     }
//   }
// }
//   `;

const obtenerProyectos = gql `

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
    }
    objetivos {
      tipo
      descripcion
    }
    
  }
}

`;

  export {obtenerProyectos};