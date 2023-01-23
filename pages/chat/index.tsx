import React from 'react';
import { ChatSelect, InboxPeople, Messages } from '../../components/chats';

// import '../css/chat.css';

export const ChatPage = () => {
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {
                    (!true)
                        ? <Messages />
                        : <ChatSelect />
                }
                

            </div>


        </div>
    )
}

export default ChatPage;