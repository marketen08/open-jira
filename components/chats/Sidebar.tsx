import { useContext } from 'react';
import { AuthContext, ChatContext } from '../../context';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
    
    const { user } = useContext( AuthContext );
    const { usuarios } = useContext( ChatContext );

    // console.log('ChatContext Sidebar1', usuarios);


    return (
        <div className="inbox_chat">
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
            {/* <!-- Espacio extra para scroll --> */}
            <div className="extra_space"></div>


        </div>

    )
}
