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
    mutation Mutation {

    editarUsuario(
        _id: $id, 
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

export {crearUsuario, editarUsuario};