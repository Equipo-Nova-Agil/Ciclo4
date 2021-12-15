describe('Pruebas en el archivo demo.test.js', () => {
    test('deben ser iguales los strings', () => {
        //1. Inicialización
        const mensaje = 'Hola Mundo';
    
        //2. Estímulo
        const mensaje2 = `Hola Mundo`;
    
        //3. Resultado
        expect(mensaje).toBe(mensaje2);
    })
});

