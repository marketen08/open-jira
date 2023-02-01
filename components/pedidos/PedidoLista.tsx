import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus, Pedido } from '../../interfaces';
import { PedidoItem } from './PedidoItem';
import { PedidosContext } from '../../context/pedidos';
import { UIContext } from '../../context/ui';

interface Props {
  pedidos: Pedido[]|undefined
}

export const PedidoLista:FC<Props> = ({ pedidos }) => {

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
