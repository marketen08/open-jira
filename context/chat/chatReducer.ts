import { IUsuario } from '../../interfaces';
import { IMensaje } from '../../interfaces/mensaje';
import { ChatState } from './';

type ChatActionType = 
| { type: 'Chat - Mensajes cargados', payload: IMensaje[] }
| { type: 'Chat - Cargar usuarios', payload: IUsuario[] }
| { type: 'Chat - Activar', payload: string }

export const chatReducer = ( state: ChatState, action: ChatActionType ):ChatState => {
    
    switch (action.type) {
        case 'Chat - Mensajes cargados':
            return {
                ...state,
                mensajes: [ ...action.payload ]
            }

        case 'Chat - Cargar usuarios':
            return {
                ...state,
                usuarios: [ ...action.payload ]
            }

        case 'Chat - Activar':
            if ( state.chatActivo === action.payload ) return state;
            
            return {
                ...state,
                chatActivo: action.payload,
            }

        default:
            return state;
    }

}