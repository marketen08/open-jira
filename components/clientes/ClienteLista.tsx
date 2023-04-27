import { FC } from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material'
import { Cliente } from '../../interfaces';
import { ClienteItem } from './ClienteItem';

interface Props {
  clientes: Cliente[]|undefined;
  page: number;
  rowsPerPage: number;
}

export const ClienteLista:FC<Props> = ({ clientes, page, rowsPerPage }) => {

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, clientes ? clientes.length : 0 - page * rowsPerPage);

  return (
    <TableBody>
        {
            clientes?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map( cliente => (
                <ClienteItem key={ cliente.id } cliente={ cliente } />
            ))
        }
        { emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
    </TableBody>
  )
}
