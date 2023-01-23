import { SocketState } from './';

type SocketActionType = 
| { type: 'Socket - Conectar' }
| { type: 'Socket - Desconectar' }


// TODO: IMPORTANTE
// TODO: TODO EL CODIGO DEL REDUCER NO LO ESTOY UTILIZANDO, REVISAR SI SE PUEDE ELIMAR O NO.


export const socketReducer = ( state: SocketState, action: SocketActionType ):SocketState => {
    
    switch (action.type) {
        case 'Socket - Conectar':
            return {
                ...state,
            }
        
        case 'Socket - Desconectar':
            return {
                ...state,
            }

        default:
            return state;
    }

}