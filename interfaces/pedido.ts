import { ClienteCondicionIva } from './cliente';
import { Vehiculo } from './vehiculo';
export interface Pedido {
  id: string;
  numero: string;
  vehiculo: Vehiculo;
  descripcion: string;
  condicionIva: ClienteCondicionIva;
  listaItems: [
    {
      servicio: string;
      cantidad: number;
      importe: number;
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
