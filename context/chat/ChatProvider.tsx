import { FC, ReactNode, useReducer } from 'react';

import { externalApiConToken } from '../../apiAxios';
import { IMensaje } from '../../interfaces/mensaje';
import { ChatContext, chatReducer } from './';

interface Props {
    children: ReactNode
}

export interface ChatState {
    chatActivo: string | null;
    mensajes: IMensaje[];
    mensajesNuevos: number;
    // usuarios: IUsuario[];
}

const CHAT_INITIAL_STATE: ChatState = {
    chatActivo: null,
    mensajes: [],
    mensajesNuevos: 0
    // usuarios: []
}

export const ChatProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE )

    const cargarMensajes = async( idCliente: string ) => {
        if ( state.chatActivo ){
            const { data } = await externalApiConToken.get(`mensajes/${ idCliente }`);
            dispatch({ type: 'Chat - Mensajes cargados', payload: data.mensajes });
        }
    }

    const ingresoMensaje = async( ) => {
        dispatch({ type: 'Chat - Ingreso mensaje nuevo', payload: 1 });
    }

    const activarChat = async( idCliente: string ) => {
        // const { data } = await externalApiConToken.get(`mensajes/${ uid }`);
        console.log('activarChat', state.chatActivo);
        dispatch({ type: 'Chat - Activar', payload: idCliente });
    }

    return (
        <ChatContext.Provider value={{
            ...state,

            // Methods
            cargarMensajes,
            ingresoMensaje,
            activarChat,
        }} >
            { children }
        </ChatContext.Provider>
    )
}