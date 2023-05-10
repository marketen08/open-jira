import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { Adjunto } from '../../interfaces';
import { DeleteForever, MoreVertOutlined } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import CloudDownloadOutlined from '@mui/icons-material/CloudDownloadOutlined';
import Swal from 'sweetalert2'
import { externalApiConToken } from '../../apiAxios';
import {useContext} from 'react';
import { AdjuntosContext } from '../../context';

interface Props {
    adjunto: Adjunto;
}

export const AdjuntoItem:FC<Props> = ({ adjunto }) => {

  const router = useRouter();

  const { refreshAdjuntos } = useContext(AdjuntosContext)

  const onClick = () => {
    router.push(`/adjuntos/${ adjunto.id }`);
  }
  
  // const eliminar = async() => {
  //   const cotizando = await externalApiConToken.put(`/pedidos/cotizando/${ adjunto.id }`)

  // }

  const handleDelete = async() => {
    Swal.fire({
      title: '¿Desea eliminar la imagen adjunta?',
      text: "No podra revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        
        try {

          new Promise(async(resolve) => {
            const cotizando = await externalApiConToken.delete(`/adjuntos/${ adjunto.id }`)
            refreshAdjuntos(adjunto.relacion);
          })
        
          Swal.fire({
            title: 'Imagen adjunta eliminada!',
            text: "El archivo a sido eliminado.",
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })  
        } catch (error) {
          Swal.fire({
            title: 'No se pudo eliminar el archivo!',
            text: `${ error }` ,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })  
        }


        
      }
    })
    
    
    
  };



  return (
    <ListItem
      key={ adjunto.id }
      sx={{ ml: 0, pl: 0}}
    >
      <ListItemAvatar>
        <Avatar>
          <a href={ adjunto.url } target="_blank" rel="noopener noreferrer" download>
            <CloudDownloadOutlined color='primary' />
          </a>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={ adjunto.nombre }
        secondary={ adjunto.createdAt }
      />
      <IconButton edge="end" aria-label="delete" onClick={ handleDelete }>
          <DeleteForever color='error' />
      </IconButton>
    </ListItem>

    
  )
}
