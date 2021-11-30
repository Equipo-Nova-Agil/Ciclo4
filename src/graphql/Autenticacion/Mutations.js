import { gql } from '@apollo/client';

const Registrarse = gql`
  mutation Registro(
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $rol: Enum_Rol!
    $password: String!
    
  ) {
    registro(
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      rol: $rol
      password: $password
      
    ) 
  }
`;

// const Registrarse = gql`
//   mutation Registro(
//     $nombre: String!
//     $apellido: String!
//     $identificacion: String!
//     $correo: String!
//     $rol: Enum_Rol!
//     $password: String!
//     $estado: String!
//   ) {
//     registro(
//       nombre: $nombre
//       apellido: $apellido
//       identificacion: $identificacion
//       correo: $correo
//       rol: $rol
//       password: $password
//       estado: "PENDIENTE"
//     ) {
//       token
//       error
//     }
//   }
// `;

const Acceder = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

const Actualizar_Token = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { Registrarse, Acceder, Actualizar_Token };