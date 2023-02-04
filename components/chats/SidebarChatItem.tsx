import { useContext } from 'react'
import { ChatContext, UIContext } from '../../context';
import { scrollToBottom, scrollToBottomAnimated } from '../../utils/scrollToBottom';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const SidebarChatItem = ({ usuario }:any) => {
    
    const router = useRouter();

    const { activarChat, cargarMensajes, chatActivo, mensajes } = useContext(ChatContext);

    const { closeChatMenu } = useContext( UIContext );

    const handleActivarChat = async() => {
        
        closeChatMenu()
        router.push('/chat');

        activarChat( usuario.uid )
        cargarMensajes( usuario.uid )
        scrollToBottomAnimated('mensajes');
    }

    return (
        <>
            <ListItemButton alignItems="flex-start" onClick={ handleActivarChat } sx={{ cursor:'pointer', padding: 2, backgroundColor: 'white' }}> 
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
                </ListItemAvatar>
                <ListItemText
                    primary={ usuario.nombre }
                    secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline', paddingRight: 1 }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    { '11-3352-0349' }
                                </Typography>
                                {
                                    ( usuario.online )
                                    ? <span className="text-success">Online</span>
                                    : <span className="text-danger">Offline</span>
                                }
                            </>
                        }
                    />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    )
}
