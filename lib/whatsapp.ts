import type { CheckoutState } from '@/types/checkout';
import type { DatosPagoMovil, DatosPagoZelle, DatosPagoBinance } from '@/types/pedido';

export const WA_NUMERO = '584121017811';

const METODOS_LABEL: Record<string, string> = {
  pagoMovil: 'Pago Móvil',
  zelle: 'Zelle',
  binance: 'Binance (USDT)',
};

export function buildWhatsAppMessage(state: CheckoutState): string {
  const { producto, cantidad, envio, metodo, comprobante } = state;
  if (!producto || !metodo || !envio.nombre) return '';

  let detallesPago = '';

  if (metodo === 'pagoMovil') {
    const cb = comprobante as DatosPagoMovil;
    detallesPago = [
      `Teléfono pagador: ${cb.telefono}`,
      `Cédula titular:   ${cb.cedulaTitular}`,
      `Banco:            ${cb.bancoOrigen}`,
      `Fecha:            ${cb.fecha}`,
      `Referencia:       ${cb.referencia}`,
    ].join('\n');
  } else if (metodo === 'zelle') {
    const cb = comprobante as DatosPagoZelle;
    detallesPago = [
      `Titular: ${cb.nombreTitular}`,
      `Zelle:   ${cb.contactoZelle}`,
      `Fecha:   ${cb.fecha}`,
      `Monto:   $${cb.monto} USD`,
    ].join('\n');
  } else if (metodo === 'binance') {
    const cb = comprobante as DatosPagoBinance;
    detallesPago = [
      `TxID:  ${cb.txid}`,
      `Fecha: ${cb.fecha}`,
      `Monto: ${cb.monto} USDT`,
    ].join('\n');
  }

  const lineas: (string | null)[] = [
    '🛒 *NUEVO PEDIDO — Jufa Suministros*',
    '',
    `📦 *Producto:* ${producto.nombre} x${cantidad}`,
    '',
    '👤 *Datos del cliente:*',
    `Nombre:    ${envio.nombre}`,
    `Cédula:    ${envio.cedula}`,
    `Teléfono:  ${envio.telefono}`,
    `Estado:    ${envio.estado}`,
    `Ciudad:    ${envio.ciudad}`,
    `Dirección: ${envio.direccion}`,
    envio.referencia ? `Referencia: ${envio.referencia}` : null,
    envio.nota ? `Nota:       ${envio.nota}` : null,
    '',
    `💳 *Método de pago:* ${METODOS_LABEL[metodo]}`,
    detallesPago,
    '',
    '📎 *El cliente adjuntará el comprobante en este chat.*',
  ];

  return lineas.filter((l): l is string => l !== null).join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(message)}`;
}

export function buildConsultaUrl(productoNombre: string): string {
  const msg = `Hola, me interesa el producto: ${productoNombre}`;
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
}
