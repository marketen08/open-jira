import { Card, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { horaMes } from '../../utils/horaMes'

export const OutgoingMessage:FC<any> = ({ msg }) => {

    return (
        <Box display="flex" justifyContent="flex-end">
            <Card sx={{ margin: 1, 
                        backgroundColor: '#d9fdd3', 
                        color: 'black', maxWidth: '450px', 
                        padding: 2,
                        paddingBottom: 1, justifyItems: 'flex-end' }}
                        >
                <Typography sx={{ textAlign: 'right', paddingBottom: 1}}>
                    { msg.mensaje }
                </Typography>
                <Typography sx={{ textAlign: 'right'}}>
                    { horaMes( msg.createdAt ) }
                </Typography>
            </Card> 
        </Box>
    )
}
