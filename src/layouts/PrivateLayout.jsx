import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../componets/Sidebar';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Actualizar_Token } from '../graphql/Autenticacion/Mutations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import PrivateRoute from '../componets/PrivateRoute';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { authToken, setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [refreshToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =useMutation(Actualizar_Token);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.refreshToken.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate('/auth/errorauth');
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, loadingAuth, navigate]);

  if (loadingMutation || loadingAuth) return <div><h1 className='text-3xl font-extrabold'>Cargando...</h1><ReactLoading type='spin' color='#11172d' height={467} width={175} /></div>;

  return (
    // <PrivateRoute>

      <div className='flex w-screen h-screen'>
        <div className='flex flex-nowrap h-full w-full'>

          <Sidebar />

          <main className='bg-white flex w-full  overflow-auto items-center justify-center pr-0 '>
            <Outlet/>
          </main>

        </div>
        <ToastContainer/>
      </div>

    // </PrivateRoute> 
  );
};

export default PrivateLayout;
