import { useContext } from 'react';
import { AuthContext, ChatContext } from '../../context';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
    
    const { user } = useContext( AuthContext );
    const { usuarios } = useContext( ChatContext );

    console.log('Sidebar Usuarios cargados', usuarios);


    return (
        <div className="inbox_chat">
                    {/* <SidebarChatItem 
                        key={ '63c98ea65d21548037e0d50b' }
                        usuario={ usuario }
                    /> */}
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
