import { ClientesState } from './'

type ClientesActionType = { type: 'Clientes - Lista' }

export const clientesReducer = (state: ClientesState, action: ClientesActionType): ClientesState => {
  switch (action.type) {
    case 'Clientes - Lista':
      return {
        ...state
      }

    default:
      return state
  }
}
