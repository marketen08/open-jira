import { useContext, useReducer } from 'react'
import { ChatContext, chatReducer, ChatState } from '../../context';
import { scrollToBottom } from '../../utils/scrollToBottom';
import externalApi from '../../apiAxios/externalApi';
import { IUsuario } from '../../interfaces/usuarios';
// import { socketReducer, SocketState } from '../../context/socket';

export const SidebarChatItem = ({ usuario }:any) => {
    
    const { activarChat, cargarMensajes, chatActivo, mensajes } = useContext(ChatContext);

    // const CHAT_INITIAL_STATE: ChatState = {
    //     uid: '',
    //     chatActivo: null,
    //     mensajes: []
    // }

    // const [stateChat, dispatchChat] = useReducer( chatReducer, CHAT_INITIAL_STATE );
    // const [state, dispatch] = useReducer( chatReducer, CHAT_INITIAL_STATE );

    // const { chatActivo } = useContext( ChatContext );
    
    const handleActivarChat = async() => {
        
        activarChat( usuario.uid )
        cargarMensajes( usuario.uid )
        console.log('first ok', usuario.uid, mensajes, chatActivo)
        // dispatchSocket({ type: 'Socket - Activar Chat', payload: usuario.uid });
        // Cargar los mensajes de l chat
        // dispatch( chatStartLoading( usuario.uid ) )
        // const { data } = await externalApi.get(`mensajes/${ usuario.uid }`);
        // dispatch({ type: 'Socket - Mensajes cargados', payload: data.mensajes });
        // console.log(data.mensajes)
        // Scroll automatico hacia abajo
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
