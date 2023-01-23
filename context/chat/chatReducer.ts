import { IUsuario } from '../../interfaces';
import { Mensaje } from '../../interfaces/mensaje';
import { ChatState } from './';

type ChatActionType = 
| { type: 'Chat - Usuarios Cargados', payload: IUsuario[] }
| { type: 'Chat - Activar Chat', payload: null | string }
| { type: 'Chat - Nuevo Mensaje', payload: Mensaje }
| { type: 'Chat - Cargar Mensajes', payload: Mensaje[] }

export const chatReducer = ( state: ChatState, action: ChatActionType ):ChatState => {
    
    switch (action.type) {
        case 'Chat - Usuarios Cargados':
            console.log('ChatReducer', action.payload )
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }

        case 'Chat - Activar Chat':
            if ( state.chatActivo === action.payload ) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }

        case 'Chat - Nuevo Mensaje':
            if ( state.chatActivo === action.payload.de || 
                state.chatActivo === action.payload.para   
           ) {
               return {
                   ...state,
                   mensajes: [ ...state.mensajes, action.payload ],
               }
           } else {
               return state;
           }

        case 'Chat - Cargar Mensajes':
            return {
                ...state,
                mensajes: [ ...action.payload ]
            }

        default:
            return state;
    }

}