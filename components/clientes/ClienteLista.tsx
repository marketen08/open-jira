import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus } from '../../interfaces';
import { ClienteItem } from './ClienteItem';
import { ClientesContext } from '../../context/clientes';
import { UIContext } from '../../context/ui';

interface Props {
  status: EntryStatus;
}

export const ClienteLista:FC = () => {

  const { clientes } = useContext( ClientesContext );
  const { isDragging, endDragging } = useContext(UIContext);

  // Memoriza los valores cada vez que cambian los valores de '[ entries ]'
//   const clientesByStatus = useMemo( () => clientes.filter( cliente => cliente.activo === true ), [ clientes ] );
  
// console.log({clientes});

  return (
    // Aqui haremos el drop
    <TableBody>
        {
            clientes?.map( cliente => (
                <ClienteItem key={ cliente.id } cliente={ cliente } />
            ))
        }
    </TableBody>
  )
}
