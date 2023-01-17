import { FC, ReactNode, useReducer } from 'react';
import { Cliente } from '../../interfaces';
import { ClientesContext, clientesReducer } from './';

import { v4 as uuidv4 } from 'uuid'

interface Props {
  children: ReactNode
}

export interface ClientesState {
  clientes: Cliente[]
}

const Clientes_INITIAL_STATE: ClientesState = {
  clientes: [
    {
      id: uuidv4(),
      codigo: 1,
      razonSocial: 'NUWARE SRL',
      tipoDeDocumento: 'CUIT',
      numero: '30714525319',
      nombre: 'NUWARE',
      condicionIva: 'IVA Responsable Inscripto',
      domicilio: 'Carlos Casares 1641',
      provincia: 'Buenos Aires',
      localidad: 'Victoria',
      telefono: '1133520349',
      email: 'info@nuware.com.ar',
      activo: true,
      createdAt: Date.now()
    },
    {
      id: uuidv4(),
      codigo: 2,
      razonSocial: 'INGENIERIA SRL',
      tipoDeDocumento: 'CUIT',
      numero: '30714525318',
      nombre: 'INGENIERIA',
      condicionIva: 'IVA Responsable Inscripto',
      domicilio: 'Carlos Casares 1641',
      provincia: 'Buenos Aires',
      localidad: 'Victoria',
      telefono: '1133520349',
      email: 'info@nuware.com.ar',
      activo: true,
      createdAt: Date.now()
    }
  ]
}

export const ClientesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(clientesReducer, Clientes_INITIAL_STATE)

  console.log({ dispatch })

  return (
    <ClientesContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </ClientesContext.Provider>
  )
}
