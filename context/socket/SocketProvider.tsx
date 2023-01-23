import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import { Socket } from 'socket.io-client';
import { useSocket } from '../../hooks/useSocket';
import { AuthContext } from '../auth';
import { chatReducer, CHAT_INITIAL_STATE } from '../chat';
import { SocketContext, socketReducer } from './';

interface Props {
    children: ReactNode
}

export interface SocketState {
    socket: Socket|null;
    online: boolean;
}

const Socket_INITIAL_STATE: SocketState = {
    socket: null,
    online: false
}

export const SocketProvider:FC<Props> = ({ children }) => {

    // const [stateSocket, dispatchSocket] = useReducer( socketReducer, Socket_INITIAL_STATE )
    const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE )

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
            // console.log(usuarios);
            dispatch({ type: 'Chat - Usuarios Cargados', payload: usuarios });
        })
    }, [ socket, dispatch ]);


    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch({ type: 'Chat - Nuevo Mensaje', payload: mensaje });
            // scrollToBottomAnimated('mensajes');
        })

    }, [ socket, dispatch ]);
    
    return (
        <SocketContext.Provider value={{ socket, online }} >
            { children }
        </SocketContext.Provider>
    )
}