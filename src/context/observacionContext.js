import { createContext, useContext } from 'react';

export const ObservacionContext = createContext(null);

export const useObservacion = () => {
  return useContext(ObservacionContext);
};