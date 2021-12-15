import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUser } from 'context/userContext';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { Link } from 'react-router-dom';
import { Enum_EstadoProyecto, Enum_TipoObjetivo } from '../../utils/enum.js';

//DEPENDENCIAS & HOOKS
import { Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { nanoid } from 'nanoid';
import useFormData from '../../hooks/useFormData';

//QUERIES & MUTATUIONS
import { obtenerProyectos } from 'graphql/Proyectos/Queries';
import { editarProyecto, crearProyecto } from '../../graphql/Proyectos/Mutations.js';
import { crearInscripcion } from '../../graphql/Incripciones/Mutations.js';
import {obtenerUsuarios} from '../../graphql/Usuarios/Queries.js';

//COMPONENTES
import PrivateComponent from '../../componets/PrivateComponent';
import Input from '../../componets/Input';
import TextArea from '../../componets/textArea';
import DropDown from '../../componets/Dropdown';
import ButtonLoading from '../../componets/ButtonLoading';
import {AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled} from '../../componets/Accordion';



const Proyectos =()=> {
  const [mostrarProyectos, setMostrarProyectos] = useState(true);
  const [textoBoton, setTextoBoton] = useState('Nuevo Proyecto');
  const { data: dataProyectos, loading: loadingProyectos, error: errorProyectos } = useQuery(obtenerProyectos);

  useEffect(() => {
    if (mostrarProyectos) {
      setTextoBoton('Nuevo Proyecto');
    } else {
      setTextoBoton('Todos Los Proyectos');
    }
  }, [mostrarProyectos]);

  useEffect(() => {
    if (errorProyectos) {
      toast.error('Error Consultando Proyectos', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
  }, [errorProyectos]);

  if (loadingProyectos) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;
          return (
            <div className='flex h-full w-full flex-col items-center justify-start p-8'>
              <div className='flex flex-col'>
                <h2 className='text-3xl pt-12 pb-10 font-extrabold text-gray-800'>
                Administración de Proyectos
              </h2>
              <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
                <button
                  onClick={() => {
                  setMostrarProyectos(!mostrarProyectos);}}
                  className={`shadow-md fondo1 text-gray-300 font-bold p-2 rounded m-6  self-center`}>
                  {textoBoton}
                </button>
              </PrivateComponent>
              </div>
              {mostrarProyectos ? (
              <ListaProyectos/>
              ) : (
            <FormularioCreacionProyecto setMostrarProyectos={setMostrarProyectos}/>)}
            </div>
          );
};

const ListaProyectos = ()=> {
  const { data: dataProyectos, loading: loadingProyectos, error: errorProyectos } = useQuery(obtenerProyectos);
  if (dataProyectos.Proyectos) {return (
    <div className='p-4 flex w-10/12 flex-col'>
      {dataProyectos.Proyectos.map((proyecto) => {
        return <AcordionProyectos proyecto={proyecto} />;
      })}
    </div>
  );
  }
};

const AcordionProyectos =({proyecto}) => {
  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [modificarProyecto, { data: mutacionProyecto, loading, error }] = useMutation(editarProyecto, {refetchQueries:[{ query: obtenerProyectos}]});
  
  const [infoNuevoProyecto, setInfoNuevoProyecto] = useState({
    _id: proyecto._id,
    nombre: proyecto.nombre,
    fechaInicio: proyecto.fechaInicio,
    fecha_fin: proyecto.fecha_fin,
    lider: proyecto.lider,
    presupuesto: proyecto.presupuesto,
    fase: proyecto.fase,
    estado: proyecto.estado,
  });

  const actualizarProyecto = () => {
    console.log("Le Di a Editar Proyecto:", infoNuevoProyecto)
    modificarProyecto({ 
      variables: { ...infoNuevoProyecto }
    })
  };

  return (

    edit? (
      <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between items-center'>
              <span className='font-bold text-gray-600 pr-8'>ID: {proyecto._id.slice(20)}</span>
              <div className='font-bold text-gray-600 pr-8'>
                <input 
                  type="text" 
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                  value={infoNuevoProyecto.nombre}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, nombre: e.target.value })}/>
              </div>
  
              <div>
                <select
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-24'
                  name='estado'
                  required
                  defaultValue={infoNuevoProyecto.estado}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, estado: e.target.value })}>
                    <option disabled value={0}>
                      Seleccione Una Opción
                    </option>
                    <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
  
            </div>

          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <PrivateComponent roleList={['ADMINISTRADOR']}>
            {edit? (
                <>
                  <i
                    onClick={() => actualizarProyecto()} 
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
              
            </PrivateComponent>
            <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
              <InscripcionProyecto
                idProyecto={proyecto._id}
                estado={proyecto.estado}
                inscripciones={proyecto.inscripciones}
              />
            </PrivateComponent>
  
            {/* EDICION DATOS PROYECTOS */}
            <div className='flex justify-between items-center px-2 py-4 text-gray-600'>
  
              <div>
                <span className='font-extrabold'>Inicio: </span>
                <input 
                  type="date" 
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                  defaultValue={infoNuevoProyecto.fechaInicio}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fechaInicio: e.target.value })}/>
              </div>
              <div>
                <span className='font-extrabold'>Fin: </span>
                <input 
                  type="date" 
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                  value={infoNuevoProyecto.fechaFin}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fechaFin: e.target.value })}/>
              </div>
              <div>
                <span className='font-extrabold'>Fase: </span>
                <select
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-24'
                  name='fase'
                  required
                  defaultValue={infoNuevoProyecto.fase}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, fase: e.target.value })}>
                    <option disabled value={0}>
                      Seleccione Una Opción
                    </option>
                    <option value="INICIADO">Iniciado</option>
                    <option value="DESARROLLO">Desarrollo</option>
                    <option value="TERMINADO">Terminado</option>
                </select>
              </div>
            </div>
            <div className='flex justify-center items-center px-2 py-4 text-gray-600'>
              <div className='px-8'>
                <span className='font-extrabold'>Presupuesto: </span>
                <input 
                  type="number" 
                  className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                  value={infoNuevoProyecto.presupuesto}
                  onChange={(e) => setInfoNuevoProyecto({ ...infoNuevoProyecto, presupuesto: e.target.value })}/>
              </div>
  
              <div className='px-8'>
                <span className='font-extrabold'>Lider: </span>
                {proyecto.lider.nombre} {proyecto.lider.apellido}
              </div>
            </div>
  
            {/* OBJETIVOS PROYECTOS */}
            <div className='flex'>
              {proyecto.objetivos.map((objetivo) => {
                return <ListaObjetivos tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
              })}
            </div>
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        <Dialog
          open={showDialog}
          onClose={() => {setShowDialog(false);}}>
          <FormularioEditarProyecto _id = {proyecto._id} />
        </Dialog>
        </>

      ):(

        <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between items-center'>

              <span className='font-bold text-gray-600 pr-8'>ID: {proyecto._id.slice(20)}</span>
  
              <div className='font-bold text-gray-600 pr-8'>
                {proyecto.nombre}
              </div>
  
              <div className={
                proyecto.estado === 'ACTIVO' ? 'relative inline-block mx-4 px-3 py-2 leading-tight bg-green-500 text-white text-center text-sm font-semibold opacity-80 rounded-full' 
                :'relative inline-block mx-4 px-1 py-2 leading-tight bg-red-500 text-white text-center text-sm font-semibold opacity-80 rounded-full'}>
                {proyecto.estado}
              </div>
  
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <PrivateComponent roleList={['ADMINISTRADOR']}>
              <i
                className='mx-4 fas fa-edit text-gray-600 hover:text-yellow-600'
                onClick={() => setEdit(!edit)}
              />
            </PrivateComponent>
            <PrivateComponent roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
              <InscripcionProyecto
                idProyecto={proyecto._id}
                estado={proyecto.estado}
                inscripciones={proyecto.inscripciones}
              />
            </PrivateComponent>
  
            {/* DATOS PROYECTOS */}
            <div className='flex justify-between px-2 py-4 text-gray-600'>
  
              
              <div>
                <span className='font-extrabold'>Inicio: </span>
                {proyecto.fechaInicio.slice(0, -14)}
              </div>
              <div>
                <span className='font-extrabold'>Fin: </span>
                {proyecto.fechaFin.slice(0, -14)}</div>
              <div>
                <span className='font-extrabold'>Fase: </span>
                {proyecto.fase}
              </div>
            </div>
            <div className='flex justify-center px-2 py-4 text-gray-600'>
              <div className='px-8'>
                <span className='font-extrabold'>Presupuesto: </span>
                ${proyecto.presupuesto}
              </div>
  
              <div className='px-8'>
                <span className='font-extrabold'>Lider: </span>
                {proyecto.lider.nombre} {proyecto.lider.apellido}
              </div>
            </div>
  
            {/* OBJETIVOS PROYECTOS */}
            <div className='flex'>
              {proyecto.objetivos.map((objetivo) => {
                return <ListaObjetivos tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
              })}
            </div>
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        <Dialog
          open={showDialog}
          onClose={() => {setShowDialog(false);}}>
          <FormularioEditarProyecto _id = {proyecto._id} />
        </Dialog>
      </>
      )

  );


};


