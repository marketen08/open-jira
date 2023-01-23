export interface Mensaje {
    id: string;
    de: string;
    para: string;
    mensaje: string;
  
    createdAt: number;
    updatedAt?: number;
  }
  