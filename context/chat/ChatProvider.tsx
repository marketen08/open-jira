import { FC, ReactNode, useReducer } from 'react';
import { IUsuario } from '../../interfaces';
import { Mensaje } from '../../interfaces/mensaje';
import { ChatContext, chatReducer } from './';

interface Props {
    children: ReactNode
}

export interface ChatState {
    uid: String;
    chatActivo: String | null;
    usuarios: IUsuario[];
    mensajes: Mensaje[];
}

export const CHAT_INITIAL_STATE: ChatState = {
    uid: '',
    chatActivo: null,
    usuarios: [],
    mensajes: []
}

export const ChatProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE )

    return (
        <ChatContext.Provider value={{
            ...state
        }} >
            { children }
        </ChatContext.Provider>
    )
}