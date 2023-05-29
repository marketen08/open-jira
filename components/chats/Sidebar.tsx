import { useContext } from 'react';
import { List } from '@mui/material';
import { ClientesContext } from '../../context';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
    
    const { clientesConMensajes } = useContext( ClientesContext );

    return (
        <List sx={{ width: '100%', padding: 1 }}>
            {
                clientesConMensajes
                    .filter( cliente => cliente.mensajes.length !== 0 )
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
