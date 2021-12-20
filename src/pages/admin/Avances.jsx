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
import {crearAvance, editarAvance, eliminarAvance, crearObservacion, editarObservacion, eliminarObservacion} from '../../graphql/Avances/Mutations'

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
  const {data: dataAvances, loading: loadingAvances, error:errorAvances} = useQuery (obtenerAvances);
  
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
    console.log('Datos Avances Desde El Backend', dataAvances);
  }, [dataAvances]);

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
                
                <AgregarObservaciones
                  setAgregarObservaciones={setAgregarObservaciones}
                  agregarObservaciones={agregarObservaciones}
                  avance={avance}
                  _id = {avance._id}
                  idAvance={avance._id}/>
                  
              ) : mostrarAvances ? (

                <ListaAvances
                  setAgregarObservaciones={setAgregarObservaciones}
                  agregarObservaciones={agregarObservaciones}/>
        
              ) : (

                <FormularioCreacionAvance
                setMostrarAvances={setMostrarAvances}/>
            )}
            </div>
          );
};

const ListaAvances = ({ setAgregarObservaciones, agregarObservaciones})=> {
  const { data: dataAvances, loading: loadingAvances} = useQuery(obtenerAvances);
  if (loadingAvances) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;
  if (dataAvances.Avances) {
    return (
    <div className='p-4 flex w-10/12 flex-col'>
      {dataAvances && dataAvances.Avances.map((avance) => {
        console.log('Lo que sea', avance._id)
        return <AcordionAvances
                key={avance._id}  
                avance={avance} 
                agregarObservaciones={agregarObservaciones}
                setAgregarObservaciones={setAgregarObservaciones}
                idAvance={avance._id}
                
                />;
      })}
    </div>
  );
  }

};

