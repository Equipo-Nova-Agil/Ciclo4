import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useUser } from 'context/userContext';
import { ObservacionContext, useObservacion } from '../../context/observacionContext.js';
import { useQuery, useMutation } from '@apollo/client';
import { Enum_TipoObservacion } from '../../utils/enum.js';


//DEPENDENCIAS & HOOKS
import { Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import ReactLoading from 'react-loading';
import useFormData from '../../hooks/useFormData';

//QUERIES & MUTATUIONS
import {obtenerAvances, filtrarAvance} from '../../graphql/Avances/Queries.js';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries';
import {obtenerProyectos} from '../../graphql/Proyectos/Queries';
import {crearAvance, editarAvance, eliminarAvance} from '../../graphql/Avances/Mutations'

//COMPONETS
import Input from '../../componets/Input';
import TextArea from '../../componets/textArea';
import DropDown from "componets/Dropdown.jsx";
import ButtonLoading from "componets/ButtonLoading.jsx";
import PrivateComponent from '../../componets/PrivateComponent';
import {AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled} from '../../componets/AccordionAvances';


const Avances = () => {
  const [mostrarAvances, setMostrarAvances] = useState(true);
  const [agregarObservaciones, setAgregarObservaciones] = useState(false);
  const [textoBoton, setTextoBoton] = useState('Nuevo Avance');
  const [avance, setAvance] = useState({})
  const {loading: loadingAvances, data: dataAvances, error:errorAvances} = useQuery (obtenerAvances);
  
  useEffect(() => {
    if (agregarObservaciones) {
      setMostrarAvances(false);
    }else{
      setMostrarAvances(true);
    } 
  }, [agregarObservaciones]);

  useEffect(() => {
    if (mostrarAvances) {
      setTextoBoton('Nuevo Avance');
    } else {
      setTextoBoton('Todos Los Avances');
    }
  }, [mostrarAvances]);

  useEffect(() => {
    if (errorAvances) {
      toast.error('Error Consultando Avances', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
  }, [errorAvances]);

  if (loadingAvances) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;


    return (
      <div className='flex h-full w-full flex-col items-center justify-start p-8'>
              <div className='flex flex-col'>
                <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
                Administración de Avances
                </h2>
                {agregarObservaciones & !mostrarAvances ? (
                <></>
                ) : (
                <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
                  <button
                    onClick={() => {setMostrarAvances(!mostrarAvances);}}
                    className={`shadow-md fondo1 text-gray-300 font-bold p-2 rounded m-6  self-center`}>
                    {textoBoton}
                  </button>
                </PrivateComponent>
                )}
              </div>
              {agregarObservaciones & !mostrarAvances ? (
                <Observaciones
                  setAgregarObservaciones={setAgregarObservaciones}
                  agregarObservaciones={agregarObservaciones}
                  avance={avance}/>
              ) : mostrarAvances ? (
                <ListaAvances
                  setAgregarObservaciones={setAgregarObservaciones}
                  agregarObservaciones={agregarObservaciones}/>
        
              ) : (
                <FormularioCreacionAvance
                setMostrarAvances={setMostrarAvances}
              />
            )}
            </div>
          );
};

const ListaAvances = ()=> {
  const { data: dataAvances, loading: loadingAvances} = useQuery(obtenerAvances);
  if (loadingAvances) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;
  if (dataAvances.Avances) {
    return (
    <div className='p-4 flex w-10/12 flex-col'>
      {dataAvances && dataAvances.Avances.map((avance) => {
        return <AcordionAvances avance={avance} />;
      })}
    </div>
  );
  }

};

const AcordionAvances =({avance, agregarObservaciones, setAgregarObservaciones}) => {
  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [modificarAvance, { data: mutacionAvance, loading, error }] = useMutation(editarAvance, {refetchQueries:[{ query: obtenerAvances}]});
  
  const [infoNuevoAvance, setInfoNuevoAvance] = useState({
    _id: avance._id,
    fecha: avance.fecha,
    proyecto: avance.proyecto,
    descripcion: avance.descripcion,
    creadoPor: avance.creadoPor, 
  });

  const actualizarAvance = () => {
    console.log("Le Di a Editar Proyecto:", infoNuevoAvance)
    modificarAvance({ 
      variables: { ...infoNuevoAvance }
    })
  };

  return (

    edit? (
      <>
        <AccordionStyled>
          {/* ENCABEZADO ARCORDEON */}
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full items-center'>

              <span className='font-bold text-gray-600 pr-8'>ID: {avance._id.slice(20)}</span>
              <div className='font-extrabold text-gray-600 uppercase justify-center items-center'>
                {avance.proyecto.nombre}
              </div>
            </div>
          </AccordionSummaryStyled>

          <AccordionDetailsStyled>
            {/* <PrivateComponent roleList={['ADMINISTRADOR']}> */}
            {edit? (
                <>
                  <i
                    onClick={() => actualizarAvance()} 
                    className="fas fa-check hover:text-green-600 pr-2"/>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban hover:text-red-700 pl-2'/>
                </>
              ):(
                <>
                  <i
                    onClick={() => setEdit(!edit)}
                    className="fas fa-edit hover:text-yellow-600"/>
                
                </>
              )}
              
            {/* </PrivateComponent> */}
            
  
            {/* EDICION DATOS PROYECTOS */}
            <div className='flex justify-between items-center px-2 py-4 text-gray-600'>
  
              <div>
                <span className='font-extrabold'>Fecha: </span>
                {avance.fecha.slice(0, -14)}
              </div>
              <div>
                <span className='font-extrabold'>Creado Por: </span>
                {avance.creadoPor.nombre} {avance.creadoPor.apellido}
              </div>
              <div className='px-8'>
                <span className='font-extrabold'>Líder: </span>
                {avance.proyecto.lider.nombre} {avance.proyecto.lider.apellido}
              </div>
            </div>
            <div className='flex justify-center items-center px-2 py-4 text-gray-600'>
              <div className='px-8'>
                <span className='font-extrabold'>Descripcion: </span>
                <TextArea
                name='descripcion'
                rows="4"
                cols="25"
                className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                // defaultValue={infoNuevoAvance.descripcion}
                onChange={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, descripcion: e.target.value })}
                />
              </div>
  
              
            </div>
  
            {/* OBSERVACIONES AVANCES */}
            {/* <div className='flex'>
              {avance.observaciones.map((observacion) => {
                return <ListaObservaciones tipo={observacion.tipo} descripcion={observacion.descripcion} />;
              })}
            </div> */}
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        {/* <Dialog
          open={showDialog}
          onClose={() => {setShowDialog(false);}}>
          <FormularioEditarProyecto _id = {proyecto._id} />
        </Dialog> */}
        </>

      ):(

        <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full  items-center'>

              <span className='font-bold text-gray-600 pr-1'>ID: </span>
              <span className=' text-gray-600 pr-8'>{avance._id.slice(20)}</span>

              <div className='font-extrabold text-gray-600 uppercase justify-center items-center'>
                {avance.proyecto.nombre}
              </div>
            </div>

          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
              <i
                className='mx-4 fas fa-edit text-gray-600 hover:text-yellow-600'
                onClick={() => setEdit(!edit)}
              />
            </PrivateComponent>
  
            {/* DATOS AVANCES */}
            <div className='flex justify-between px-2 py-4 text-gray-600'>
  
              <div>
                <span className='font-extrabold'>Fecha: </span>
                {avance.fecha.slice(0, -14)}
              </div>
              <div>
                <span className='font-extrabold'>Creado Por: </span>
                {avance.creadoPor.nombre} {avance.creadoPor.apellido}
              </div>
              <div className='px-8'>
                <span className='font-extrabold'>Líder: </span>
                {avance.proyecto.lider.nombre} {avance.proyecto.lider.apellido}
              </div>
            </div>
            <div className='flex justify-center px-2 py-4 text-gray-600'>
              <div>
                <span className='font-extrabold'>Descripción: </span>
                {avance.descripcion}
              </div>
            </div>
            
              <h1 className='font-bold text-gray-600 text-center mt-8 mb-2'>Observaciones Del Líder:</h1>
              <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
                <button
                  className='bg-yellow-300 rounded-lg p-1 text-sm text-gray-600 hover:text-blue-900'
                  type="button"
                  title="Ver Detalles"
                  onClick={() => setAgregarObservaciones (!agregarObservaciones)}>
                  <i className="fa fa-eye "></i> Agregar
                </button>
              </PrivateComponent>

            
  
            {/* OBSERVACIONES AVANCES */}
            {/* <div className='flex'>
              {avance.observaciones.map((observacion) => {
                return <ListaObservaciones tipo={observacion.tipo} descripcion={observacion.descripcion} />;
              })}
            </div> */}
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        
      </>
      )

  );


};

const FormularioCreacionAvance = ({mostrarAvances, setMostrarAvances}) => {
  const { form, formData, updateFormData } = useFormData();
  const [listaLideres, setListaLideres] = useState({});
  const [listaProyectos, setListaProyectos] = useState({});
  const {data: dataProyectos, loading: loadingProyectos} = useQuery (obtenerProyectos);
  const { userData} = useUser();
  const { data: dataUsuarios, loading: loadingUsuarios, error: errorUsuarios } = useQuery(obtenerUsuarios
    , 
    {
    variables: {
      filtro: { _id: userData._id },
    },
  }
  );

  const proyectosInscritos= dataUsuarios && dataUsuarios.Usuarios[0].inscripciones.filter(p => (p.proyecto.fase === 'INICIADO')||(p.proyecto.fase ==='DESARROLLO'));
  console.log('Lista Proyectos Inscritos', proyectosInscritos)
  const [nuevoAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(crearAvance, {refetchQueries:[{ query: obtenerAvances }]});

  useEffect(() => {
    if (loadingUsuarios) return <div>
        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
      </div>;
  });

  useEffect(() => {
    if (dataUsuarios) {
      const py = {};
      proyectosInscritos.forEach((p) => {
        py[p.proyecto._id] = p.proyecto.nombre;
      });
      setListaProyectos(py);
      mostrarAvances = false ;
    }
  }, [dataUsuarios]);

  const submitForm = (e) => {
    e.preventDefault();
    formData.observaciones = Object.values(formData.observaciones);
    formData.proyecto = formData.toString(formData.proyecto);
    formData.creadoPor = userData._id;

    nuevoAvance({
      variables: formData,
    });
    toast.success('Avance Creado Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    });
    setMostrarAvances(true);
  };

  return(
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 mb-4 mt-4 text-gray-800'>Nuevo Avance</h2>
    
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        

        

        <div className='flex flex-col m-4 justify-center items-center'>

        <label className='flex flex-col py-2 text-gray-800 font-bold text-center' for='fecha'>
            Fecha: 
          </label>
          <Input 
            name='fecha'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} 
            type='date'/>

          <label className='flex flex-col mr-2 py-2 text-gray-800 font-bold text-center' for='proyecto'>
            Proyecto: 
          </label>
          <DropDown 
            options={listaProyectos}
            name='proyecto'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} />
        </div>

        <div className='justify-center items-center'>
          <label className='flex flex-col mt-2 py-2 font-bold text-gray-800 text-center' for='descripcion'>
            Descripción Del Avance:
          </label>
          <TextArea
          name='descripcion'
          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200 rounded text-sm shadow-lg focus:outline-none focus:ring w-96 justify-center'
          rows="8"
          cols="20"
          required={true}/>
        </div>



        <div className='flex m-4 pt-6 justify-center items-center'>
          <Observaciones />
        </div>

        <div className='flex m-4 justify-center items-center'>
          <ButtonLoading 
            text='Crear Avance' 
            loading={false} 
            disabled={false}
            className='fondo1 text-white active:bg-gray-700 text-md font-bold mt-5 px-6 py-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-60 transform hover:translate-y-1 transition-transform ease-in duration-200' />
        </div>

      </form>
    </div>

  );


};

const ListaObservaciones = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 text-gray-600 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-md font-bold'>
        Observación: 
        {/* {tipo} */}
      </div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='text-indigo-600 text-sm underline'>Editar</div>
      </PrivateComponent>
    </div>
  );
};

