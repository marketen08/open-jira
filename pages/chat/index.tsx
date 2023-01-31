import { useContext } from 'react';
import { Box, Card, CardHeader, Grid, Paper } from '@mui/material';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';
import { ChatContext } from '../../context/chat/ChatContext';

import { styled } from '@mui/material/styles';
import { Layout } from '../../components/layouts';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const ChatPage = () => {

    const { chatActivo } = useContext( ChatContext );
   
    return (
        <Layout title='Home - OpenJira'>
            <Grid container spacing={ 2 }>
                <Grid item xs>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Contactos" />
                        <InboxPeople />
                    </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Mensajes" />
                        {
                            ( chatActivo )
                            ? <Messages />
                            : <ChatSelect />
                        }
                    </Item>
                </Grid>
                <Grid item xs>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                    <CardHeader title="Detalle" />
                        Detalle del usuario selecionado
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ChatPage;