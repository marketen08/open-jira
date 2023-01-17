import { createContext } from 'react';
import { Cliente } from '../../interfaces';

interface ContextProps {
  clientes: Cliente[]
}

export const ClientesContext = createContext({} as ContextProps)
