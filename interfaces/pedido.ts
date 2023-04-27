import { Vehiculo } from './vehiculo';
export interface Pedido {
  id: string;
  numero: string;
  vehiculo: Vehiculo;
  descripcion: string;
  listaItems: [
    {
      servicio: string;
      importe: string;
    }
  ];
  estado: PedidoEstados;
  enviado: boolean;
  urlPropuesta: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;

}

export type PedidoEstados = 'Nuevo' | 'Cotizando' | 'Cotizado' | 'En curso' | 'Rechazado' | 'Finalizado';
