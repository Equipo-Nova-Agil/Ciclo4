import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {crearUsuario} from '../../graphql/Usuarios/Mutations.js'

const Registro = () => {
  // const [agregarUsuario, { data, loading, error }] = useMutation(crearUsuario);
  // let input;
  //   if (loading) return 'Creando Registro...';
  //   if (error) return `Submission error! ${error.message}`;
  return (
    <>
      <main>
      <section class="relative w-full">
        <div class="absolute top-0 mb-0 pb-0 w-full h-full bg-black" ></div>
        <div class="container mt-3 mb-0 px-4 ">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-10 shadow-lg rounded-lg bg-gray-300 border-0">
                <div class="rounded-t mb-0 px-6 py-3">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">REGISTRO:</h6>
                  </div>
                  
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 pb-3  lg:px-10 py-11 pt-0">
                  
                  <form>
                    {/* onSubmit={e => {
                      e.preventDefault();
                      agregarUsuario({ 
                        nombre: { text: input.value },
                        apellido: { text: input.value },
                        identificacion: { text: input.value },
                        correo: { text: input.value },
                        rol: { text: input.value },
                      });
                      input.value = '';
                      }} */}

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Nombre</label>
                      <input
                        type="text"
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Ejemplo: Juan"/>
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Apellidos</label>
                      <input
                        type="text"
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Ejemplo: Pérez"/>
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Número de Documento</label>
                      <input
                        type="number"
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Escribe aquí tu número de documento"/>
                    </div>
                    
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Ejemplo: tucorreo@mail.com"/>
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="rol">Rol Aspirado</label>
                      <select
                        name='rol'
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm text-centershadow focus:outline-none focus:ring w-full">
                          <option disabled value={0}>Seleccione Rol </option>
                          <option value="ADMINISTRADOR">Administrador</option>
                          <option value="LIDER">Líder</option>
                          <option value="ESTUDIANTE">Estudiante</option>
                      </select>
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Contraseña</label>
                      <input
                        type="password"
                        required
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Crea aquí tu contraseña"/>
                    </div>
                   
                    <div class="text-center items-center content-center mt-1 mb-3">
                      <button class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-full"
                        type="button">
                        <Link to='/admin'>Registrarse</Link>
                      </button>
                      
                      <div class="mt-2 ">
                        <span class="text-gray-600"><small>¿Ya tienen una cuenta?</small></span>
                        <span class="text-gray-300">|</span>
                        <Link to='/auth/login'>
                          <a href="#juan" class="text-gray-600 hover:text-gray-900"><small>Inicia Sesión</small></a>
                        </Link>
                      </div> 
                    </div>

                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Registro;