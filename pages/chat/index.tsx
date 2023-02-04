import { useContext } from 'react';
import { Box, Card, CardHeader, Grid, Paper, Typography } from '@mui/material';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';
import { ChatContext } from '../../context/chat/ChatContext';

import { styled } from '@mui/material/styles';
import { Layout } from '../../components/layouts';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  }));

export const ChatPage = () => {

    const { chatActivo } = useContext( ChatContext );
   
    return (
        <Layout>
            <Grid container spacing={ 2 }>
                {/* <Grid item xs>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Contactos" sx={{ backgroundColor: 'gray', color: 'white'}} />
                        <InboxPeople />
                    </Item>
                </Grid> */}
                <Grid item xs={12} md={8}>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Mensajes" sx={{ backgroundColor: 'gray', color: 'white'}} />
                        {
                            ( chatActivo )
                            ? <Messages />
                            : <ChatSelect />
                        }
                    </Item>
                </Grid>
                <Grid item xs>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                    <CardHeader title="Detalle" sx={{ backgroundColor: 'gray', color: 'white'}} />
                    <Typography sx={{ padding: 2 }}>
                        Detalle del usuario selecionado
                    </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ChatPage;