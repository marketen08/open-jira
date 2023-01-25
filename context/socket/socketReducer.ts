import { SocketState } from './';

type SocketActionType = 
| { type: 'Socket - Usuarios cargados', payload: any }
| { type: 'Socket - Mensajes cargados', payload: any }
// | { type: 'Socket - Activar Chat', payload: any }


// TODO: IMPORTANTE
// TODO: TODO EL CODIGO DEL REDUCER NO LO ESTOY UTILIZANDO, REVISAR SI SE PUEDE ELIMAR O NO.


export const socketReducer = ( state: SocketState, action: SocketActionType ):SocketState => {
    
    switch (action.type) {
        case 'Socket - Usuarios cargados':
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }
        
        // case 'Socket - Mensajes cargados':
        //     return {
        //         ...state,
        //         mensajes: [ ...action.payload ]
        //     }

        // case 'Socket - Activar Chat':
        //     if ( state.chatActivo === action.payload ) return state;
            
        //     return {
        //         ...state,
        //         chatActivo: action.payload,
        //     }

        default:
            return state;
    }

}