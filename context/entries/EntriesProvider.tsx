import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children: ReactNode
}

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Pasdashd ahskdha kjdhakshdkash dkahskd haksdh kashdkahsdkjahs.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En Progreso: Esdjksjd ksjadlk ajlksdj alksjdlkajdlk.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Terminado: Ysadaksldj alksjd lkasjdlk asjlkd jalksdj laksjd lkasjdlk aj.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )

    const addNewEntry = ( description: string ) => {
        
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Agregar entrada', payload: newEntry });
    }

    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry] - Actualizar entrada', payload: entry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }} >
            { children }
        </EntriesContext.Provider>
    )
}