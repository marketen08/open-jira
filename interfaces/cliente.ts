import { IUsuario } from './usuarios';
export interface Cliente {
  id: string;
  codigo: number;
  numero: string;
  tipoDeDocumento: ClienteTipoDeDocumento;
  nombre: string;
  email: string;
  celular: string;
  razonSocial: string;
  condicionIva: ClienteCondicionIva;
  domicilio: string;
  provincia: string;
  localidad: string;
  telefono: string;
  activo: boolean;
  usuarioCliente: IUsuario;

  createdAt: number;
  updatedAt?: number;
  // usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}

export type ClienteTipoDeDocumento = 'CUIT' | 'CUIL' | 'DNI' | 'Otros'
export type ClienteCondicionIva =
  | 'IVA Responsable Inscripto'
  | 'Responsable Monotributo'
  | 'IVA Sujeto Exento'
  | 'Cliente del Exterior'
  | 'Consumidor Final'
  | 'IVA No Alcanzado'
