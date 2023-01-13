import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType = 
| { type: '[Entry] - Agregar entrada', payload: Entry }
| { type: '[Entry] - Actualizar entrada', payload: Entry }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ):EntriesState => {
    
    switch (action.type) {
        case '[Entry] - Agregar entrada':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            }

        case '[Entry] - Actualizar entrada':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.payload._id ) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }

        default:
            return state;
    }

}