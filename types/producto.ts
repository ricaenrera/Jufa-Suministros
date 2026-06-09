export type CategoriaProducto =
  | 'todos'
  | 'proteccion'
  | 'curacion'
  | 'diagnostico'
  | 'descartables'
  | 'instrumental'
  | 'ortopedia';

export type IconoProducto =
  | 'guante'
  | 'mascarilla'
  | 'lentes'
  | 'venda'
  | 'gasa'
  | 'esparadrapo'
  | 'tensiómetro'
  | 'estetoscopio'
  | 'oximetro'
  | 'termómetro'
  | 'jeringa'
  | 'sonda'
  | 'abatelengua'
  | 'tijeras'
  | 'pinzas'
  | 'ortopedia'
  | 'muleta'
  | 'generico';

export interface Producto {
  id: number;
  nombre: string;
  categoria: CategoriaProducto;
  etiqueta: string;
  descripcion: string;
  icono: IconoProducto;
}
