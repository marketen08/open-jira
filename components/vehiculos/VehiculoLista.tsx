import { FC } from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material'
import { Vehiculo } from '../../interfaces';
import { VehiculoItem } from './VehiculoItem';

interface Props {
  vehiculos: Vehiculo[]|undefined;
  page: number;
  rowsPerPage: number;
}

export const VehiculoLista:FC<Props> = ({ vehiculos, page, rowsPerPage }) => {

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, vehiculos ? vehiculos.length : 0 - page * rowsPerPage);

  return (
    <TableBody>
        {
            vehiculos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map( vehiculo => (
                <VehiculoItem key={ vehiculo.id } vehiculo={ vehiculo } />
            ))
        }
        { emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
    </TableBody>
  )
}

