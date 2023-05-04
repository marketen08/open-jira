import { FC, useContext, useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TableRow, Table, TableHead } from '@mui/material';
import { Adjunto } from '../../interfaces';
import { AdjuntoItem } from './AdjuntoItem';
import { useAdjuntos } from '../../hooks';
import { AdjuntosContext } from '../../context/adjuntos';

interface Props {
    id: string
}

export const AdjuntoLista:FC<Props> = ({ id }) => {

    const { addNewAdjunto, adjuntos } = useContext(AdjuntosContext);
    const { adjuntosResumen, isLoading } = useAdjuntos(`/adjuntos/pedido/${ id }`);

    // const adjuntos = adjuntosResumen?.adjuntos;



    return (
        <Paper sx={{ overflow: 'hidden' }}>
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
