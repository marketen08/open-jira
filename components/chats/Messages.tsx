import { useContext } from 'react';
import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';
import { ChatContext } from '../../context/chat';
import { AuthContext } from '../../context';

export const Messages = () => {

    const { mensajes } = useContext( ChatContext );


    const { user } = useContext( AuthContext );

    return (
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div
                id="mensajes2"
                className="msg_history"
            >

                {
                    mensajes.map( msg => (
                        ( msg.para === user?.uid )
                            ? <IncomingMessage key={ msg._id } msg={ msg } />
                            : <OutgoingMessage key={ msg._id } msg={ msg } />
                    ))
                }

                

            </div>
            {/* <!-- Historia Fin --> */}

           <SendMessage />

        </div>
    )
}
