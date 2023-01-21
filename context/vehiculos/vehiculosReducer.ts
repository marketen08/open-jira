import { Vehiculo } from '../../interfaces';
import { VehiculosState } from '.';

type VehiculosActionType = 
| { type: '[Vehiculo] - Agregar entrada', payload: Vehiculo }
| { type: '[Vehiculo] - Actualizar entrada', payload: Vehiculo }
| { type: '[Vehiculo] - Refresh Data', payload: Vehiculo[] }


export const vehiculosReducer = ( state: VehiculosState, action: VehiculosActionType ):VehiculosState => {
    
    switch (action.type) {
        case '[Vehiculo] - Agregar entrada':
            return {
                ...state,
                vehiculos: [ ...state.vehiculos, action.payload ]
            }

        case '[Vehiculo] - Actualizar entrada':
            return {
                ...state,
                vehiculos: state.vehiculos.map( vehiculo => {
                    if ( vehiculo.id === action.payload.id ) {
                        vehiculo = action.payload;
                    }
                    return vehiculo;
                })
            }

        case '[Vehiculo] - Refresh Data':
            return {
                ...state,
                vehiculos: [ ...action.payload ]
            }

        default:
            return state;
    }

}