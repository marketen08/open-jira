import { useContext, useEffect } from 'react';
import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';
import { ChatContext } from '../../context/chat';
import { AuthContext } from '../../context';
import { Box, Card, Paper, Typography } from '@mui/material';
import { scrollToBottom, scrollToBottomAnimated } from '../../utils/scrollToBottom';

export const Messages = () => {

    const { mensajes } = useContext( ChatContext );
    const { user } = useContext( AuthContext );

    useEffect(() => {
        scrollToBottomAnimated('mensajes');
    }, [mensajes])

      
    return (
            <Box
                sx={{ overflow: 'auto', height: 'calc(100vh - 175px)', backgroundColor:'#efeae2'  }}
                id='mensajes'
            >
                
                {
                    mensajes.length > 0 ?    
                    mensajes.map( msg => (
                        ( msg.para === user?.uid )
                        ? <IncomingMessage key={ msg._id } msg={ msg } />
                        : <OutgoingMessage key={ msg._id } msg={ msg } />
                        ))
                    : <Typography variant='subtitle1' sx={{ textAlign:'left', padding: 2 }} >Todavía no ha enviado ningun mensaje...</Typography>
                }
               <SendMessage />
            </Box>

    )
}
