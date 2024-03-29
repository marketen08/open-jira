import { IMensaje } from './';

export interface ClientesResumen {
    total: number;
    clientes: Cliente[]
}

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
  tipoDeDocumento: ClienteTipoDeDocumento;
  numero: string;
  nombre: string;
  celular: string;
  email: string;
  domicilio: string;
  localidad: string;
  mensajes: IMensaje[]
  updatedAt: Date;
}

export interface Cliente extends ClienteNuevo {
  id: string;
  activo: boolean;
  estado: string;
  usuario: string;

  createdAt: number;
  updatedAt?: number;
}

export type ClienteTipoDeDocumento = 'CUIT' | 'CUIL' | 'DNI' | 'Otros'
export type ClienteCondicionIva =
  | 'IVA Responsable Inscripto'
  | 'Responsable Monotributo'
  | 'IVA Sujeto Exento'
  | 'Cliente del Exterior'
  | 'Consumidor Final'
  | 'IVA No Alcanzado'
