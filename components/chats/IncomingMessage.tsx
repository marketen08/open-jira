import { Box, Card, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { horaMes } from '../../utils/horaMes'
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import ReactAudioPlayer from 'react-audio-player';
import { IMensaje } from '../../interfaces';

interface Props {
    msg: IMensaje
}

export const IncomingMessage:FC<Props> = ({ msg }) => {

    return (
        <Box display="flex">
            <Card sx={{ margin: 1, backgroundColor: 'white', color: 'black', maxWidth: '450px', padding: 2, paddingBottom: 1 }}>
                {
                    msg.tipo === 'texto' &&
                    <Typography sx={{ textAlign: 'left', paddingBottom: 1}}>
                        { msg.body }
                    </Typography>
                }
                {
                    msg.tipo === 'boton' &&
                    <Box>
                        <Typography sx={ msg.body === 'Acepta el presupuesto' 
                                        ? { textAlign: 'left', fontWeight: 'bold', border: 1, padding: 2, marginBottom: 2, fontSize: 25, color: 'green' }
                                        : { textAlign: 'left', fontWeight: 'bold', border: 1, padding: 2, marginBottom: 2, fontSize: 25, color: 'red' }
                        }>
                            { msg.body }
                        </Typography>
                    </Box>
                }
                {
                    msg.tipo === 'documento' &&
                        <Box>
                            <Typography sx={{ textAlign: 'left', paddingBottom: 1, display: 'flex', alignItems: 'center'}}>
                                <Link href={ msg.link } underline="none" sx={{ paddingRight: 1 }}>
                                    { msg.body }
                                </Link>
                                <Link href={ msg.link } underline="none">
                                    <CloudDownloadOutlinedIcon sx={{ fontSize: 30 }} />
                                </Link>
                            </Typography>
                        </Box>
                }
                {
                    msg.tipo === 'image' &&
                        <Box>
                            <Typography sx={{ textAlign: 'left', paddingBottom: 1, display: 'flex', alignItems: 'center'}}>
                                <Link href={ msg.link } underline="none" sx={{ paddingRight: 1 }} download>
                                    <img src={ msg.link } alt="Imagen" height={ 200 } />
                                </Link>
                                {/* <Link href={ msg.link } underline="none">
                                    <CloudDownloadOutlinedIcon sx={{ fontSize: 30 }} />
                                </Link> */}
                            </Typography>
                        </Box>
                }
                {
                    msg.tipo === 'voice' &&
                        <Box>
                            <ReactAudioPlayer
                                src={ msg.link }
                                controls
                            />
                            {/* <Typography sx={{ textAlign: 'left', paddingBottom: 1, display: 'flex', alignItems: 'center'}}>
                            </Typography> */}
                        </Box>
                }
                <Typography sx={{ textAlign: 'left'}}>
                    { horaMes( msg.createdAt! ) }
                </Typography>
            </Card>
        </Box>

    )
}
