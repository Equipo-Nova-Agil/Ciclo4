import { gql} from '@apollo/client';

const obtenerUsuarios = gql `

query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
  `;

  export {obtenerUsuarios};