import { IUsuario, IMensaje } from './';

export interface ClienteNuevo {
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
}

export interface ClienteConMensajes {
  id: string;
  codigo: string;
  tipoDeDocumento: ClienteTipoDeDocumento;
  numero: string;
  nombre: string;
  celular: string;
  email: string;
  domicilio: string;
  localidad: string;
  usuarioCliente: string
  mensajes: IMensaje
}

export interface Cliente extends ClienteNuevo {
  id: string;
  codigo: number;
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
