import { FC } from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Pedido } from '../../interfaces';

interface Props {
    pedido: Pedido;
}

export const PedidoItem:FC<Props> = ({ pedido }) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/pedidos/${ pedido.id }`);
  }

  return (
    <TableRow
            key={ pedido.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }}
            onClick={ onClick }
            hover
    >
      <TableCell component="th" scope="row">
          { pedido.numero }
      </TableCell>
      <TableCell>{ pedido.vehiculo }</TableCell>
      <TableCell  sx={{ maxWidth: '250px' }}>{ pedido.descripcion }</TableCell>
      <TableCell>{ pedido.estado }</TableCell>
    </TableRow>
  )
}
