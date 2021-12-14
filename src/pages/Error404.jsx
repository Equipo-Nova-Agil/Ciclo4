import React from "react";
import NavAuth from "componets/NavbarAuth";
import Footer from "componets/Footer";

const Error404 = () => {
    return (
        
    <div className='flex flex-col justify-between h-screen'>

        <NavAuth/>
  
        <main className='h-full w-full overflow-y-scroll bg-black'>
            <div className='flex flex-col justify-center pt-40  w-full py-4 text-center font-bold'>
                <div className="pb-6 text-6xl text-red-600">
                    <h1>ERROR 404</h1>
                </div>
                <div className="text-3xl text-white">
                    <h2> La Página Solicitada No Existe.</h2>
                    <h2>Regresa Al Inicio.</h2>
                </div>
            </div>
        </main>

        <Footer/>
      
    </div>
    );
};

export default Error404;
       
  
        


 
  
       
    
 