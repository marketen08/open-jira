import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AuthContext, ChatContext } from '../../context';
import { SocketContext } from '../../context/socket'

export const SendMessage = () => {

    const [ mensaje, setMensaje ] = useState('');
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

        socket?.emit('mensaje-personal', {
            de: user?.uid,
            para: chatActivo,
            mensaje
        });

    }

    const onTerminar = () => {
        
    }

    return (
        <form onSubmit={ onSubmit } autoComplete="off">
            <Box display='flex' >
              <TextField 
                  type="text" 
                  name="h-chat-text" 
                  className="h-send-chat" 
                  placeholder="Escribi tu mensaje. . . " 
                  value={ mensaje }
                  onChange={ onChange }
                  multiline
                  fullWidth
                  sx={{ margin: 1}}
              />
              <Button variant='outlined' type="submit" color='primary' sx={{ margin: 1}}>
                {/* <i className="feather icon-message-circle" /> */}
                Enviar
              </Button>
              <Button variant='outlined' type="button" color='primary' sx={{ margin: 1}} onClick={ onTerminar }>
                {/* <i className="feather icon-message-circle" /> */}
                Terminar
              </Button>
            </Box>
        </form>
    )
}
