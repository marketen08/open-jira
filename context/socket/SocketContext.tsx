import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { IUsuario } from '../../interfaces';

interface ContextProps {
    socket: Socket|null
    online: boolean;
    usuarios: IUsuario[];
}


export const SocketContext = createContext({} as ContextProps );