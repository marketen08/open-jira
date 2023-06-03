import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Menu, TableCell, TableRow, Typography, MenuItem } from '@mui/material';
import { Pedido } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';
import { ChatContext, UIContext } from '../../context';
import { scrollToBottomAnimated } from '../../utils/scrollToBottom';

interface Props {
    pedido: Pedido;
}

export const PedidoItem:FC<Props> = ({ pedido }) => {

  const router = useRouter();

  const { activarChat } = useContext(ChatContext);
  
  const handleActivarChat = async() => {
    const idCliente = pedido.vehiculo.cliente._id;
    activarChat( idCliente )
    router.push(`/chat/${ idCliente }`);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const onClick = () => {
    router.push(`/pedidos/${ pedido.id }`);
  }

  const onCrearNuevoPedido = () => {
    router.push(`/pedidos/nuevo/${ pedido.vehiculo._id }`);
  }

  return (
    <TableRow
            key={ pedido.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            hover
    >
      <TableCell component="th" scope="row">
          { pedido.numero }
      </TableCell>
      <TableCell>{ pedido.vehiculo.marca } { pedido.vehiculo.modelo }</TableCell>
      <TableCell>{ pedido.vehiculo.patente }</TableCell>
      <TableCell>{ pedido.vehiculo.cliente.nombre }</TableCell>
      <TableCell  sx={{ maxWidth: '250px' }}>{ pedido.descripcion.length >= 50 ? pedido.descripcion.substring(0, 50) + '...'  : pedido.descripcion }</TableCell>
      <TableCell>{ pedido.estado }</TableCell>
      <TableCell>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreVertOutlined />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={ anchorEl }
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={ handleClose }
          >
            <MenuItem onClick={onCrearNuevoPedido}>Crear nuevo pedido</MenuItem>
            <MenuItem onClick={onClick}>Editar</MenuItem>
            <MenuItem onClick={handleActivarChat}>Chat</MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  )
}