const Observaciones = () => {
  const [listaObservaciones, setListaObservaciones] = useState([]);
  const [maxObservaciones, setMaxObservaciones] = useState(false);

  const eliminarObservacion = (id) => {
    setListaObservaciones(listaObservaciones.filter((ob) => ob.props.id !== id));
  };

  const componenteObservacionAgregada = () => {
    const id = nanoid();
    return <FormularioObservacion key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObservaciones.length > 4) {
      setMaxObservaciones(true);
    } else {
      setMaxObservaciones(false);
    }
  }, [listaObservaciones]);

  return (
    <ObservacionContext.Provider value={{ eliminarObservacion }}>
      <div>
        <span className='flex flex-col mt-2 py-2 font-bold text-gray-800 text-center'>
          Observaciones del Líder
        </span>
        {!maxObservaciones && (
          <i
            onClick={() => setListaObservaciones([...listaObservaciones, componenteObservacionAgregada()])}
            className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-1 mx-2 cursor-pointer'
          />
        )}
        {listaObservaciones.map((observacion) => {
          return observacion;
        })}
      </div>
    </ObservacionContext.Provider>
  );
};

const FormularioObservacion = ({ id }) => {
  const { eliminarObservacion } = useObservacion();
  return (
    <div>
    
    <div className='flex flex-col items-center'>
      <div className='pt-4 pb-2'>
        <DropDown
          name={`nested||observaciones||${id}||tipo`}
          options={Enum_TipoObservacion}
          className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48'
          label='Tipo: '
          required={true}
        />
      </div>

      <div className='-ml-12'>
        <Input
          name={`nested||observaciones||${id}||descripcion`}
          label='Descripción: '
          type='text'
          className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-48'
          required={true}
        />

      </div>
      <i
        onClick={() => eliminarObservacion(id)}
        className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-1 mx-2 cursor-pointer mt-6'
      />
    </div>

    </div>
  );
};


export default Avances;