import { createContext } from 'react';
import { Cliente, ClienteConMensajes } from '../../interfaces';

interface ContextProps {
    clientes: Cliente[];
    clientesConMensajes: ClienteConMensajes[];
    totalMensajesNoLeidos: number;
    // Methods
    addNewCliente: (description: string) => void;
    updateCliente: (cliente: Cliente, showSnackbar?: boolean ) => void;
    refreshClientes: () => Promise<void>;
    // addNewMensajeNoLeido: () => void;
}


export const ClientesContext = createContext({} as ContextProps );