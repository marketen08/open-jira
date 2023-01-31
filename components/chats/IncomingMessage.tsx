import { Box, Card, Typography } from '@mui/material'
import { FC } from 'react'
import { horaMes } from '../../utils/horaMes'



export const IncomingMessage:FC<any> = ({ msg }) => {

    return (
        <Box display="flex">
            <Card sx={{ margin: 1, backgroundColor: 'white', color: 'black', maxWidth: '450px', padding: 2, paddingBottom: 1 }}>
                <Typography sx={{ textAlign: 'left', paddingBottom: 1}}>
                    { msg.mensaje }
                </Typography>
                <Typography sx={{ textAlign: 'left'}}>
                    { horaMes( msg.createdAt ) }
                </Typography>
            </Card>
        </Box>

    )
}
