import { createContext } from 'react';
import { Cliente } from '../../interfaces';

interface ContextProps {
    clientes: Cliente[];
    
    // Methods
    addNewCliente: (description: string) => void;
    updateCliente: (cliente: Cliente, showSnackbar?: boolean ) => void;
    refreshClientes: () => Promise<void>
}


export const ClientesContext = createContext({} as ContextProps );