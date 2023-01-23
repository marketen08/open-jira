import { useCallback, useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';


export const useSocket = ( serverPath:string ) => {
    
    // const token = localStorage.getItem('token');

    // console.log('first')
    const socketTemp:Socket = io( serverPath, { 
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {
            'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ1MDI3MDIsImV4cCI6MTY3NDU4OTEwMn0.o2gY5kyaQ95ZXOHaEMASFjNUiw6z1PtFVDok1T62XSM'
        }
    });

    const [ socket, setSocket ] = useState<Socket>(socketTemp);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp:Socket = io( serverPath, { 
            transports: ['websocket'],
            // autoConnect: true,
            // forceNew: true,
            // timeout: 20000,
            
            
            query: {
                'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ1MDI3MDIsImV4cCI6MTY3NDU4OTEwMn0.o2gY5kyaQ95ZXOHaEMASFjNUiw6z1PtFVDok1T62XSM'
            }
        });
        setSocket( socketTemp );
    },[ serverPath ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        setOnline( socket?.connected );
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