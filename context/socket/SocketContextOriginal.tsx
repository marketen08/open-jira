import React, { FC, useContext, useEffect } from 'react';
import { createContext, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';

interface Props {
    children: ReactNode
}

interface ContextProps {
    socket: Socket
    online: boolean;
}

export const SocketContext = createContext({} as ContextProps);

export const SocketProvider:FC<Props>= ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { isLoggedIn } = useContext( AuthContext );

    useEffect(() => {
        if ( isLoggedIn ) {
            conectarSocket();
        }
    }, [ isLoggedIn, conectarSocket ]);

    useEffect(() => {
        if ( !isLoggedIn ) {
            desconectarSocket();
        }
    }, [ isLoggedIn, desconectarSocket ]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}