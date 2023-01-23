import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { AuthContext, ChatContext } from '../../context';
import { SocketContext } from '../../context/socket'
// import { Media, FormControl, Button, InputGroup } from 'react-bootstrap';

export const SendMessage = () => {

    const [mensaje, setMensaje] = useState('');
    const { socket } = useContext( SocketContext );
    const { user } = useContext( AuthContext );
    const { chatActivo } = useContext( ChatContext );

    const onChange = ( { target }: ChangeEvent<HTMLInputElement>) => {
        setMensaje( target.value);
    }

    const onSubmit = ( ev: FormEvent ) => {
        ev.preventDefault();
      
        if (mensaje.length === 0 ) { return; }

        setMensaje('');

        socket.emit('mensaje-personal', {
            de: user?.uid,
            para: chatActivo,
            mensaje
        });

    }


    return (
        <form onSubmit={ onSubmit } autoComplete="off">
            <Box>
              <Box>
                <Button variant='outlined' color='success' >
                  {/* <i className="feather icon-paperclip" /> */}
                  Adjuntar
                </Button>
              </Box>
              <TextField 
                  type="text" 
                  name="h-chat-text" 
                  className="h-send-chat" 
                  placeholder="Mensaje. . . " 
                  value={ mensaje }
                  onChange={ onChange }
              />
              <Button variant='outlined' type="submit" color='primary'>
                {/* <i className="feather icon-message-circle" /> */}
                Enviar
              </Button>
            </Box>
        </form>
    )
}
