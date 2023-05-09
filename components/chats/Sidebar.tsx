import { useContext } from 'react';
import { List } from '@mui/material';
import { AuthContext, ChatContext, ClientesContext } from '../../context';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
    
    const { user } = useContext( AuthContext );
    const { clientesConMensajes } = useContext( ClientesContext );

    console.log('ccm', clientesConMensajes);
    return (
        <List sx={{ width: '100%', padding: 1 }}>
            {
                clientesConMensajes
                    .filter( cliente => cliente.id !== user?.uid )
                    .map( ( cliente ) => (
                    <SidebarChatItem 
                        key={ cliente.id }
                        cliente={ cliente }
                    />
                ))
            }
        </List>
    )
}
