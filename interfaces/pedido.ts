import { Vehiculo } from './vehiculo';
export interface Pedido {
  id: string;
  numero: string;
  vehiculo: Vehiculo;
  descripcion: string;
  servicio: string;
  importe: string;
  estado: PedidoEstados;
  enviado: boolean;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;

}

export type PedidoEstados = 'Nuevo' | 'Cotizando' | 'Cotizado' | 'En curso' | 'Rechazado' | 'Finalizado';
