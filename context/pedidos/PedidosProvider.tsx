import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { useSnackbar } from 'notistack'
import { externalApiConToken } from '../../apiAxios';
import { Pedido } from '../../interfaces';
import { PedidosContext, pedidosReducer } from '.';
import { AuthContext } from '../auth';
import Cookies from 'js-cookie';

interface Props {
    children: ReactNode
}

interface ListadoDePedidosApi {
    total: number;
    pedidos: Pedido[];
}

export interface PedidosState {
    pedidos: Pedido[];
}

const Pedidos_INITIAL_STATE: PedidosState = {
    pedidos: []
}

export const PedidosProvider:FC<Props> = ({ children }) => {

    const { isLoggedIn } = useContext( AuthContext )

    const [state, dispatch] = useReducer( pedidosReducer, Pedidos_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewPedido = async( description: string ) => {
        const { data } = await externalApiConToken.post<Pedido>('/pedidos', { description });
        dispatch({ type: '[Pedido] - Agregar entrada', payload: data });
    }

    const updatePedido = async( pedido: Pedido, showSnackbar = false ) => {
        try {
            const { data } = await externalApiConToken.put<Pedido>(`/pedidos/${ pedido.id }`, pedido );    
            dispatch({ type: '[Pedido] - Actualizar entrada', payload: data });

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



    const refreshPedidos = async() => {
        if ( isLoggedIn && Cookies.get('token')  ) {

            try {
                const { data } = await externalApiConToken.get<ListadoDePedidosApi>('/pedidos');
                const { pedidos } = data;
                dispatch({ type: '[Pedido] - Refresh Data', payload: pedidos });
            } catch (error) {
                console.log('Sin credenciales')
            }
        }
    }

    useEffect(() => {
        refreshPedidos();
    }, []);
    
    return (
        <PedidosContext.Provider value={{
            ...state,

            // Methods
            addNewPedido,
            updatePedido,
        }} >
            { children }
        </PedidosContext.Provider>
    )
}