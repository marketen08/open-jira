export interface IMensaje {
    _id?: string;
    cliente: string;
    clase: string;
    body?: string;
    link?: string;
    tipo?: string;
    tipoDetalle?: string;
    idWa?: string;
    estado: MensajeEstado;
    usuario?: string;

    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type MensajeEstado = 'leido' | 'no leido'