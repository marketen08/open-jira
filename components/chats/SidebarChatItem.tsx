import { useContext } from 'react'
import { ChatContext } from '../../context';
import { scrollToBottom } from '../../utils/scrollToBottom';

export const SidebarChatItem = ({ usuario }:any) => {
    
    const { activarChat, cargarMensajes, chatActivo } = useContext(ChatContext);

    const handleActivarChat = async() => {
        activarChat( usuario.uid )
        cargarMensajes( usuario.uid )
        scrollToBottom('mensajes');
    }

    return (
        <div 
            className={`chat_list ${ usuario.uid === chatActivo && 'active_chat'}`}
            onClick={ handleActivarChat }
        >
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="sunil" width={ 100 } />
                </div>
                <div className="chat_ib">
                    <h5>{ usuario.nombre }</h5>
                    {
                        ( usuario.online )
                        ? <span className="text-success">Online</span>
                        : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
