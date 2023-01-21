import { FC, useContext, useMemo, DragEvent } from 'react';
import { TableBody } from '@mui/material'
import { EntryStatus } from '../../interfaces';
import { VehiculoItem } from './VehiculoItem';
import { VehiculosContext } from '../../context/vehiculos';
import { UIContext } from '../../context/ui';

interface Props {
  status: EntryStatus;
}

export const VehiculoLista:FC = () => {

  const { vehiculos } = useContext( VehiculosContext );
  const { isDragging, endDragging } = useContext(UIContext);

  // Memoriza los valores cada vez que cambian los valores de '[ entries ]'
//   const vehiculosByStatus = useMemo( () => vehiculos.filter( vehiculo => vehiculo.activo === true ), [ vehiculos ] );
  
// console.log({vehiculos});

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
