import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus, Pedido } from '../../interfaces';
import { PedidoItem } from './PedidoItem';
import { PedidosContext } from '../../context/pedidos';
import { UIContext } from '../../context/ui';

interface Props {
  pedidos: Pedido[]|undefined,
  cliente: string,
  estado: string,

}

export const PedidoLista:FC<Props> = ({ pedidos, cliente, estado }) => {

  console.log(cliente);

  return (
    // Aqui haremos el drop
    <TableBody>
        {
            pedidos?.filter( pedido => pedido.estado === estado || estado === 'Todos' )
            .filter( pedido => pedido.vehiculo.cliente._id === cliente || cliente === 'Todos' )
            .map( pedido => (
                <PedidoItem key={ pedido.id } pedido={ pedido } />
            ))
        }
    </TableBody>
  )
}