/////////////////////////////////////////////////////////////////////


const FormularioEditarProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [modificarProyecto, { data: dataMutation, loading, error }] = useMutation(editarProyecto, {refetchQueries:[{ query: obtenerProyectos }]});

  const submitForm = (e) => {
    e.preventDefault();
    modificarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'>

        <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} />
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

const ListaObjetivos = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 text-gray-600 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-md font-bold'>Objetivo: {tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='text-indigo-600 text-sm underline'>Editar</div>
      </PrivateComponent>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [Inscribirse, { data, loading, error }] = useMutation(crearInscripcion,
    {
      refetchQueries: [{ query: obtenerProyectos }],
    }
  );
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter((el) => el.estudiante._id === userData._id);
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success('Inscripción Exitosa', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      });
    }
  }, [data]);

  const confirmarInscripcion = () => {
    Inscribirse({ variables: { proyecto: idProyecto, estudiante: userData._id } });
  };

  return (
    <>
    <PrivateComponent roleList={['ESTUDIANTE']}>
      {estadoInscripcion !== '' ? (
        <span className='bg-red-500 border-2'>Ya Estás Inscrito {estadoInscripcion}</span>
      ) : (
        
          <ButtonLoading
            onClick={() => confirmarInscripcion()}
            disabled={estado === 'INACTIVO'}
            loading={loading}
            text='Inscribirme'
            className='border-2 rounded-lg ml-2 p-1 bg-yellow-300 text-gray-600 font-bold'
          />
        
      )}
    </PrivateComponent>  
    </>
  );
};

