import { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableRow, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Cliente } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';
import { ChatContext } from '../../context';

interface Props {
    cliente: Cliente;
}

export const ClienteItem:FC<Props> = ({ cliente }) => {

  const router = useRouter();

  const { activarChat } = useContext(ChatContext);

  const onClick = () => {
    router.push(`/clientes/${ cliente.id }`);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActivarChat = () => {
    activarChat( cliente.id )
    router.push(`/chat/${ cliente.id }`);
  }


  return (
    <TableRow
            key={ cliente.id }
            // sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }}
            // onClick={ onClick }
            hover
    >
      <TableCell>{ cliente.codigo }</TableCell>
      <TableCell component="th" scope="row">
          { cliente.nombre }
      </TableCell>
      <TableCell>{ cliente.tipoDeDocumento } { cliente.numero }</TableCell>
      <TableCell>{ cliente.email }</TableCell>
      <TableCell>{ cliente.celular }</TableCell>
      <TableCell>{ cliente.estado }</TableCell>
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
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  )
}
