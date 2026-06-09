export type MetodoPago = 'pagoMovil' | 'zelle' | 'binance';

export type StatusPedido = 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado';

export interface DatosEnvio {
  nombre: string;
  cedula: string;
  telefono: string;
  estado: string;
  ciudad: string;
  direccion: string;
  referencia?: string;
  nota?: string;
}

export interface DatosPagoMovil {
  telefono: string;
  cedulaTitular: string;
  bancoOrigen: string;
  fecha: string;
  referencia: string;
  archivo?: File | null;
}

export interface DatosPagoZelle {
  nombreTitular: string;
  contactoZelle: string;
  fecha: string;
  monto: string;
  archivo?: File | null;
}

export interface DatosPagoBinance {
  txid: string;
  fecha: string;
  monto: string;
  archivo?: File | null;
}

export type DatosComprobante = DatosPagoMovil | DatosPagoZelle | DatosPagoBinance;

export interface Pedido {
  id?: string;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  envio: DatosEnvio;
  metodo: MetodoPago;
  comprobante: DatosComprobante;
  archivoNombre?: string;
  status: StatusPedido;
  creadoEn?: string;
}
