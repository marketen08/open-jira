import React, { FC, ReactNode, createContext, useEffect, useContext } from 'react';
import { useSocket } from '../../hooks'
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';
import { Socket } from 'socket.io-client';
import { AuthContext } from '../auth';
import { ChatContext } from '../chat';
import { ClientesContext } from '../clientes';
import { useRouter } from 'next/router';

interface ContextProps {
    socket: Socket|null
    online: boolean;
}


export const SocketContext = createContext({} as ContextProps);

interface Props {
    children: ReactNode
}

export const SocketProvider:FC<Props> = ({ children }) => {

    const router = useRouter();

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend.herokuapp.com');
    // const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://sonia-backend-ve-production.up.railway.app');
    
    const { cargarMensajes, cargarUsuarios, chatActivo } = useContext( ChatContext );
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
    useEffect(() => {
        socket?.on( 'lista-usuarios', ( usuarios ) => {
            console.log('cargarUsuarios')
            cargarUsuarios( usuarios );
        })
    }, [ socket ]);
    
    useEffect(() => {
        socket?.on('backend:mensaje-personal', ( mensaje ) => {
            // console.log('backend:mensaje-personal', mensaje)
            refreshClientesConMensajes();
            
            const { pathname } = router;
            const { id } = router.query;

            // Ejemplo de código en base a la URL
            console.log(mensaje.cliente, id);
            console.log(pathname);
            if (pathname.includes('/chat')) {
                if ( mensaje.cliente === id ){
                    cargarMensajes( mensaje.cliente );
                    scrollToBottomAnimated('mensajes');
                }
            }
        })
    }, [socket])
    
    useEffect(() => {
        socket?.on('backend:mensaje-wa', (mensaje) => {
            // console.log('backend:mensaje-wa');
            // console.log(mensaje);
            cargarMensajes( mensaje.cliente );
            scrollToBottomAnimated('mensajes');
        })
        // addNewMensajeNoLeido();
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}