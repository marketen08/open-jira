export interface Vehiculo {
  id: string;
  patente: string;
  marca: string;
  modelo: string;
  nombre: string;
  celular: string;
  telefono: string;
  email: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;
}
