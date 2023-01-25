import { createContext } from 'react';
import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';

interface ContextProps {
    uid: string;
    chatActivo: string | null;
    mensajes: IMensaje[];
    usuarios: IUsuario[];
    // Methods
    cargarMensajes: (uid: string) => void;
    cargarUsuarios: (usuarios: IUsuario[]) => void;
    activarChat: (uid: string) => void;
    // updateCliente: (cliente: Cliente, showSnackbar?: boolean ) => void;
}


export const ChatContext = createContext({} as ContextProps );