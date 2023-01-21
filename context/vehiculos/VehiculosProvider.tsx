import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import { externalApi } from '../../apiAxios';
import { Vehiculo } from '../../interfaces';
import { VehiculosContext, vehiculosReducer } from '.';

interface Props {
    children: ReactNode
}

interface ListadoDeVehiculosApi {
    total: number;
    vehiculos: Vehiculo[];
}

export interface VehiculosState {
    vehiculos: Vehiculo[];
}

const Vehiculos_INITIAL_STATE: VehiculosState = {
    vehiculos: []
}

export const VehiculosProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( vehiculosReducer, Vehiculos_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewVehiculo = async( description: string ) => {
        const { data } = await externalApi.post<Vehiculo>('/vehiculos', { description });
        dispatch({ type: '[Vehiculo] - Agregar entrada', payload: data });
    }

    const updateVehiculo = async( vehiculo: Vehiculo, showSnackbar = false ) => {
        try {
            const { data } = await externalApi.put<Vehiculo>(`/vehiculos/${ vehiculo.id }`, vehiculo );    
            dispatch({ type: '[Vehiculo] - Actualizar entrada', payload: data });

            if ( showSnackbar ) 
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }

                })
            
        } catch (error) {
            
        }
    }



    const refreshVehiculos = async() => {
        const { data } = await externalApi.get<ListadoDeVehiculosApi>('/vehiculos');
        const { vehiculos } = data;
        dispatch({ type: '[Vehiculo] - Refresh Data', payload: vehiculos });
    }

    useEffect(() => {
        refreshVehiculos();
    }, []);
    
    return (
        <VehiculosContext.Provider value={{
            ...state,

            // Methods
            addNewVehiculo,
            updateVehiculo,
        }} >
            { children }
        </VehiculosContext.Provider>
    )
}