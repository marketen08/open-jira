import { createContext } from 'react';
import { IUsuario } from '../../interfaces';
import { Mensaje } from '../../interfaces/mensaje';

interface ContextProps {
    uid: String;
    chatActivo: String | null;
    usuarios: IUsuario[];
    mensajes: Mensaje[];
}


export const ChatContext = createContext({} as ContextProps );