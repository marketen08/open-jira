import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
    children: ReactNode
}

export interface UIState {
    sidemenuOpen: boolean;
    chatmenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    chatmenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const openChatMenu = () => {
        dispatch({ type: 'UI - Open ChatBar' })
    }

    const closeChatMenu = () => {
        dispatch({ type: 'UI - Close ChatBar' })
    }

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding })
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' })
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' })
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Funciones
            closeChatMenu,
            closeSideMenu,
            openChatMenu,
            openSideMenu,

            setIsAddingEntry,

            startDragging,
            endDragging,
        }} >
            { children }
        </UIContext.Provider>
    )
}