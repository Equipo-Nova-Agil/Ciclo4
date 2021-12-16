import React from 'react';
import Usuarios from './Usuarios.jsx';
import {render, screen} from '@testing-library/react'

// describe('Pruebas en Usuarios.js', () => {
//     test('deben ser iguales los strings', () => {
//         //1. Inicialización
//         const mensaje = 'Hola Mundo';
    
//         //2. Estímulo
//         const mensaje2 = `Hola Mundo`;
    
//         //3. Resultado
//         expect(mensaje).toBe(mensaje2);
//     })
// });

it('renders okay', () => {
    //render(<ID loading={true} value={infoNuevaUsuario.identificacion} />);
    expect(infoNuevaUsuario.identificacion).toBeInTheDocument();;
});