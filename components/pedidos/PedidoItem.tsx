import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Swal from 'sweetalert2';

import { IconButton, Menu, TableCell, TableRow, MenuItem } from '@mui/material';
import { Pedido } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';
import { ChatContext } from '../../context';
import { externalApiConToken } from '../../apiAxios';

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

  const onDescartarPedido = () => {

    handleClose();

    Swal.fire({
      title: 'Desea rechazar el pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar!'
    }).then(async(result) => {
        // RECHAZAR PEDIDO
        if (result.isConfirmed) {
          try {
            await externalApiConToken.put(`/pedidos/${ pedido.id }`, { estado: 'Rechazado' });
            if (result.isConfirmed) {
              Swal.fire(
                'Pedido Rechazado!',
                'El pedido ha sido rechazado.',
                'success'
              )
            }
          } catch (error: any) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo rechazar el pedido!'
            })
          }
        }
      
    })

  }

  const onRetomarPedido = () => {

    handleClose();

    Swal.fire({
      title: 'Desea retomar el pedido?',
      // text: "No podra revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, retomar!'
    }).then(async(result) => {
        // RECHAZAR PEDIDO
        if (result.isConfirmed) {
          try {
            await externalApiConToken.put(`/pedidos/${ pedido.id }`, { estado: 'Nuevo' });
            if (result.isConfirmed) {
              Swal.fire(
                'Pedido restablecido!',
                'Se ha cambido el estado del pedido a Nuevo.',
                'success'
              )
            }
          } catch (error: any) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo cambiar el estado!'
            })
          }
        }
      
    })

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
        { moment( pedido.updatedAt ).format( 'DD/MM/yyyy' ) }
      </TableCell>
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
            <MenuItem onClick={onClick}>Editar</MenuItem>
            <MenuItem onClick={handleActivarChat}>Chat</MenuItem>
            {
              pedido.estado === 'Rechazado' ? 
              <MenuItem onClick={onRetomarPedido}>Volver a cotizar</MenuItem>
              :
              <MenuItem onClick={onDescartarPedido}>Rechazar</MenuItem>
            }
            <MenuItem onClick={onCrearNuevoPedido}>Crear nuevo pedido</MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  )
}
