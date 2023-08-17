import React, { FC, ReactNode, createContext, useEffect, useContext } from 'react';
import { useSocket } from '../../hooks'
import { Socket } from 'socket.io-client';
import { AuthContext } from '../auth';
import { ChatContext } from '../chat';
import { ClientesContext } from '../clientes';

interface ContextProps {
    socket: Socket|null
    online: boolean;
}


export const SocketContext = createContext({} as ContextProps);

interface Props {
    children: ReactNode
}

export const SocketProvider:FC<Props> = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.NEXT_PUBLIC_SOCKET_BASEURL!);

    const { ingresoMensaje } = useContext( ChatContext );
    const { refreshClientesConMensajes } = useContext( ClientesContext );   

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
    
    useEffect(() => {
        socket?.on('backend:mensaje-personal', ( mensaje ) => {
            refreshClientesConMensajes();
            ingresoMensaje();
        })
    }, [socket])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}