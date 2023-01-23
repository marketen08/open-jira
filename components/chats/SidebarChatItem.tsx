import { useContext, useReducer } from 'react'
import { ChatContext, chatReducer, CHAT_INITIAL_STATE } from '../../context';
import { scrollToBottom } from '../../utils/scrollToBottom';
import externalApi from '../../apiAxios/externalApi';

export const SidebarChatItem = ({ usuario }:any) => {
    
    const { chatActivo } = useContext( ChatContext );
    
    const activarChat = () => {

        const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE );

        dispatch({ type: 'Chat - Activar Chat', payload: usuario.uid });
        
        // Cargar los mensajes de l chat
        // dispatch( chatStartLoading( usuario.uid ) )
        const resp:any = externalApi.get(`mensajes/${ usuario.uid }`);
        console.log(resp);
        dispatch({ type: 'Chat - Cargar Mensajes', payload: resp.mensajes });


        // Scroll automatico hacia abajo
        scrollToBottom('mensajes');
    }

    return (
        <div 
            className={`chat_list ${ usuario.uid === chatActivo && 'active_chat'}`}
            onClick={ activarChat }
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
