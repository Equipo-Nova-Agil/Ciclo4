import React from 'react'

const ErrorAuth = () => {
    return (
        <main className='h-full w-full overflow-y-scroll bg-black'>
            <div className='flex flex-col justify-center pt-40  w-full py-4 text-center font-bold'>
                <div className="pb-6 text-6xl text-red-600">
                <h1>ERROR DE AUTENTICACIÓN</h1>
                </div>
                <div className="text-3xl text-white">
                <h2> No Puedes Acceder A Este Sitio</h2>
                <h2>Sin Autenticarte Primero.</h2>
                </div>
            </div>
        </main>
    )
}

export default ErrorAuth
