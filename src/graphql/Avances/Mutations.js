import { gql} from '@apollo/client';

const crearAvance = gql `
    mutation CrearAvance(
        $fecha: Date! 
        $proyecto: String! 
        $descripcion: String! 
        $creadoPor: String!)
        {
            crearAvance(
            fecha: $fecha, 
            proyecto: $proyecto, 
            descripcion: $descripcion, 
            creadoPor: $creadoPor) 
            {
            _id
            fecha
            proyecto {
                _id
                
            }
            descripcion
            creadoPor {
                _id
                
            }
        }
    }
    
`;

const editarAvance = gql `
    mutation EditarAvance (
        $_id: String! 
        $fecha: Date! 
        $proyecto: String! 
        $descripcion: String! 
        $creadoPor: String!) 
        {
        editarAvance(
            _id: $_id
            fecha: $fecha
            proyecto: $proyecto
            descripcion: $descripcion
            creadoPor: $creadoPor
        ){
            _id
            fecha
            proyecto {
                    _id
            }
            descripcion
            creadoPor {
                _id
            }
        }    
    }
    
`;

const eliminarAvance = gql `
    mutation EliminarAvance (
        $_id: String!) 
        {
        eliminarAvance(
            _id: $_id)
            {
            _id
            fecha
            proyecto {
                _id
            }
            descripcion
            creadoPor {
                _id
            }
        }
    }
`;


export {crearAvance, editarAvance, eliminarAvance};