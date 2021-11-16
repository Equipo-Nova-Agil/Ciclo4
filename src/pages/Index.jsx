import React from 'react';

//imagenes
import Proyectos from '../media/pedro-miranda-unsplash.jpeg';
import Asesores1 from '../media/Asesores1-800x800.png';
import Asesores2 from '../media/Asesores2-800x800.png';
import Asesores3 from '../media/Asesores3-800x800.png';
import Asesores4 from '../media/Asesores4-470x470.png';


const Index = () => {
  return <div>
    
  <body id="inicio" className="text-gray-800 antialiased">
    <main>

      {/* //BANNER */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center altura-cover">
        <div className="absolute top-0 w-full h-full bg-center bg-cover fondo-cover">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black">
          </span>
        </div>
      
        <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Potencia Tus Ideas.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Este es el portal de proyectos de investigación de la Universidad, dónde podrás organizar, planificar y crear grupos para tus proyectos de investigación, además de solicitar aseosrías pertinente para una mejor cosecución de estos. 
                  </p>
                </div>
              </div>
            </div>
        </div>

        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden svg1">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100">
            </polygon>
          </svg>
        </div>

      </div>

      {/* CARDS */}
      <section className="pb-20 bg-gray-300 -mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">

            {/* Organiza */}
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-sitemap"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Organiza Tus Proyectos</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Puedes gestionar, planificar y estructurar tu proyecto. Establecer planes de trabajo y metas a cumplir. Dale un norte a tu investigación
                    </p>
                  </div>
                </div>
            </div>

            {/* Equipo */}
            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-users"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Trabaja En Equipo</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Con la consolidación de equipos de trabajo, tu proyecto de investigación tomará más fuerza, donde cada participante prodrá aportar a la investigación.
                  </p>
                </div>
              </div>
            </div>

            {/* Asesoría */}
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Solicita Asesorías</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Asesórate con los mejores profecionales, la unversidad cuenta con todo un equipo de trabajo dispuesto a ayudarte.
                  </p>
                </div>
              </div>
            </div>
              
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="relative py-20">
          {/* División svg */}
          <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 svg2">
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100">
              </polygon>
            </svg>
          </div>
          <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src={Proyectos} alt="proyectos" width="620"
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div
                  className="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300"
                >
                  <i className="fab fa-slideshare text-4xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">Nuestros Proyectos Más Recientes</h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Si deseas participar en nuestro directorio de proyectos, lo puedes hacer de una manera muy fácil sólo siguiendo los siguientes pasos:
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span
                          className="text-blue-600 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full  bg-gray-200 mr-3"
                          ><i className="fas fa-user-plus"></i
                        ></span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">
                          Regístrate en Nuestra Plataforma 
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-blue-600 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full  bg-gray-200 mr-3">
                          
                          <i className="fas fa-cloud-upload-alt"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Sube tu proyecto de investigación</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-blue-600 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-200 mr-3">
                          <i className="fas fa-hands-helping"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Solicita apoyo mediante asesorías, si la ne esitas.</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span
                          className="text-blue-600 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full  bg-gray-200 mr-3"
                          ><i className="fas fa-retweet"></i
                        ></span>
                      </div>
                      <div>
                        <h4 className="text-gray-600">Comparte y recibe retroalimentación.</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORÍA</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Proyecto de Investigación # 1</h1>
                <p className="leading-relaxed mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus...</p>
                <a className="text-blue-500 inline-flex items-center">Leer más
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORÍA</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Proyecto de Investigación # 2</h1>
                <p className="leading-relaxed mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus...</p>
                <a className="text-blue-500 inline-flex items-center">Leer más
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORÍA</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Proyecto de Investigación # 3</h1>
                <p className="leading-relaxed mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus...</p>
                <a className="text-blue-500 inline-flex items-center">Leer más
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                  <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* ASESORES */}
      <section id="equipo" className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">Nuestros Asesores Más Destacados</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa saepe ex corporis facilis, qui iusto earum laborum eum natus illo delectus suscipit nemo, ea itaque? Eaque minima alias aperiam perspiciatis..
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="Asesor"
                  src={Asesores1}
                  className="shadow-lg rounded-full max-w-full mx-auto asesores"/>
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Asesor</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Departamento de Ingeniería
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-twitter"></i></button>
                      <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-facebook-f"></i></button>
                      <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="Asesora"
                  src={Asesores2}
                  className="shadow-lg rounded-full max-w-full mx-auto asesores"/>
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Asesora</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Departamento de Mercadeo
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-google"></i></button>
                      <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="Asesora"
                  src={Asesores3}
                  className="shadow-lg rounded-full max-w-full mx-auto asesores"/>
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Asesora</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Departamento de Diseño
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-google"></i></button>
                      <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-twitter"></i></button>
                      <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="Asesora"
                  src={Asesores4}
                  className="shadow-lg rounded-full max-w-full mx-auto asesores"/>
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Asesor</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    Decano y Fundador
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-dribbble"></i></button>
                      <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-google"></i></button>
                      <button
                      className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-twitter"></i></button>
                      <button
                      className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button">
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CONTACTO */}
      <section id="contacto" className="pb-20 relative block bg-gray-900">
        <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 svg2">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
            <polygon
              className="text-gray-900 fill-current"
              points="2560 0 2560 100 0 100">
            </polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Construye tus Ideas</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim repellat dolorem dolor. Molestias, voluptatum nobis officia, dolores illo optio sapiente ex esse nostrum ipsam est maxime tenetur quam veritatis in..
              </p>
            </div>
          </div>
          
        </div>
      </section>
      <section className="relative block py-24 lg:pt-0 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div
                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300"
              >
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold">¿Deseas Contactárnos?</h4>
                  <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                    Completa este formulario y te contactarémos lo antes posible.
                  </p>

                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="full-name">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full transicion"
                      placeholder="Escribe tu nombre completo"/>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="email">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full transicion"
                      placeholder="Escribe tu correo electrónico"/>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2" for="message">
                      Mensaje
                    </label>
                    <textarea
                      rows="4"
                      cols="80"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder= "Escribe tu mensaje..." >
                    </textarea>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transicion"
                      type="button">
                      Enviar Mensaje
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </body>

  </div>;
};

export default Index;

      




  
