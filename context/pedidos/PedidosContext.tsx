import { createContext } from 'react';
import { Pedido } from '../../interfaces';

interface ContextProps {
    pedidos: Pedido[];
    
    // Methods
    addNewPedido: (description: string) => void;
    updatePedido: (pedido: Pedido, showSnackbar?: boolean ) => void;
}


export const PedidosContext = createContext({} as ContextProps );