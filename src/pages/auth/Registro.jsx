import React, { useEffect}from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { Enum_Rol } from 'utils/enum.js';
import useFormData from '../../hooks/useFormData';
import ButtonLoading from '../../componets/ButtonLoading.jsx';
import DropDown from 'componets/Dropdown.jsx';
import {Registrarse} from '../../graphql/Autenticacion/Mutations.js'

const Registro = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(Registrarse);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate('/admin');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <>
    <main>
      <section className="relative w-full h-full bg-black">
        <div className="absolute -my-3 pt-2  w-full h-full bg-black" >
          <div className="container mt-3 mb-0 px-4 ">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">

                <div className="relative flex flex-col min-w-0 break-words w-full mb-10 shadow-lg rounded-lg bg-gray-300 border-0">
                    
                  {/* TITULO */}
                  <div className="rounded-t mb-0 px-6 py-3">
                      
                      <div className="text-center mb-3">
                        <h6 className="text-gray-600 text-md font-extrabold">REGISTRO:</h6>
                      </div>
                    
                      <hr className="mt-6 border-b-1 border-gray-400"/>

                  </div>
                    
                    {/* FORMULARIO */}
                  <div className="flex-auto px-4 pb-3  lg:px-10 py-11 pt-0">
                    
                    <form
                      onSubmit={submitForm} 
                      onChange={updateFormData} 
                      ref={form}> 
                        
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Nombre</label>
                        <input
                          type="text"
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Ejemplo: Juan"/>
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Apellidos</label>
                        <input
                          type="text"
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Ejemplo: Pérez"/>
                      </div>

                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Número de Documento</label>
                          <input
                            type="number"
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Escribe aquí tu número de documento"/>
                        </div>
                        
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Correo Electrónico</label>
                          <input
                            type="email"
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Ejemplo: tucorreo@mail.com"/>
                        </div>

                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="rol">Rol Deseado</label>
                          <DropDown label='Rol Deseado:' name='rol' required={true} options={Enum_Rol} />
                          {/* <select
                            name='rol'
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm text-centershadow focus:outline-none focus:ring w-full">
                              <option disabled value={0}>Seleccione Rol </option>
                              <option value="ADMINISTRADOR">Administrador</option>
                              <option value="LIDER">Líder</option>
                              <option value="ESTUDIANTE">Estudiante</option>
                          </select> */}
                        </div>

                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Contraseña</label>
                          <input
                            type="password"
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Crea aquí tu contraseña"/>
                        </div>
                        
                        {/* REGISTRO/INICIO DE SESIÓN */}
                        <div className="text-center items-center content-center mt-1 mb-3">
                          <ButtonLoading
                            disabled={Object.keys(formData).length === 0}
                            loading={false}
                            text='Registrarsee'/>
                          {/* <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-full transform hover:translate-y-1 transition-transform ease-in duration-200"
                            type="button"
                            disabled={Object.keys(formData).length === 0}>
                            <Link to='/admin'>
                              Registrarse
                            </Link>
                          </button> */}
                          
                          <div className="mt-2 ">
                            <span className="text-gray-600"><small>¿Ya tienen una cuenta?</small></span>
                            <span className="text-gray-300">|</span>
                            <Link to='/auth/login'>
                              <a href="#" className="text-gray-600 hover:text-gray-900"><small>Inicia Sesión</small></a>
                            </Link>
                          </div> 
                        </div>

                      </form>
                    
                    </div>

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
