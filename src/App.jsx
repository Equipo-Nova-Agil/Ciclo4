import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from "context/userContext";
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';

//Layouts
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from './layouts/AuthLayout';

//Pages
import Index from './pages/Index';
import Error404 from "pages/Error404";
import Usuarios from './pages/admin/Usuarios';
import Proyectos from './pages/admin/Proyectos';
import Perfil from "pages/admin/Perfil";
import Inscripciones from "pages/admin/Inscripciones";
import Avances from "pages/admin/Avances";
import Login from "./pages/auth/Login"
import Registro from "./pages/auth/Registro"


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
// uri: 'https://servidor-proyectorio.herokuapp.com/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('Set Token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);


  return (

    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}> 

          <Router>
          
            <Routes>

              <Route exact path='/' element={<PublicLayout/>}>
                <Route path='' element={<Index/>} />
              </Route>
                
              <Route path='/admin' element={<PrivateLayout/>}>
                <Route path='' element={<Perfil/>}/>
                <Route path='usuarios' element={<Usuarios/>}/>
                <Route path='proyectos' element={<Proyectos/>}/>
                <Route path='inscripciones' element={<Inscripciones/>}/>
                <Route path='avances' element={<Avances/>}/>
              </Route>

              <Route path='/auth' element={<AuthLayout/>}>
                <Route path='' element={<Login/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registro' element={<Registro/>}/>
              </Route>

              <Route path='*' element={<Error404/>}/>
                    
            </Routes>

          </Router>
              
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
