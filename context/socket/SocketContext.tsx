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
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend.herokuapp.com');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend-ve-production.up.railway.app');
    
    const { cargarMensajes } = useContext( ChatContext );
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

    // Escuchar los cambios en los usuarios conectados
    // useEffect(() => {
    //     socket?.on( 'lista-usuarios', ( usuarios ) => {
    //         console.log('cargarUsuarios')
    //         cargarUsuarios( usuarios );
    //     })
    // }, [ socket ]);
    
    useEffect(() => {
        socket?.on('backend:mensaje-personal', ( mensaje ) => {
            // console.log('backend:mensaje-personal', mensaje)
            refreshClientesConMensajes();
            cargarMensajes( mensaje.cliente );
        })
    }, [socket])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}