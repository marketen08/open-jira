import { Pedido } from '../../interfaces';
import { PedidosState } from '.';

type PedidosActionType = 
| { type: '[Pedido] - Agregar entrada', payload: Pedido }
| { type: '[Pedido] - Actualizar entrada', payload: Pedido }
| { type: '[Pedido] - Refresh Data', payload: Pedido[] }


export const pedidosReducer = ( state: PedidosState, action: PedidosActionType ):PedidosState => {
    
    switch (action.type) {
        case '[Pedido] - Agregar entrada':
            return {
                ...state,
                pedidos: [ ...state.pedidos, action.payload ]
            }

        case '[Pedido] - Actualizar entrada':
            return {
                ...state,
                pedidos: state.pedidos.map( pedido => {
                    if ( pedido.id === action.payload.id ) {
                        pedido = action.payload;
                    }
                    return pedido;
                })
            }

        case '[Pedido] - Refresh Data':
            return {
                ...state,
                pedidos: [ ...action.payload ]
            }

        default:
            return state;
    }

}