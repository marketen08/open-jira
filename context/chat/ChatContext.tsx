import { createContext } from 'react';
import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';

interface ContextProps {
    chatActivo: string | null;
    mensajes: IMensaje[];
    mensajesNuevos: number;
    // usuarios: IUsuario[];
    // Methods
    cargarMensajes: (chatActivo: string) => void;
    ingresoMensaje: () => void;
    activarChat: (chatActivo: string) => void;
}


export const ChatContext = createContext({} as ContextProps );