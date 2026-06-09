import type { Producto } from './producto';
import type { DatosEnvio, MetodoPago, DatosComprobante } from './pedido';

export type CheckoutStep = 1 | 2 | 3 | 4 | 5;

export interface CheckoutState {
  abierto: boolean;
  paso: CheckoutStep;
  producto: Producto | null;
  cantidad: number;
  envio: Partial<DatosEnvio>;
  metodo: MetodoPago | null;
  comprobante: Partial<DatosComprobante>;
  archivo: File | null;
}
