import { FC, useContext } from 'react'
import { ChatContext, UIContext } from '../../context';
import { scrollToBottom, scrollToBottomAnimated } from '../../utils/scrollToBottom';
import { Avatar, Badge, Divider, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ClienteConMensajes } from '../../interfaces';
import { EmailOutlined } from '@mui/icons-material';

interface Props {
    cliente: ClienteConMensajes
}

export const SidebarChatItem:FC<Props> = ({ cliente }) => {
    
    // console.log(cliente.mensajes.length)
    const router = useRouter();

    const { activarChat, cargarMensajes, chatActivo, mensajes } = useContext(ChatContext);

    const { closeChatMenu } = useContext( UIContext );

    const handleActivarChat = async() => {
        
        closeChatMenu()
        
        activarChat( cliente.id )

        router.push(`/chat/${ cliente.id }`);
        console.log(cliente.id)
        // cargarMensajes( cliente.usuarioCliente )
        // scrollToBottomAnimated('mensajes');
    }

    return (
        <>
            <ListItemButton alignItems="flex-start" onClick={ handleActivarChat } sx={{ cursor:'pointer', padding: 2, backgroundColor: 'white' }}> 
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
                </ListItemAvatar>
                <ListItemText
                    primary={ cliente.nombre }
                    secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline', paddingRight: 1 }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    { cliente.celular }
                                </Typography>
                                {
                                    ( cliente.email )
                                    ? <span className="text-success">Online</span>
                                    : <span className="text-danger">
                                            <Badge badgeContent={ cliente.mensajes.length } color="primary">
                                                <EmailOutlined />
                                            </Badge>
                                    </span>
                                }
                            </>
                        }
                    />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    )
}
