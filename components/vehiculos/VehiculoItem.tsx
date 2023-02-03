import { FC } from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Vehiculo } from '../../interfaces';

interface Props {
    vehiculo: Vehiculo;
}

export const VehiculoItem:FC<Props> = ({ vehiculo }) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/vehiculos/${ vehiculo.id }`);
  }

  return (
    <TableRow
            key={ vehiculo.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }}
            onClick={ onClick }
            hover
    >
      <TableCell component="th" scope="row">
          { vehiculo.patente }
      </TableCell>
      <TableCell>{ vehiculo.marca }</TableCell>
      <TableCell>{ vehiculo.modelo }</TableCell>
      <TableCell>{ vehiculo.cliente.nombre }</TableCell>
      <TableCell>{ vehiculo.cliente.celular }</TableCell>
      <TableCell>{ vehiculo.cliente.email }</TableCell>
    </TableRow>
  )
}
