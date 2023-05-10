import { Cliente } from '../../interfaces';
import { ClientesState, ListadoDeClientesConMensajesApi } from './';

type ClientesActionType = 
| { type: '[Cliente] - Agregar entrada', payload: Cliente }
| { type: '[Cliente] - Actualizar entrada', payload: Cliente }
| { type: '[Cliente] - Refresh Data', payload: Cliente[] }
| { type: '[Cliente] - Refresh Data con mensajes', payload: ListadoDeClientesConMensajesApi }
| { type: '[Cliente] - Agregar mensaje no leido', payload: number }

export const clientesReducer = ( state: ClientesState, action: ClientesActionType ):ClientesState => {
    
    switch (action.type) {
        case '[Cliente] - Agregar entrada':
            return {
                ...state,
                clientes: [ ...state.clientes, action.payload ]
            }

        case '[Cliente] - Actualizar entrada':
            return {
                ...state,
                clientes: state.clientes.map( cliente => {
                    if ( cliente.id === action.payload.id ) {
                        cliente = action.payload;
                    }
                    return cliente;
                })
            }

        case '[Cliente] - Refresh Data':
            return {
                ...state,
                clientes: [ ...action.payload ]
            }

        case '[Cliente] - Refresh Data con mensajes':
            return {
                ...state,
                clientesConMensajes: [ ...action.payload.clientes ],
                totalMensajesNoLeidos: action.payload.total
            }

        case '[Cliente] - Agregar mensaje no leido':
            return {
                ...state,
                totalMensajesNoLeidos: state.totalMensajesNoLeidos + action.payload
            }

        default:
            return state;
    }

}