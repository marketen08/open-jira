import { Vehiculo } from './vehiculo';
export interface Pedido {
  id: string;
  numero: string;
  vehiculo: Vehiculo;
  descripcion: string;
  estado: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;

}


