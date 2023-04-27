import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack'
import { entriesApi } from '../../apiAxios';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { useSession } from 'next-auth/react';

interface Props {
    children: ReactNode
}

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider:FC<Props> = ({ children }) => {

    const { status } = useSession();

    
    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE )
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Agregar entrada', payload: data });
    }

    const updateEntry = async( { _id, description, status }: Entry, showSnackbar = false ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });    
            dispatch({ type: '[Entry] - Actualizar entrada', payload: data });

            if ( showSnackbar ) 
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }

                })
            
        } catch (error) {
            
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh Data', payload: data });
    }

    useEffect(() => {
        if ( status === 'authenticated' ) {
            refreshEntries();
        } 
    }, [status]);
    
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