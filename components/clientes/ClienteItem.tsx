import { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { TableCell, TableRow, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Cliente } from '../../interfaces';
import { MoreVertOutlined } from '@mui/icons-material';
import { ChatContext } from '../../context';
import { externalApiConToken } from '../../apiAxios';
import Swal from 'sweetalert2';

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

  const handleEliminarCliente = async ( ) => {

    Swal.fire({
      title: 'Desea eliminar el cliente?',
      text: "No podra revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then(async(result) => {
        // ELIMINAR CLIENTE
        if (result.isConfirmed) {
          try {
            console.log(cliente.id);
            await externalApiConToken.delete(`/clientes/${ cliente.id }`);
            if (result.isConfirmed) {
              Swal.fire(
                'Cliente eliminado!',
                'El cliente ha sido eliminado.',
                'success'
              )
            }
          } catch (error: any) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo eliminar el cliente!'
            })
          }
        }
      
    })

    
   
        

}

  return (
    <TableRow
      key={ cliente.id }
      hover
    >
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
            <MenuItem onClick={handleActivarChat}>Chat</MenuItem>
            <MenuItem onClick={onClick}>Editar</MenuItem>
            <MenuItem onClick={handleEliminarCliente}>Eliminar</MenuItem>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  )
}
