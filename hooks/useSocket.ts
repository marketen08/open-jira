import { useCallback, useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';


export const useSocket = ( serverPath:string ) => {
    
    // const token = localStorage.getItem('token');

    // console.log('first')
    // const socketTemp:Socket = null;

    const [ socket, setSocket ] = useState<Socket|null>(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp:Socket = io( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            timeout: 20000,
            
            
            query: {
                'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ2MTA0NzcsImV4cCI6MTY3NDY5Njg3N30.wOdeR8sDBuWUibW2_NL4gO3eldSjttPHAHM5mcGVCDw'
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