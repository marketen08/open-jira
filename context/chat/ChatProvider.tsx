import { FC, ReactNode, useReducer } from 'react';
import { externalApi } from '../../apiAxios';
import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';
import { ChatContext, chatReducer } from './';

interface Props {
    children: ReactNode
}

export interface ChatState {
    uid: string;
    chatActivo: string | null;
    mensajes: IMensaje[];
    usuarios: IUsuario[];
}

const CHAT_INITIAL_STATE: ChatState = {
    uid: '',
    chatActivo: null,
    mensajes: [],
    usuarios: []
}

export const ChatProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE )

    const cargarMensajes = async( uid: string ) => {
        const { data } = await externalApi.get(`mensajes/${ uid }`);
        dispatch({ type: 'Chat - Mensajes cargados', payload: data.mensajes });
    }

    const cargarUsuarios = async( usuarios: IUsuario[] ) => {
        dispatch({ type: 'Chat - Cargar usuarios', payload: usuarios });
    }

    const activarChat = async( uid: string ) => {
        // const { data } = await externalApi.get(`mensajes/${ uid }`);
        dispatch({ type: 'Chat - Activar', payload: uid });
    }

    return (
        <ChatContext.Provider value={{
            ...state,

            // Methods
            cargarMensajes,
            cargarUsuarios,
            activarChat
        }} >
            { children }
        </ChatContext.Provider>
    )
}