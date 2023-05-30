import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AuthContext, ChatContext, ClientesContext } from '../../context';
import { SocketContext } from '../../context/socket'
import { IMensaje } from '../../interfaces/mensaje';
import { externalApiConToken } from '../../apiAxios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const handleServerError = (error: any) => {
    if (error.response) {
      // El servidor ha respondido con un código de estado HTTP diferente de 2xx
      const array = [];
      for (let key in error.response.data.errors) {
        if (error.response.data.errors.hasOwnProperty(key)) {
          const value = error.response.data.errors[key];
          if (value.hasOwnProperty('msg')) {
            array.push(value.msg);
          }
        }
      }
      const errorMessage = `Por favor revisar los siguientes errores:<br>${array.join('<br>')}`;
  
      Swal.fire({
        title: 'Error en la solicitud',
        html: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
  
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error durante la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
};

export const SendMessage = () => {

    const router = useRouter();

    const [ mensaje, setMensaje ] = useState('');
    const { user } = useContext( AuthContext );
    const { socket } = useContext( SocketContext );
    const { chatActivo } = useContext( ChatContext );
    const { refreshClientesConMensajes } = useContext( ClientesContext );

    const onChange = ( { target }: ChangeEvent<HTMLInputElement>) => {
        setMensaje( target.value);
    }

    const onSubmit = ( ev: FormEvent ) => {
        ev.preventDefault();
      
        if (mensaje.length === 0 ) { return; }

        setMensaje('');

        // console.log(chatActivo);
        const payload: IMensaje = {
            cliente: chatActivo!,
            clase: 'enviado',
            body: mensaje,
            estado: 'leido',
            usuario: user?.uid
        }
        
        socket?.emit('frontend:mensaje-personal', payload );

    }

    const onTerminar = async() => {

      console.log(chatActivo, 'chatActivo');
        Swal.fire({
            title: 'Desea marcar todos los mensajes como leidos?',
            text: "No podras revertir este cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, marcar como leido!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    await externalApiConToken.put(`/mensajes/${ chatActivo }`, { estado: 'leido' });
                    Swal.fire(
                        'Perfecto!',
                        'Todos los mensajes fueron marcados como leidos.',
                        'success'
                    )
                    refreshClientesConMensajes();
                } catch (error: any) {
                    handleServerError(error);
                }
             
            }
          })

          
        
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
