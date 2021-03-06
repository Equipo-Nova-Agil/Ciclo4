import { gql} from '@apollo/client';

const crearUsuario = gql `
    mutation Mutation {

        crearUsuario(
        nombre: $nombre, 
        apellido: $apellido, 
        identificacion: $identificacion, 
        correo: $correo, 
        rol: $rol) 
        {
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

const editarUsuario = gql `
    mutation EditarUsuario (
        $_id: String!
        $nombre: String!
        $apellido: String!
        $identificacion: String!
        $correo: String!
        $rol: Enum_Rol!
        $estado: Enum_EstadoUsuario!
      ){
        editarUsuario(
            _id: $_id 
            nombre: $nombre 
            apellido: $apellido 
            identificacion: $identificacion 
            correo: $correo 
            rol: $rol
            estado: $estado
        ) {
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


const eliminarUsuario = gql`
    mutation EliminarUsuario (
        $_id: String!
    ){
        eliminarUsuario(
            _id: $_id
        ){
            _id
            nombre
            apellido
        }
    }
`

export {crearUsuario, editarUsuario, eliminarUsuario};