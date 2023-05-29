import { Card, Link, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { horaMes } from '../../utils/horaMes'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { IMensaje } from '../../interfaces';

interface Props {
    msg: IMensaje
}

export const OutgoingMessage:FC<Props> = ({ msg }) => {

    return (
        <Box display="flex" justifyContent="flex-end">
            <Card sx={{ margin: 1, 
                        backgroundColor: '#d9fdd3', 
                        color: 'black', maxWidth: '450px', 
                        padding: 2, 
                        textAlign: 'justify', wordBreak: 'break-all',
                        paddingBottom: 1, justifyItems: 'flex-end' }}
                        >
                {
                    msg.tipo === 'documento' ?
                        <Box>
                            <Typography sx={{ textAlign: 'right', paddingBottom: 1, display: 'flex', alignItems: 'center'}}>
                                <Link href={ msg.link } underline="none" sx={{ paddingRight: 1 }}>
                                    { msg.body }
                                </Link>
                                <Link href={ msg.link } underline="none">
                                    <CloudDownloadOutlinedIcon sx={{ fontSize: 30 }} />
                                    
                                </Link>
                            </Typography>
                        </Box>
                    :
                        <Typography sx={{ textAlign: 'right', paddingBottom: 1}}>
                            { msg.body }
                        </Typography>
                }
                
                <Typography sx={{ textAlign: 'right'}}>
                    { horaMes( msg.createdAt! ) }
                </Typography>
            </Card> 
        </Box>
    )
}
