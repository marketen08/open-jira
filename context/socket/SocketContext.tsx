import React, { FC, ReactNode, createContext, useEffect, useContext } from 'react';
import { useSocket } from '../../hooks'
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';
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

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://piruco.geaonline.com.ar');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend.herokuapp.com');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend-vercel-production.up.railway.app');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://piruco-backend-w.geaonline.com.ar');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://https://sonia-backend-vercel.vercel.app');

    const { ingresoMensaje } = useContext( ChatContext );
    const { refreshClientesConMensajes } = useContext( ClientesContext );   

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