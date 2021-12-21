import React, { useEffect, useState } from "react";
import Google from "../../media/google.svg";
import { Link } from "react-router-dom";
import Input from "../../componets/Input";
import ButtonLoading from "../../componets/ButtonLoading";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { Acceder, ResetPassword } from "../../graphql/Autenticacion/Mutations";
import "../../styles/styles.css";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from 'jwt-decode';
import { Button } from "@mui/material";

const Login = () => {
  const [mostrarResetForm, setMostrarResetForm] = useState(false);

  return (
    <>
      <div>
        <main className="bg-black">
          <section className="absolute w-full">
            <div className="absolute top-0 mb-1 pb-2 w-full h-full bg-black"></div>
            <div className="container mt-3 mb-0 px-4 ">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-300 border-0">
                    <ToastContainer />
                    {mostrarResetForm ? (
                      <FormularioResetPassword
                        setMostrarResetForm={setMostrarResetForm}
                      />
                    ) : (
                      <FormularioLogin
                        setMostrarResetForm={setMostrarResetForm}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

const FormularioLogin = ({ setMostrarResetForm }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError },
  ] = useMutation(Acceder);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    //console.log("Datos Inicio de Sesión", dataMutation);
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate("/admin");
      }
      if (dataMutation.login.error) {
        toast.error("Usuario o contraseña errada", {
          //position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  }, [dataMutation, setToken, navigate]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error consultando datos", {
        //position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000,
      });
    }
  }, [mutationError]);

  return (
    <div>
      <div className="rounded-t mb-0 px-6 py-6">
        <div className="text-center mb-3">
          <h6 className="text-gray-600 text-sm font-bold">
            Iniciar Sesión con:
          </h6>
        </div>
        <div className="btn-wrapper text-center">
          <button
            className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs transform hover:translate-y-1 transition-transform ease-in duration-200"
            type="button"
          >
            <img alt="Google" className="w-5 mr-1" src={Google} />
            Google
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
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Correo
            </label>
            <Input
              name="correo"
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Ejemplo: tucorreo@mail.com"
              required={true}
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Contraseña
            </label>
            <Input
              name="password"
              type="password"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Escribe aquí tu contraseña"
              required={true}
            />
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Recordar
              </span>
            </label>
          </div>
          <div className="text-center mt-1 mb-3">
            <ButtonLoading
              disabled={Object.keys(formData).length === 0}
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full transform hover:translate-y-1 transition-transform ease-in duration-200"
              loading={mutationLoading}
              text="Iniciar Sesión"
            />

            <div className="mt-3">
              <button
                className="text-gray-500 font-bold hover:text-gray-900"
                onClick={() => {
                  setMostrarResetForm(true);
                }}
              >
                ¿Olvidó su contraseña?
              </button>

              <span className="text-gray-900"> | </span>
              <Link
                to="/auth/registro"
                className="text-gray-500 font-bold hover:text-gray-900 "
              >
                Regístrate
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

const FormularioResetPassword = ({ setMostrarResetForm }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [decodedTem, setDecodedTem] =useState("");

  const [
    login,
    { data: dataMutationReset, loading: resetLoading, error: resetError },
  ] = useMutation(ResetPassword);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutationReset) {
      if (dataMutationReset.resetPassword.token) {
        setToken(dataMutationReset.resetPassword.token);
        setDecodedTem(jwt_decode(dataMutationReset.resetPassword.token));
        //navigate("/admin");
      }
      if (dataMutationReset.resetPassword.error) {
        toast.error("Datos invalidos", {
          //position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
  }, [dataMutationReset, setToken, navigate]);

  useEffect(() => {
    if (resetError) {
      toast.error("Error consultando datos", {
        //position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000,
      });
    }
  }, [resetError]);

  return (
    <div className="text-center">
      <div className="rounded-t mb-0 px-6 py-6">
        <div className="text-center mb-3">
          <h1 className="text-gray-900 font-bold uppercase">
            Formulario de Recuperación
          </h1>
        </div>
        <hr className="mt-6 border-b-1 border-gray-400" />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-11 pt-0 ">
        <div className="text-gray-500 text-justify mb-3 font-bold">
          <h1>
            {decodedTem
              ? "De acuerdo a tu solicitud el sistema generó la siguiente contraseña:"
              : "Ingresa tú correo electrónico y recibiras un email o una notificación con los nuevos datos de ingreso al sistema."}
          </h1>
        </div>

        <form onSubmit={submitForm} onChange={updateFormData} ref={form}>
          <div className="relative w-full mb-3">
            {decodedTem && decodedTem.lares ? (
              <>
                <p className="w-full text-justify text-black border border-gray-200 rounded py-2 px-4 mt-2">
                  {decodedTem.lares}
                </p>
                <div className="text-gray-500 text-justify mt-2 mb-3 font-bold">
                  <h1>Se recomienda cambiarla una vez ingreses al sistema.</h1>
                </div>
              </>
            ) : (
              <Input
                name="correo"
                type="email"
                className="border-0 px-3 py-3 placeholder-gray-400 mt-4 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                placeholder="tucorreo@mail.com"
                required={true}
              />
            )}
          </div>

          <div className="text-center mt-1 mb-1">
            {decodedTem && decodedTem.lares ? (
              <button
                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-6 w-full transform hover:translate-y-1 transition-transform ease-in duration-200"
                onClick={() => {
                  setMostrarResetForm(false);
                }}
              >Iniciar Sesión
                </button>
            ) : (
              <>
                <ButtonLoading
                  disabled={Object.keys(formData).length === 0}
                  className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-6 w-full transform hover:translate-y-1 transition-transform ease-in duration-200"
                  loading={resetLoading}
                  text="Recuperar clave"
                />
                <div className="mt-3">
                  <button
                    className="text-gray-500 font-bold hover:text-gray-900"
                    onClick={() => {
                      setMostrarResetForm(false);
                    }}
                  >
                    Iniciar Sesión
                  </button>

                  <span className="text-gray-900"> | </span>
                  <Link
                    to="/auth/registro"
                    className="text-gray-500 font-bold hover:text-gray-900 "
                  >
                    Regístrate
                  </Link>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
