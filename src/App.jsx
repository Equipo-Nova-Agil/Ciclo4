import React from "react";
import { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/userContext";


//Layouts
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from "layouts/PrivateLayout";

//Pages
import Index from './pages/Index';
import Error404 from "pages/Error404";
import Usuarios from './pages/admin/Usuarios';
import Proyectos from './pages/admin/Proyectos';
import Perfil from "pages/admin/Perfil";
import Inscripciones from "pages/admin/Inscripciones";
import Avances from "pages/admin/Avances";




function App() {
  const [userData, setUserData] = useState({});
  return (

    <Auth0Provider
      domain="ezequiellr.us.auth0.com"
      clientId="0b1BbovaR2Sm4kaPTWwnNgr13Fayd0fV"
      redirectUri="http://localhost:3000/admin"
      audience='autenticacion-proyectorio'>


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

              <Route path='*' element={<Error404/>}/>
                
            </Routes>

          </Router>
          
        </UserContext.Provider>
      
    </Auth0Provider>
  );
}

export default App;
