export interface Cliente {
  id: string;
  codigo: number;
  tipoDeDocumento: ClienteTipoDeDocumento;
  numero: string;
  razonSocial: string;
  nombre: string;
  condicionIva: ClienteCondicionIva;
  domicilio: string;
  provincia: string;
  localidad: string;
  telefono: string;
  email: string;
  activo: boolean;

  createdAt: number;

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
