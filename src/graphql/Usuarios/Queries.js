import { gql } from "@apollo/client";

const obtenerUsuarios = gql`
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

const obtenerUsuario = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const obtenerUsuariosPorFiltro = gql`
query Usuarios($filtro: FiltroUsuarios) {
  Usuarios(filtro: $filtro) {
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

export { obtenerUsuarios, obtenerUsuario, obtenerUsuariosPorFiltro};