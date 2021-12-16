import React, { useEffect } from 'react';
import Google from '../../media/google.svg';
import { Link } from 'react-router-dom';
import Input from '../../componets/Input';
import ButtonLoading from '../../componets/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import {Acceder} from '../../graphql/Autenticacion/Mutations'
import '../../styles/styles.css'
import { useAuth } from 'context/authContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(Acceder);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };
  
  useEffect(() => {
    console.log ('Datos Inicio de Sesión', dataMutation);
    if (dataMutation) {
      if (dataMutation.login.token){
      setToken(dataMutation.login.token);
      navigate('/admin');
    }
  }
  },[dataMutation, setToken, navigate])
  return (
    
            <div className="container mt-3 mb-0 px-4 ">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">CAMBIO DE CONTRASEÑA</h6>
                    </div>
                    
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-11 pt-0 ">
                    

                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Contraseña Actual</label>
                        <Input 
                          name='correo' 
                          type='password' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Escribe tu contraseña actual"
                          required={true} />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Nueva Contraseña</label>
                        <Input 
                          name='password' 
                          type='password' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Escribe tu nueva contraseña"
                          required={true} />
                      </div>
                      
                      <div class="text-center mt-1 mb-3">
                        <ButtonLoading
                          disabled={Object.keys(formData).length === 0}
                          loading={mutationLoading}
                          text='Cambiar Contraseña'/>  
                        
                        <div class="mt-2">
                          <span class="text-gray-300">|</span>
                          <i className="fas fa-undo mr-2 text-md text-gray-500"></i>
                          <Link to='/admin'>
                            <a href="#" className="text-gray-500 hover:text-blue-600 "><small>Regresar</small></a>
                          </Link>
                        </div>    
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
  


    
  );
};

export default Login;