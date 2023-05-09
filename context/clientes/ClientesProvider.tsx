import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import Cookies from 'js-cookie';

import { externalApiConToken } from '../../apiAxios';
import { Cliente, ClienteConMensajes } from '../../interfaces';
import { ClientesContext, clientesReducer } from './';
import { AuthContext } from '../auth';

interface Props {
    children: ReactNode
}

interface ListadoDeClientesApi {
    total: number;
    clientes: Cliente[];
}

export interface ListadoDeClientesConMensajesApi {
    total: number;
    clientes: ClienteConMensajes[];
}

export interface ClientesState {
    clientes: Cliente[];
    clientesConMensajes: ClienteConMensajes[];
    totalMensajesNoLeidos: number;
}

const Clientes_INITIAL_STATE: ClientesState = {
    clientes: [],
    clientesConMensajes: [],
    totalMensajesNoLeidos: 0
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

    const refreshClientesConMensajes = async() => {

        if ( Cookies.get('token')  ) {
            try {
                const { data } = await externalApiConToken.get<ListadoDeClientesConMensajesApi>('/clientes/conmensajes/noleidos');
                // const { clientes } = data;
                dispatch({ type: '[Cliente] - Refresh Data con mensajes', payload: data });
            } catch (error) {
                console.log('Sin credenciales')                
            }
        }
    }

    useEffect(() => {
        refreshClientes();
        refreshClientesConMensajes();
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