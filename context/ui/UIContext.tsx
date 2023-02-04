import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean;
    chatmenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    // Funciones
    openSideMenu: () => void;
    closeSideMenu: () => void;

    openChatMenu: () => void;
    closeChatMenu: () => void;

    setIsAddingEntry: (isAdding: boolean) => void;

    endDragging: () => void;
    startDragging: () => void;
} 


export const UIContext = createContext({} as ContextProps );