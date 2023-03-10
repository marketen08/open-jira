import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie';

import { externalApiConToken } from '../../apiAxios';
import { Cliente } from '../../interfaces';
import { ClientesContext, clientesReducer } from './';
import { AuthContext } from '../auth';

interface Props {
    children: ReactNode
}

interface ListadoDeClientesApi {
    total: number;
    clientes: Cliente[];
}

export interface ClientesState {
    clientes: Cliente[];
}

const Clientes_INITIAL_STATE: ClientesState = {
    clientes: []
}

export const ClientesProvider:FC<Props> = ({ children }) => {

    const { isLoggedIn } = useContext( AuthContext )

    const [state, dispatch] = useReducer( clientesReducer, Clientes_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewCliente = async( description: string ) => {
        
        const { data } = await externalApiConToken.post<Cliente>('/clientes', { description });
        dispatch({ type: '[Cliente] - Agregar entrada', payload: data });
    }

    const updateCliente = async( cliente: Cliente, showSnackbar = false ) => {
        try {
            const { data } = await externalApiConToken.put<Cliente>(`/clientes/${ cliente.id }`, cliente );    
            dispatch({ type: '[Cliente] - Actualizar entrada', payload: data });

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

    const refreshClientes = async() => {

        if ( Cookies.get('token')  ) {
            try {
                const { data } = await externalApiConToken.get<ListadoDeClientesApi>('/clientes');
                const { clientes } = data;
                dispatch({ type: '[Cliente] - Refresh Data', payload: clientes });
            } catch (error) {
                console.log('Sin credenciales')                
            }
        }
    }

    useEffect(() => {
        refreshClientes();
    }, []);
    
    return (
        <ClientesContext.Provider value={{
            ...state,

            // Methods
            addNewCliente,
            updateCliente,
            refreshClientes,
        }} >
            { children }
        </ClientesContext.Provider>
    )
}