import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus, Vehiculo } from '../../interfaces';
import { VehiculoItem } from './VehiculoItem';
import { VehiculosContext } from '../../context/vehiculos';
import { UIContext } from '../../context/ui';

interface Props {
  vehiculos: Vehiculo[]|undefined
}

export const VehiculoLista:FC<Props> = ({ vehiculos }) => {

  return (
    // Aqui haremos el drop
    <TableBody>
        {
            vehiculos?.map( vehiculo => (
                <VehiculoItem key={ vehiculo.id } vehiculo={ vehiculo } />
            ))
        }
    </TableBody>
  )
}
