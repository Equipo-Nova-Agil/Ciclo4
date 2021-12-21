import React, { useEffect,useState } from 'react';
import Google from '../../media/google.svg';
import { Link } from 'react-router-dom';
import Input from '../../componets/Input';
import ButtonLoading from '../../componets/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { useUser } from "context/userContext";
import { useMutation } from '@apollo/client';
import { ChangePassword } from '../../graphql/Autenticacion/Mutations'
import '../../styles/styles.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from 'context/authContext';
import {useNavigate} from 'react-router-dom';

const CambiarPassword = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData();
  const [ showPass1, setShowPass1 ] = useState(false);
  const [ showPass2, setShowPass2 ] = useState(false);
  const [ password1, setPassword1 ] = useState("password");
  const [ password2, setPassword2 ] = useState("password");

  const [reseteo, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(ChangePassword);

  const submitForm = (e) => {
    e.preventDefault();

    reseteo({
      variables: { id: userData._id, ...formData },
    });
  };
  
useEffect(() => {
  //contraseña actual
  if (showPass1) {
    setPassword1("text");
  } else {
    setPassword1("password");
  }
//contraseña nueva
  if (showPass2) {
    setPassword2("text");
  } else {
    setPassword2("password");
  }
}, [showPass1, showPass2]);

  useEffect(() => {
    //console.log ('Datos Inicio de Sesión', dataMutation);
    if (dataMutation) {
      if (dataMutation.cambiarPassword.token){
        //console.log(dataMutation.cambiarPassword.token)
        toast.success("Cambio de contraseña realizado exitosamente", {
          //position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000
        });
      setToken(dataMutation.cambiarPassword.token);
      navigate('/admin');
    }
    if (dataMutation.cambiarPassword.error)
      {
        toast.error("EL cambio de contraseña no se pudo realizar, verifique los datos ingresados", {
          //position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000
        });
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
                <h6 className="text-gray-600 text-sm font-bold">
                  CAMBIO DE CONTRASEÑA
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-gray-400" />
            </div>

            <div className="flex-auto px-4 lg:px-10 py-11 pt-0 ">
              <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="passwordActual"
                  >
                    Contraseña Actual {" "}
                    {showPass1 ? (
                      <button
                        type="button"
                        title="Ocultar password"
                        onClick={() => setShowPass1(false)}
                      >
                        <i className="fas fa-eye-slash hover:text-blue-600"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        title="Ver password"
                        onClick={() => setShowPass1(true)}
                      >
                        <i className="fas fa-eye hover:text-blue-600"></i>
                      </button>
                    )}
                  </label>
                  <Input
                    name="passwordActual"
                    type={password1}
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Escribe tu contraseña actual"
                    required={true}
                  />
                </div>
                <div className="relative w-full mb-3">
                <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="passwordActual"
                  >
                    Contraseña Nueva {" "}
                    {showPass2 ? (
                      <button
                        type="button"
                        title="Ocultar password"
                        onClick={() => setShowPass2(false)}
                      >
                        <i className="fas fa-eye-slash hover:text-blue-600"></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        title="Ver password"
                        onClick={() => setShowPass2(true)}
                      >
                        <i className="fas fa-eye hover:text-blue-600"></i>
                      </button>
                    )}
                  </label>
                  <Input
                    name="passwordNuevo"
                    type={password2}
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Escribe tu nueva contraseña"
                    required={true}
                  />
                </div>

                <div className="text-center mt-1 mb-3">
                  <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text="Cambiar Contraseña"
                  />

                  <div className="mt-2">
                    <span className="text-gray-300">|</span>
                    <i className="fas fa-undo mr-2 text-md text-gray-500"></i>
                    <Link to="/admin">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-blue-600 "
                      >
                        <small>Regresar</small>
                      </a>
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

export default CambiarPassword;
