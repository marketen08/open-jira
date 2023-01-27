import { useCallback, useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';
import Cookies from 'js-cookie';


export const useSocket = ( serverPath:string ) => {
    
    // const token = localStorage.getItem('token');

    // console.log('first')
    // const socketTemp:Socket = null;

    const [ socket, setSocket ] = useState<Socket|null>(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = Cookies.get('token')

        const socketTemp:Socket = io( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            timeout: 20000,
            
            
            query: {
                'x-token': token
            }
        });
        setSocket( socketTemp );
    },[ serverPath ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        if ( socket ) {
            setOnline( socket?.connected );
        }
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}