import React, { FC } from 'react'
import { horaMes } from '../../utils/horaMes'

export const OutgoingMessage:FC<any> = ({ msg }) => {

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ msg.mensaje }</p>
                <span className="time_date"> { horaMes( msg.createdAt ) }</span>
            </div>
        </div>
    )
}
