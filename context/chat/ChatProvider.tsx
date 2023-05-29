import { FC, ReactNode, useReducer } from 'react';

import { externalApiConToken } from '../../apiAxios';
import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';
import { ChatContext, chatReducer } from './';

interface Props {
    children: ReactNode
}

export interface ChatState {
    idCliente: string;
    chatActivo: string | null;
    mensajes: IMensaje[];
    usuarios: IUsuario[];
}

const CHAT_INITIAL_STATE: ChatState = {
    idCliente: '',
    chatActivo: null,
    mensajes: [],
    usuarios: []
}

export const ChatProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE )

    const cargarMensajes = async( idCliente: string ) => {
        // console.log('cargarMensajes idCliente', idCliente)
        const { data } = await externalApiConToken.get(`mensajes/${ idCliente }`);
        dispatch({ type: 'Chat - Mensajes cargados', payload: data.mensajes });
    }

    const cargarUsuarios = async( usuarios: IUsuario[] ) => {
        dispatch({ type: 'Chat - Cargar usuarios', payload: usuarios });
    }

    const activarChat = async( idCliente: string ) => {
        // const { data } = await externalApiConToken.get(`mensajes/${ uid }`);
        dispatch({ type: 'Chat - Activar', payload: idCliente });
    }

    return (
        <ChatContext.Provider value={{
            ...state,

            // Methods
            cargarMensajes,
            cargarUsuarios,
            activarChat,
        }} >
            { children }
        </ChatContext.Provider>
    )
}