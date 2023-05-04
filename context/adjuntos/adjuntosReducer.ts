import { Adjunto } from '../../interfaces';
import { AdjuntosState } from '.';

type AdjuntosActionType = 
| { type: '[Adjunto] - Agregar entrada', payload: Adjunto }
| { type: '[Adjunto] - Actualizar entrada', payload: Adjunto }
| { type: '[Adjunto] - Refresh Data', payload: Adjunto[] }


export const adjuntosReducer = ( state: AdjuntosState, action: AdjuntosActionType ):AdjuntosState => {
    
    switch (action.type) {
        case '[Adjunto] - Agregar entrada':
            return {
                ...state,
                adjuntos: [ ...state.adjuntos, action.payload ]
            }

        case '[Adjunto] - Actualizar entrada':
            return {
                ...state,
                adjuntos: state.adjuntos.map( adjunto => {
                    if ( adjunto.id === action.payload.id ) {
                        adjunto = action.payload;
                    }
                    return adjunto;
                })
            }

        case '[Adjunto] - Refresh Data':
            return {
                ...state,
                adjuntos: [ ...action.payload ]
            }

        default:
            return state;
    }

}