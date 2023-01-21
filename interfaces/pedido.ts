export interface Pedido {
  id: string;
  numero: string;
  vehiculo: string;
  descripcion: string;
  estado: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;

}

export type PedidoTipoDeDocumento = 'CUIT' | 'CUIL' | 'DNI' | 'Otros'
export type PedidoCondicionIva =
  | 'IVA Responsable Inscripto'
  | 'Responsable Monotributo'
  | 'IVA Sujeto Exento'
  | 'Pedido del Exterior'
  | 'Consumidor Final'
  | 'IVA No Alcanzado'