const FormularioCreacionProyecto = ({mostrarProyectos, setMostrarProyectos}) => {
  const { form, formData, updateFormData } = useFormData();
  const [listaLideres, setListaLideres] = useState({});
  const { data: dataUsuarios, loading: loadingUsuarios, error: errorUsuarios } = useQuery(obtenerUsuarios, 
    {
    variables: {
      filtro: { rol: 'LIDER', estado: 'AUTORIZADO' },
    },
  }
  );
  console.log('Datos Usuarios', dataUsuarios);
  const [nuevoProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(crearProyecto, {refetchQueries:[{ query: obtenerProyectos }]});

  useEffect(() => {
    if (loadingUsuarios) return <div>
        <h1 className='text-3xl font-extrabold'>Cargando...</h1>
        <ReactLoading type='bars' color='#11172d' height={467} width={175} />
      </div>;
  });

  useEffect(() => {
    console.log(dataUsuarios);
    if (dataUsuarios) {
      const lideres = {};
      dataUsuarios.Usuarios.forEach((elemento) => {
        lideres[elemento._id] = elemento.nombre;
      });

      setListaLideres(lideres);
      mostrarProyectos = false ;
      console.log('MostrarProyectos', mostrarProyectos)
    }
  }, [dataUsuarios]);

  const submitForm = (e) => {
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);
    nuevoProyecto({
      variables: formData,
    });
    toast.success('Proyecto Creado Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    });
    setMostrarProyectos(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold pb-4 mb-4 mt-4 text-gray-800'>Nuevo Proyecto</h2>
    
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        
        <label className='flex flex-col py-2 text-gray-800 font-bold' for='nombre'>
          Nombre del Proyecto:
        </label>
        <Input 
          name='nombre'
          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full' 
          required={true} 
          type='text'/>

        <div className='flex m-4 justify-center items-center'>
          <label className='flex flex-col py-2 text-gray-800 font-bold text-center' for='fechaInicio'>
            Inicio: 
          </label>
          <Input 
            name='fechaInicio'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} 
            type='date'/>
          
          <label className='flex flex-col py-2 px-2 text-gray-800 font-bold text-center ml-14' for='fechaFin'>
            Finalización: 
          </label>
          <Input 
            name='fechaFin'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} 
            type='date'/>
        </div>

        <div className='flex m-4 justify-center items-center'>

          <label className='flex flex-col mr-2 py-2 text-gray-800 font-bold text-center' for='lider'>
            Líder: 
          </label>
          <DropDown 
            options={listaLideres}
            name='lider'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} />
          
          <label className='flex flex-col py-2 px-1 text-gray-800 font-bold text-center ml-14' for='presupuesto'>
          Presupuesto:
          </label>
          <Input 
            name='presupuesto'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} 
            type='number'/>
        </div>

        {/* <div className='justify-center items-center'>
          <label className='flex flex-col mt-2 py-2 font-bold text-gray-800 text-center' for='generales'>
            Objetivos Generales
          </label>
          <TextArea
          name='descripcion'
          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200 rounded text-sm shadow-lg focus:outline-none focus:ring w-96 justify-center'
          rows="8"
          cols="20"
          required={true}/>
        </div> */}



        <div className='flex m-4 pt-6 justify-center items-center'>
          <Objetivos />
        </div>

        <div className='flex m-4 justify-center items-center'>
          <ButtonLoading 
            text='Crear Proyecto' 
            loading={false} 
            disabled={false}
            className='fondo1 text-white active:bg-gray-700 text-md font-bold mt-5 px-6 py-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-60 transform hover:translate-y-1 transition-transform ease-in duration-200' />
        </div>

      </form>
    </div>
    
      
    
  );

};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span className='flex flex-col mt-2 py-2 font-bold text-gray-800 text-center'>
          Objetivos del Proyecto
        </span>
        {!maxObjetivos && (
          <i
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
            className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
          />
        )}
        {listaObjetivos.map((objetivo) => {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div>
    
    <div className='flex items-center'>
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label='Tipo: '
        required={true}
      />
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción: '
        type='text'
        required={true}
      />
      <i
        onClick={() => eliminarObjetivo(id)}
        className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6'
      />
    </div>

    </div>
  );
};

export default Proyectos;