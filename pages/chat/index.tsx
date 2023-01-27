import { useContext } from 'react';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';
import { ChatContext } from '../../context/chat/ChatContext';

// import '../css/chat.css';


export const ChatPage = () => {

    const { chatActivo } = useContext( ChatContext );
   
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />
                {
                    (chatActivo)
                        ? <Messages />
                        : <ChatSelect />
                }
                

            </div>


        </div>
    )
}

export default ChatPage;