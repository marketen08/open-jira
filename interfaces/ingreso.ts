import { ClienteCondicionIva, ClienteTipoDeDocumento } from "./";

export interface Ingreso {
  numero: string;
  tipoDeDocumento: ClienteTipoDeDocumento;
  nombre: string;
  email: string;
  celular: string;
  telefono: string;
  domicilio: string;
  provincia: string;
  localidad: string;
  condicionIva: ClienteCondicionIva;
  patente: string;
  marca: string;
  modelo: string;
  descripcion: string;
}