const AcordionAvances =({avance, agregarObservaciones, setAgregarObservaciones}) => {
  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [modificarAvance, { data: mutacionEditarAvance, loading:loadingEditarAvance, error: errorEditarAvance }] = useMutation(editarAvance);
    // , {refetchQueries:[{ query: obtenerAvances}]});
  const [idAv, setIdAv] = useState("");

  const [infoNuevoAvance, setInfoNuevoAvance] = useState({
    _id: avance._id,
    descripcion: avance.descripcion,
    fecha: avance.fecha,
    proyecto: avance.proyecto,
    creadoPor: avance.creadoPor, 
  });

  useEffect(() => {
    if (errorEditarAvance) {
      toast.error('Error Consultando Avances', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
  }, [errorEditarAvance]);

  if (loadingEditarAvance) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;

  

  const actualizarAvance = () => {
    console.log("Editar Proyecto:", infoNuevoAvance)
    modificarAvance({ 
      variables: {
        _id: avance._id,
        campos: infoNuevoAvance,

        // ...infoNuevoAvance 
      }
    })
    setEdit(false);
  };

  const nuevaObservacion = (idAv)=> {
    console.log('idAv', idAv);
    setIdAv (idAv);
    setAgregarObservaciones (!agregarObservaciones);
    if (setAgregarObservaciones){
      <AgregarObservaciones
      idAv={idAv}
      />
    }
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
            
  
            {/* EDICION DATOS AVANCES */}
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
                defaultValue={avance.descripcion}
                className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                onChange={(e) => setInfoNuevoAvance({ ...infoNuevoAvance, descripcion: e.target.value })}
                />
                
              </div>
  
              
            </div>
  
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        {/* <Dialog
          open={showDialog}
          onClose={() => {setShowDialog(false);}}>
          EditarAvance _id = {avance._id} />
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
              <i
                // className='mx-4 fas fa-edit text-gray-600 hover:text-yellow-600'
                // onClick={() => {setShowDialog(true);}}
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
                  className='bg-yellow-300 rounded-lg ml-6 p-1 text-sm text-gray-600 hover:text-blue-900'
                  type="button"
                  title="Agregar Observaciones"
                  onClick={() => nuevaObservacion(avance._id)}>
                  <i className="fa fa-eye "></i> Agregar
                </button>
              </PrivateComponent>

            {/* OBSERVACIONES AVANCES */}
            <div className='flex'>
              {avance.observaciones.map((observacion, index) => {
                console.log('ObservacionesID',avance._id)
                return <ListaObservaciones
                        key={nanoid()}
                        index={index}
                        _id={observacion._id}
                        idAvance={avance._id} 
                        tipo={observacion.tipo} 
                        descripcion={observacion.descripcion} />;
              })}
            </div>
  
          </AccordionDetailsStyled>
        </AccordionStyled>
        {/* <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <EditarAvance _id={avance._id} />
      </Dialog> */}
        
      </>
      )

  );


};

const EditarAvance = ({ _id}) => {
  const { form, formData, updateFormData } = useFormData();
  const [modificarAvance, { data, loading, error }] = useMutation(editarAvance);

  useEffect(() => {
    if (error) {
      toast.error('Error Consultando Avances', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
    }
  }, [error]);

  if (loading) return <div>
    <h1 className='text-3xl font-extrabold'>Cargando...</h1>
    <ReactLoading type='bars' color='#11172d' height={467} width={175} />
    </div>;

  const submitForm = (e) => {
    e.preventDefault();
    modificarAvance({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  return (
    
    <div className='p-4'>
      <h1 className='font-bold'>Editar Avance</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'>

        <TextArea
          name='descripcion'
          label='descripcion'
          rows="4"
          cols="25"
          // defaultValue={avance.descripcion}
          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
          />

        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
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

          <label className='flex flex-col py-2 text-gray-800 font-bold text-center' htmlFor='fecha'>
            Fecha: 
          </label>
          <Input 
            name='fecha'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} 
            type='date'/>

          <label className='flex flex-col mr-2 py-2 text-gray-800 font-bold text-center' htmlFor='proyecto'>
            Proyecto: 
          </label>
          <DropDown 
            options={listaProyectos}
            name='proyecto'
            className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48' 
            required={true} />
        </div>

        <div className='justify-center items-center'>
          <label className='flex flex-col mt-2 py-2 font-bold text-gray-800 text-center' htmlFor='descripcion'>
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

const Observacion = ({ index, _id, idAvance, tipo, descripcion }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [eliminarObservacion, { data: dataMutationEliminar, loading: eliminarLoading },] = useMutation(eliminarObservacion, {
    refetchQueries: [{ query: obtenerAvances }],
  });

  useEffect(() => {
    if (dataMutationEliminar) {
      toast.success('Observación Eliminada Existósamente');
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObservacion({ variables: { idAvance, idObservacion: _id } });
  };

  if (eliminarLoading)
    return (
      <ReactLoading
        data-testid='loading-in-button'
        type='spin'
        height={100}
        width={100}
      />
    );
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='flex my-2'>
          <button type='button' onClick={() => setShowEditDialog(true)}>
            <i className='fas fa-pen mx-2 text-yellow-500 hover:text-yellow-200 cursor-pointer' />
          </button>
          <button type='button' onClick={ejecutarEliminacion}>
            <i className='fas fa-trash mx-2 text-red-500 hover:text-red-200 cursor-pointer' />
          </button>
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObservacion
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idAvance={idAvance}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const EditarObservacion = ({descripcion, tipo, index, idAvance, setShowEditDialog,}) => {
  const { form, formData, updateFormData } = useFormData();

  const [modificarObservacion, { data: dataMutation, loading }] = useMutation(editarObservacion,
    {
      refetchQueries: [{ query: obtenerAvances }],
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success('Observacion Editada Exitosamente', 
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        autoClose: 3000
      })
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    modificarObservacion({
      variables: {
        idAvance,
        indexObservacion: index,
        campos: formData,
      },
    }).catch((error) => {
      toast.error('Error Editando Observación', error);
    });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900 text-center py-4'>Editar Observación</h1>
      <form className=' justify-center items-center flex flex-col' ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label=''
          name='tipo'
          required
          options={Enum_TipoObservacion}
          defaultValue={tipo}
          className='hidden'
        />
        <TextArea
          label=''
          name='descripcion'
          className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm text-center shadow-md focus:outline-none focus:ring w-48'
          rows="5"
          cols="15"
          required
          defaultValue={descripcion}
        />
        <ButtonLoading
          text='Confirmar'
          disabled={Object.keys(formData).length === 0}
          className='fondo1 text-white active:bg-gray-700 justify-center items-center text-md font-bold mt-5 px-1 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 m-2 w-60 transform hover:translate-y-1 transition-transform ease-in duration-200'
          loading={loading}
        />
      </form>
    </div>
  );
};

const ListaObservaciones = ({ index, _id, idAvance, tipo, descripcion }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [borrarObservacion,{ data: dataMutationEliminar, loading: eliminarLoading },] = useMutation(eliminarObservacion, 
    {
    refetchQueries: [{ query: obtenerAvances }],
    });


    useEffect(() => {
      if (dataMutationEliminar) {
        toast.success('Observacion Eliminada Satisfactoriamente', 
        {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000
        })
      }
    }, [dataMutationEliminar]);
  
    const ejecutarEliminacion = () => {
      borrarObservacion({ variables: { idAvance, idObservacion: _id } });
    };
  
    if (eliminarLoading)
      return (
        <ReactLoading
          data-testid='loading-in-button'
          type='spin'
          height={100}
          width={100}
        />
      );
  return (
    <div className='mx-5 my-4 text-gray-600 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-md font-bold'>
        Observación: 
      </div>
      <div className='text-center justify-center'>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <div className='flex  mt-4 mb-0'>
          <button type='button' onClick={() => setShowEditDialog(true)}>
            <i className='fas fa-edit mx-2  hover:text-yellow-600 cursor-pointer' />
          </button>
          <button type='button' onClick={ejecutarEliminacion}>
            <i className='fas fa-trash mx-2 hover:text-red-600 cursor-pointer' />
          </button>
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObservacion
            descripcion={descripcion}
            tipo={tipo}
            index={index}
            idAvance={idAvance}
            setShowEditDialog={setShowEditDialog}
          />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const Observaciones = ({idAvance, avance}) => {
  const [listaObservaciones, setListaObservaciones] = useState([]);
  const [maxObservaciones, setMaxObservaciones] = useState(false);

  const eliminarObservacion = (id) => {
    setListaObservaciones(listaObservaciones.filter((ob) => ob.props.id !== id));
  };

  const componenteObservacionAgregada = () => {
    const id = nanoid();
    return <FormularioObservacion 
              key={id} 
              id={id} />;
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
      <h2 className='text-2xl text-center font-extrabold pb-4 mb-4 mt-4 text-gray-800'>Observaciones</h2>
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

const AgregarObservaciones = ({setMostrarObservaciones, setAgregarObservaciones, agregarObservaciones, avance, idAv, setIdAv}) => {
  const { form, formData, updateFormData } = useFormData();
  
  const idAvance = idAv
  // const { data: dataAvances, loading: loadingAvances} = useQuery(obtenerAvances, {
  //   variables: {
  //     filtro: { _id: idAv },
  //   },
  // });


  

  console.log('idAv en Agregar observaciones', idAv);
  
  console.log('avance en Agregar observaciones', avance);

  const [nuevaObservacion, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(crearObservacion, {refetchQueries:[{ query: obtenerAvances }]});

  const submitForm = (e) => {
    e.preventDefault();
    formData.observaciones = Object.values(formData.observaciones);

    nuevaObservacion({
      variables: formData,
    });
    toast.success('Observación Creada Exitosamente', 
    {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "colored",
      autoClose: 3000
    });
    setMostrarObservaciones(true);
  };
  return(
    <div className='flex flex-col items-center justify-center'>
      
      <button
        className='fondo1 rounded-lg ml-6 mb-4 p-1 text-sm text-gray-200 hover:text-blue-900'
        type="button"
        title="Agregar Observaciones"
        onClick={() => setAgregarObservaciones (!agregarObservaciones)}>
        <i className="fa fa-arrow-left "></i> Regresar
      </button>

      <div className='flex justify-center items-center'>
        <h1 className='py-2 px-2 text-gray-800 font-bold'>ID: </h1>
        <h2>{avance._id}</h2>
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='py-2 px-2 text-gray-800 font-bold'>Proyecto: </h1>
        <h2>Nombre del Proyecto</h2>
      </div>

      <div className='flex m-4 pt-6 justify-center items-center'>

        <form ref={form} onChange={updateFormData} onSubmit={submitForm}>

          <Observaciones idAvance={avance._id}/>

          <div className='flex m-4 justify-center items-center'>
            <ButtonLoading 
              text='Agregar Observaciones' 
              loading={false} 
              disabled={false}
              className='fondo1 text-white active:bg-gray-700 text-md font-bold mt-5 px-6 py-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-60 transform hover:translate-y-1 transition-transform ease-in duration-200' />
        </div>

        </form>
      </div>
    </div>

  )
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