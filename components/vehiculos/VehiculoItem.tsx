import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material';
import { Vehiculo } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';

interface Props {
    vehiculo: Vehiculo;
}

export const VehiculoItem:FC<Props> = ({ vehiculo }) => {

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
    router.push(`/vehiculos/${ vehiculo.id }`);
  }

  const onCrearNuevoPedido = () => {
    router.push(`/pedidos/nuevo/${ vehiculo.id }`);
  }

  return (
    <TableRow
            key={ vehiculo.id }
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // onClick={ onClick }
            hover
    >
      <TableCell component="th" scope="row">
          { vehiculo.patente }
      </TableCell>
      <TableCell>{ vehiculo.marca }</TableCell>
      <TableCell>{ vehiculo.modelo }</TableCell>
      <TableCell>{ vehiculo.cliente.nombre }</TableCell>
      <TableCell>{ vehiculo.cliente.celular }</TableCell>
      <TableCell>{ vehiculo.cliente.email }</TableCell>
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
