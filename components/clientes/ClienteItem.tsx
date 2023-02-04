import { FC } from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableRow, Typography } from '@mui/material';
import { Cliente } from '../../interfaces';

interface Props {
    cliente: Cliente;
}

export const ClienteItem:FC<Props> = ({ cliente }) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/clientes/${ cliente.id }`);
  }

  return (
    <TableRow
            key={ cliente.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }}
            onClick={ onClick }
            hover
    >
      <TableCell>{ cliente.codigo }</TableCell>
      <TableCell component="th" scope="row">
          { cliente.nombre }
      </TableCell>
      <TableCell>{ cliente.tipoDeDocumento } { cliente.numero }</TableCell>
      <TableCell>{ cliente.email }</TableCell>
      <TableCell>{ cliente.celular }</TableCell>
      <TableCell>{ cliente.domicilio }</TableCell>
    </TableRow>
  )
}
