import { Cliente } from "./cliente";

export interface Vehiculo {
  id: string;
  patente: string;
  cliente: Cliente
  marca: string;
  modelo: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;
}
