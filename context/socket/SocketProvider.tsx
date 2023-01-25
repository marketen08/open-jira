import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../../hooks/useSocket';
import { IUsuario } from '../../interfaces';
import { AuthContext } from '../auth';
import { SocketContext, socketReducer } from './';

interface Props {
    children: ReactNode
}

export interface SocketState {
    socket: Socket|null
    online: boolean;
    usuarios: IUsuario[];
}

export const SOCKET_INITIAL_STATE: SocketState = {
    socket: null,
    online: false,
    usuarios: [],
}

export const SocketProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( socketReducer, SOCKET_INITIAL_STATE )

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

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on( 'lista-usuarios', (usuarios) => {
            dispatch({ type: 'Socket - Usuarios cargados', payload: usuarios });
        })
    }, [ socket, dispatch ]);


    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            console.log(mensaje);
            dispatch({ type: 'Socket - Mensajes cargados', payload: mensaje });
            // scrollToBottomAnimated('mensajes');
        })

    }, [ socket, dispatch ]);
    
    return (
        <SocketContext.Provider value={{
            ...state
        }} >
            { children }
        </SocketContext.Provider>
    )
}