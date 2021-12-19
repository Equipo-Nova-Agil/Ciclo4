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
      # estado: $estado
      
    ) {
      token
      error
    }
  }
`;

const Acceder = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

const ChangePassword = gql`
mutation CambiarPassword($id: String!, $passwordActual: String!, $passwordNuevo: String!) {
  cambiarPassword(_id: $id, passwordActual: $passwordActual, passwordNuevo: $passwordNuevo) {
    token
    error
  }
}
`;

const ResetPassword = gql`
mutation ResetPassword($correo: String!) {
  resetPassword(correo: $correo) {
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

export { Registrarse, Acceder, ChangePassword, ResetPassword, Actualizar_Token };