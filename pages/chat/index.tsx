import { useContext } from 'react';
import { Box, Card, CardHeader, Grid, Paper, Typography } from '@mui/material';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';
import { ChatContext } from '../../context/chat/ChatContext';

import { styled } from '@mui/material/styles';
import { Layout } from '../../components/layouts';
import { ClientesContext } from '../../context';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  }));

export const ChatPage = () => {

    const { chatActivo, usuarios } = useContext( ChatContext );
    const { clientes } = useContext( ClientesContext );

    const usuarioActivo = usuarios.filter( usuario => usuario.uid === chatActivo )[0]
    const cliente = clientes.filter( cliente => cliente.email === usuarioActivo.email )[0]

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
                        { cliente &&
                            <Box>
                                <Typography sx={{ paddingTop: 1 }}>
                                    { cliente.nombre }
                                </Typography>
                                <Typography sx={{ paddingTop: 1 }}>
                                    { cliente.tipoDeDocumento } { cliente.numero }
                                </Typography>
                                <Typography sx={{ paddingTop: 1 }}>
                                    Email: { cliente.email }
                                </Typography>
                                <Typography sx={{ paddingTop: 1 }}>
                                    Celular: { cliente.celular }
                                </Typography>
                                <Typography sx={{ paddingTop: 1 }}>
                                    Domicilio: { cliente.domicilio }
                                </Typography>
                                <Typography sx={{ paddingTop: 1 }}>
                                    Localidad: { cliente.localidad }
                                </Typography>
                            </Box>
                        }
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ChatPage;