export interface IMensaje {
    _id: string;
    de: string;
    para: string;
    mensaje: string;
    tipo: string;
    idWa: string;
    estado: MensajeEstado;
    
    createdAt: string;
    updatedAt?: string;
  }
  
  export type MensajeEstado = 'leido' | 'no leido'