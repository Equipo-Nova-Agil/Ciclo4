import { gql} from '@apollo/client';

const crearAvance = gql `
    mutation CrearAvance(
        $fecha: Date! 
        $proyecto: String! 
        $descripcion: String! 
        $creadoPor: String!
        $observaciones: [crearObservacion])
        {
            crearAvance(
            fecha: $fecha, 
            proyecto: $proyecto, 
            descripcion: $descripcion, 
            creadoPor: $creadoPor
            observaciones: $observaciones) 
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
        $creadoPor: String!
        $observaciones: [crearObservacion]) 
        {
        editarAvance(
            _id: $_id
            fecha: $fecha
            proyecto: $proyecto
            descripcion: $descripcion
            creadoPor: $creadoPor
            observaciones: $observaciones
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
            observacion {
                _id
                tipo
                descripcion
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