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
    <>

<body>

  <main className='bg-black'>
    <section className="absolute w-full">
          <div className="absolute top-0 mb-1 pb-2 w-full h-full bg-black" ></div>
            <div className="container mt-3 mb-0 px-4 ">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">Iniciar Sesión con:</h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs transform hover:translate-y-1 transition-transform ease-in duration-200"
                        type="button"
                        >
                        <img alt="Google" class="w-5 mr-1" src={Google}/>Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-11 pt-0 ">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Inicia con credenciales</small>
                    </div>

                    <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Correo</label>
                        <Input 
                          name='correo' 
                          type='text' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Ejemplo: tucorreo@mail.com"
                          required={true} />
                      </div>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Contraseña</label>
                        <Input 
                          name='password' 
                          type='password' 
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          placeholder="Escribe aquí tu contraseña"
                          required={true} />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input id="customCheckLogin" type="checkbox" class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"/>
                          <span className="ml-2 text-sm font-semibold text-gray-700">Recordar</span>
                        </label>
                      </div>
                      <div class="text-center mt-1 mb-3">
                        <ButtonLoading
                          disabled={Object.keys(formData).length === 0}
                          loading={mutationLoading}
                          text='Iniciar Sesión'/>  
                        
                        <div class="mt-2">
                          <a href="#" className="text-gray-500 hover:text-gray-900 "><small>¿Olvidó su contraseña?</small></a>
                          <span class="text-gray-300">|</span>
                          <Link to='/auth/registro'>
                            <a href="#" className="text-gray-500 hover:text-blue-600 "><small>Regístrate</small></a>
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

</body>  
    </>
    
  );
};

export default Login;
