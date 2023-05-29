import { createContext } from 'react';
import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';

interface ContextProps {
    chatActivo: string | null;
    mensajes: IMensaje[];
    usuarios: IUsuario[];
    // Methods
    cargarMensajes: (chatActivo: string) => void;
    cargarUsuarios: (usuarios: IUsuario[]) => void;
    activarChat: (idCliente: string) => void;
}


export const ChatContext = createContext({} as ContextProps );