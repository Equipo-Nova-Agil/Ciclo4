import React, { useState, useEffect} from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from 'context/userContext';
import { ObservacionContext, useObservacion } from '../../../context/observacionContext.js';
import { useQuery, useMutation } from '@apollo/client';
import { Enum_TipoObservacion } from '../../../utils/enum.js';


//DEPENDENCIAS & HOOKS
import { Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import ReactLoading from 'react-loading';
import useFormData from '../../../hooks/useFormData';

//QUERIES & MUTATUIONS
import {obtenerAvances} from '../../../graphql/Avances/Queries.js';
import {crearObservacion} from '../../../graphql/Avances/Mutations'

//COMPONETS
import Input from '../../../componets/Input';
import TextArea from '../../../componets/textArea';
import DropDown from "componets/Dropdown.jsx";
import ButtonLoading from "componets/ButtonLoading.jsx";

const FormularioCreacionObservaciones = () => {
    const {_id} = useParams();
    const { form, formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    
    const { data: dataAvances, loading: loadingAvances, error:errorAvances} = useQuery(obtenerAvances
        , {
      variables: {
        filtro: { _id: _id  },
      },
    });

    console.log('dataAvances', dataAvances);

    const [nuevaObservacion, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(crearObservacion, {refetchQueries:[{ query: obtenerAvances }]});

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

  
    
  
    const submitForm = (e) => {
      e.preventDefault();
      
      nuevaObservacion({
        variables: {
            idAvance: _id,
            campos: formData,
          },
      })
      .then(() => {
        toast.success('observacion agregado exitosamente', 
        {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000
        });
        
      })
      .catch(() => {
        toast.error('error agregando observacion', 
        {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          autoClose: 3000
        });
      });
      navigate('/admin/avances'); 
    };
    return(
      <div className='flex flex-col items-center justify-center'>
        <Link to="/admin/Avances">
          <button
            className='fondo1 rounded-lg ml-6 mb-4 p-1 text-sm text-gray-200 hover:text-blue-900'
            type="button"
            title="Agregar Observaciones">
            <i className="fa fa-arrow-left "></i> Regresar
          </button>
        </Link>

        <h2 className='text-2xl font-extrabold pb-4 mb-4 mt-4 text-gray-800'>Nueva Observación</h2>
  
        <div className='flex justify-center items-center'>
          <h1 className='py-2 px-2 text-gray-800 font-bold'>ID: </h1>
          <h2>{_id.slice(20)}</h2>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='py-2 px-2 text-gray-800 font-bold'>Proyecto: </h1>
          <h2>{dataAvances.Avances[0].proyecto.nombre}</h2>
        </div>
  
        <div className='flex m-4 pt-2 justify-center items-center'>
  
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <div>
              <DropDown
                name='tipo'
                options={Enum_TipoObservacion}
                className='hidden'
                label=''
                defaultValue='Observacion'
                required={true}/>
            </div>
  
            <div className='flex justify-center items-center'>
              <TextArea
                name='descripcion'
                label=''
                type='text'
                rows="8"
                cols="40"
                className='border-0 m-1 px-3 py-3 placeholder-gray-400 text-gray-700 border-gray-800 bg-gray-200  rounded text-sm shadow-md focus:outline-none focus:ring w-full'
                required={true}/>
            </div>
  

            <div className='flex m-4 justify-center items-center'>
            
              <ButtonLoading 
                text='Agregar Observación' 
                loading={mutationLoading} 
                disabled={Object.keys(formData).length === 0}
                className='fondo1 text-white active:bg-gray-700 text-md font-bold mt-5 px-6 py-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  m-2 w-60 transform hover:translate-y-1 transition-transform ease-in duration-200' />

            
          </div>
  
          </form>
        </div>
      </div>
  
    )
};

const Observaciones = () => {
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

export default FormularioCreacionObservaciones
