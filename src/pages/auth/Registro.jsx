import React, { useEffect } from 'react';
import Input from '../../componets/Input';
import { Enum_Rol } from '../../utils/enum';
import DropDown from '../../componets/Dropdown';
import ButtonLoading from '../../componets/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { Registrarse } from '../../graphql/Autenticacion/Mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';

const Registro = () => {
  // const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(Registrarse);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    console.log ('Datos Registros', dataMutation)
  },[dataMutation])

  

  return (
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
                  <div className="flex-auto px-4 pb-3  lg:px-10 py-11 pt-0 items-center justify-center">
                    
                    <form onSubmit={submitForm} onChange={updateFormData} ref={form} >

                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-2 " for="nombre">Nombre</label>
                        <Input 
                          name='nombre' 
                          type='text'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Ejemplo: Juan" 
                          required />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-4" for="apellido">Apellido</label>
                        <Input  
                          name='apellido' 
                          type='text' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Ejemplo: Pérez"
                          required />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-4" for="identificacion">Documento</label>
                        <Input 
                          name='identificacion' 
                          type='text' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Escribe aquí tu número de documento"
                          required />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-4" for="rol">Rol Deseado</label>
                        <DropDown 
                          name='rol' 
                          required={true} 
                          options={Enum_Rol}
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm text-centershadow focus:outline-none focus:ring w-full'/>
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-4" for="correo">Correo Electrónico</label>
                        <Input 
                          name='correo' 
                          type='text' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Ejemplo: tucorreo@mail.com"
                          required />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-1 mt-4" for="password">Contraseña</label>
                        <Input 
                          name='password' 
                          type='password' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Crea aquí tu contraseña"
                          required />
                      </div>

                      <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
                        text='Registrarse'/>

                    </form>
                    <div className="mt-2 text-center">
                      <span className="text-gray-600"><small>¿Ya tienen una cuenta?</small></span>
                      <span className="text-gray-300">|</span>
                      <Link to='/auth/login'>
                        <a href="#" className="text-gray-600 hover:text-blue-600"><small>Inicia Sesión</small></a>
                      </Link>
                    </div>

                    
                  </div>


                </div>


              </div>


          </div>


          </div>


        </div>


      </section>

    </main>
      
  );
};

export default Registro;
