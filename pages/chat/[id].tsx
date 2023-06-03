import { FC, useContext, useEffect } from 'react';
import { Box, Card, CardHeader, Grid, Paper, Typography } from '@mui/material';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';
import { ChatContext } from '../../context/chat/ChatContext';

import { styled } from '@mui/material/styles';
import { Layout } from '../../components/layouts';
import { ClientesContext } from '../../context';
import { GetServerSideProps } from 'next';
import { externalApiConToken } from '../../apiAxios';
import { Cliente, ClienteConMensajes } from '../../interfaces';
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
  }));

interface Props {
    cliente: ClienteConMensajes
}

export const ChatPage:FC<Props> = ({ cliente }) => {
    
    const { activarChat, chatActivo } = useContext(ChatContext);

    useEffect(() => {
        console.log(cliente.id);
        activarChat( cliente.id )
    }, [cliente.id, chatActivo])
    
    return (
        <Layout>
            <Grid container spacing={ 2 }>
                <Grid item xs={12} md={8}>
                    <Item sx={{ height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Mensajes" sx={{ backgroundColor: 'gray', color: 'white'}} />
                        {
                            ( cliente.id )
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


export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };

    try {
        const { data } = await externalApiConToken.get(`/clientes/${ id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        return {
            props: {
                cliente: data
            }
        }

    } catch (error) {
        // console.log(error)
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    

    
    
    
}


export default ChatPage;