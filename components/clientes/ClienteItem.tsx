import { FC } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Cliente } from '../../interfaces';

interface Props {
    cliente: Cliente;
}

export const ClienteItem:FC<Props> = ({ cliente }) => {


  return (
    <TableRow
            key={ cliente.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
        <TableCell component="th" scope="row">
            { cliente.nombre }
        </TableCell>
        <TableCell>{ cliente.codigo }</TableCell>
        <TableCell>{ cliente.razonSocial }</TableCell>
        <TableCell>{ cliente.condicionIva }</TableCell>
        <TableCell>{ cliente.email }</TableCell>
    </TableRow>
  )
}
