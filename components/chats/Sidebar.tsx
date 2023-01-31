import { useContext } from 'react';
import { List } from '@mui/material';
import { AuthContext, ChatContext } from '../../context';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
    
    const { user } = useContext( AuthContext );
    const { usuarios } = useContext( ChatContext );

    return (
        <List sx={{ width: '100%', padding: 1 }}>
            {
                usuarios
                    .filter( us => us.uid !== user?.uid )
                    .map( ( usuario ) => (
                    <SidebarChatItem 
                        key={ usuario.uid }
                        usuario={ usuario }
                    />
                ))
            }
        </List>
    )
}
