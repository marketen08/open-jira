import { createContext } from 'react';
import { Adjunto } from '../../interfaces';

interface ContextProps {
    adjuntos: Adjunto[];
    
    // Methods
    addNewAdjunto: (adjunto: Adjunto) => void;
    updateAdjunto: (adjunto: Adjunto, showSnackbar?: boolean ) => void;
    refreshAdjuntos: (id: string) => void;
}


export const AdjuntosContext = createContext({} as ContextProps );