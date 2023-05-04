import { FC, ReactNode, useEffect, useReducer, useContext } from 'react';
import { useSnackbar } from 'notistack'
import { externalApiConToken } from '../../apiAxios';
import { Adjunto } from '../../interfaces';
import { AdjuntosContext, adjuntosReducer } from '.';
import { AuthContext } from '../auth';
import Cookies from 'js-cookie';

interface Props {
    children: ReactNode
}

interface ListadoDeAdjuntosApi {
    total: number;
    adjuntos: Adjunto[];
}

export interface AdjuntosState {
    adjuntos: Adjunto[];
}

const Adjuntos_INITIAL_STATE: AdjuntosState = {
    adjuntos: []
}

export const AdjuntosProvider:FC<Props> = ({ children }) => {

    const { isLoggedIn } = useContext( AuthContext )

    const [state, dispatch] = useReducer( adjuntosReducer, Adjuntos_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewAdjunto = async( adjunto: Adjunto ) => {
        const { data } = await externalApiConToken.post<Adjunto>('/adjuntos', { adjunto });
        dispatch({ type: '[Adjunto] - Agregar entrada', payload: data });
    }

    const updateAdjunto = async( adjunto: Adjunto, showSnackbar = false ) => {
        try {
            const { data } = await externalApiConToken.put<Adjunto>(`/adjuntos/${ adjunto.id }`, adjunto );    
            dispatch({ type: '[Adjunto] - Actualizar entrada', payload: data });

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



    const refreshAdjuntos = async( id: string ) => {
        if ( isLoggedIn && Cookies.get('token')  ) {
            try {
                const { data } = await externalApiConToken.get<ListadoDeAdjuntosApi>(`/adjuntos/pedido/${ id }`);
                const { adjuntos } = data;
                dispatch({ type: '[Adjunto] - Refresh Data', payload: adjuntos });
            } catch (error) {
                console.log('Sin credenciales')
            }
        } else {
            console.log('Sin token en Cookies.get')
        }
    }

    // useEffect(() => {
    //     refreshAdjuntos( '6451527f8ceb6cd4b4e6a8ad' );
    // }, []);
    
    return (
        <AdjuntosContext.Provider value={{
            ...state,

            // Methods
            addNewAdjunto,
            updateAdjunto,
            refreshAdjuntos,
        }} >
            { children }
        </AdjuntosContext.Provider>
    )
}