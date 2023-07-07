import { FC } from 'react';
import { Paper } from '@mui/material';
import { AdjuntoItem } from './AdjuntoItem';
import { useAdjuntos } from '../../hooks';

interface Props {
    id: string
}

export const AdjuntoLista:FC<Props> = ({ id }) => {

    const { adjuntosResumen, isLoading } = useAdjuntos(`/adjuntos/pedido/${ id }`);

    const adjuntos = adjuntosResumen?.adjuntos;

    return (
        <Paper sx={ adjuntos?.length ? { overflow: 'hidden' } : { display: 'none' }}>
            <ul>
                {
                    adjuntos?.map( adjunto => (
                        <AdjuntoItem key={ adjunto.id } adjunto={ adjunto } />
                    ))
                }
            </ul>
        </Paper>
  )
}
