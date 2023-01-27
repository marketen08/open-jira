import { FC } from 'react';
import { TableBody } from '@mui/material'
import { Cliente } from '../../interfaces';
import { ClienteItem } from './ClienteItem';

interface Props {
  clientes: Cliente[]|undefined
}

export const ClienteLista:FC<Props> = ({ clientes }) => {

  return (
    <TableBody>
        {
            clientes?.map( cliente => (
                <ClienteItem key={ cliente.id } cliente={ cliente } />
            ))
        }
    </TableBody>
  )
}
