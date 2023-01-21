import { createContext } from 'react';
import { Vehiculo } from '../../interfaces';

interface ContextProps {
    vehiculos: Vehiculo[];
    
    // Methods
    addNewVehiculo: (description: string) => void;
    updateVehiculo: (vehiculo: Vehiculo, showSnackbar?: boolean ) => void;
}


export const VehiculosContext = createContext({} as ContextProps );