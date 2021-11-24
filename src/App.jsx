import React from "react";
import { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from "context/userContext";
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'


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
  uri: 'https://servidor-proyectorio.herokuapp.com/graphql'
})
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [userData, setUserData] = useState({});
  return (

    <ApolloProvider client={client}>
      
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
    
    </ApolloProvider>
  );
}

export default App;
