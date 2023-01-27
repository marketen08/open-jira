import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { useSnackbar } from 'notistack'
import { externalApiConToken } from '../../apiAxios';
import { Vehiculo } from '../../interfaces';
import { VehiculosContext, vehiculosReducer } from '.';
import { AuthContext } from '../auth';

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


    const { isLoggedIn } = useContext( AuthContext )

    const [state, dispatch] = useReducer( vehiculosReducer, Vehiculos_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewVehiculo = async( description: string ) => {
        const { data } = await externalApiConToken.post<Vehiculo>('/vehiculos', { description });
        dispatch({ type: '[Vehiculo] - Agregar entrada', payload: data });
    }

    const updateVehiculo = async( vehiculo: Vehiculo, showSnackbar = false ) => {
        try {
            const { data } = await externalApiConToken.put<Vehiculo>(`/vehiculos/${ vehiculo.id }`, vehiculo );    
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

        if ( isLoggedIn ) {
            try {
                
                const { data } = await externalApiConToken.get<ListadoDeVehiculosApi>('/vehiculos');
                const { vehiculos } = data;
                dispatch({ type: '[Vehiculo] - Refresh Data', payload: vehiculos });
            } catch (error) {
                console.log('Sin credenciales')                
            }
        }
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