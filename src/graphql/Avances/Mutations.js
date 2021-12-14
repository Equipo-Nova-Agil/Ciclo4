import { gql} from '@apollo/client';

const crearAvance = gql `
    mutation Mutation {

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
            nombre
        }
        descripcion
        creadoPor {
            _id
            nombre
      }
    }
    }
`;

export {crearAvance};