export interface Adjunto {
    id: string;
    nombre: string;
    relacion: string;
    tipoArchivo: string;
    url: string;
    activo: boolean;
    usuario: string;
    
    createdAt: number;
    updatedAt?: number;
  }
