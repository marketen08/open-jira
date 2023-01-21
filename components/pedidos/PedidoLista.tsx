import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus } from '../../interfaces';
import { PedidoItem } from './PedidoItem';
import { PedidosContext } from '../../context';
import { UIContext } from '../../context/ui';

interface Props {
  status: EntryStatus;
}

export const PedidoLista:FC = () => {

  const { pedidos } = useContext( PedidosContext );
  const { isDragging, endDragging } = useContext(UIContext);

  // Memoriza los valores cada vez que cambian los valores de '[ entries ]'
//   const pedidosByStatus = useMemo( () => pedidos.filter( pedido => pedido.activo === true ), [ pedidos ] );
  
// console.log({pedidos});

  return (
    // Aqui haremos el drop
    <TableBody>
        {
            pedidos?.map( pedido => (
                <PedidoItem key={ pedido.id } pedido={ pedido } />
            ))
        }
    </TableBody>
  )
}
