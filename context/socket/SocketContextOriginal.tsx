import React, { FC, ReactNode, createContext, useEffect, useContext } from 'react';
import { useSocket } from '../../hooks'
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';
import { Socket } from 'socket.io-client';
import { AuthContext } from '../auth';
import { ChatContext } from '../chat';

interface ContextProps {
    socket: Socket|null
    online: boolean;
}


export const SocketContext = createContext({} as ContextProps);

interface Props {
    children: ReactNode
}

export const SocketProvider:FC<Props> = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    
    const { cargarMensajes, cargarUsuarios } = useContext( ChatContext );

    const { isLoggedIn } = useContext( AuthContext )    

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

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        
        socket?.on( 'lista-usuarios', ( usuarios ) => {
            cargarUsuarios( usuarios );
        })
        

    }, [ socket ]);
    
    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            cargarMensajes( mensaje );
            scrollToBottomAnimated('mensajes');
        })

    }, [socket])
    


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}