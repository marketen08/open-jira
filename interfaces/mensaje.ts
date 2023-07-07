export interface IMensaje {
    _id?: string;
    cliente: string;
    clase: MensajeClase;
    body?: string;
    link?: string;
    tipo?: MensajeTipo;
    tipoDetalle?: string;
    idWa?: string;
    estado: MensajeEstado;
    usuario?: string;
    pedido?: string;
    urlPropuesta?: string;

    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type MensajeClase = 'enviado' | 'recibido';
  export type MensajeEstado = 'leido' | 'no leido';
  export type MensajeTipo = 'texto' | 'documento' | 'voice' | 'image' | 'video' | 'boton';
