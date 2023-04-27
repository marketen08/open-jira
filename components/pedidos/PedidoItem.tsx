import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Menu, TableCell, TableRow, Typography, MenuItem } from '@mui/material';
import { Pedido } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';

interface Props {
    pedido: Pedido;
}

export const PedidoItem:FC<Props> = ({ pedido }) => {

  const router = useRouter();

  
  const [openMenu, setOpenMenu] = useState(false);
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
    // console.log(pedido)
    router.push(`/pedidos/nuevo/${ pedido.vehiculo._id }`);
  }

  return (
    <TableRow
            key={ pedido.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // onClick={ onClick }
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
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  )
}
