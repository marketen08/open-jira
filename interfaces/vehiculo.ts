import { Cliente } from "./cliente";

export interface Vehiculo {
  _id?: string;
  id: string;
  patente: string;
  cliente: Cliente | any,
  marca: string;
  modelo: string;
  activo: boolean;

  createdAt: number;
  updatedAt?: number;
}
