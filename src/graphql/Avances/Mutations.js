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
        $_id: String!, 
        $campos: camposAvance!) 
        {
        editarAvance(
            _id: $_id, 
            campos: $campos
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

const crearObservacion = gql `
    mutation CrearObservacion(
        $idAvance: String!, 
        $campos: camposObservacion!
        ){
            crearObservacion(
                idAvance: $idAvance, 
                campos: $campos
            ) 
            {
            _id
            observaciones {
                _id
                tipo
                descripcion
                }
            }
        }
    
`;

export {crearAvance, editarAvance, eliminarAvance, crearObservacion};