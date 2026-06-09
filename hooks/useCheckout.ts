'use client';

import { useState, useCallback } from 'react';
import type { CheckoutState, CheckoutStep } from '@/types/checkout';
import type { Producto } from '@/types/producto';
import type { DatosEnvio, MetodoPago, DatosComprobante } from '@/types/pedido';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

const ESTADO_INICIAL: CheckoutState = {
  abierto: false,
  paso: 1,
  producto: null,
  cantidad: 1,
  envio: {},
  metodo: null,
  comprobante: {},
  archivo: null,
};

export function useCheckout() {
  const [state, setState] = useState<CheckoutState>(ESTADO_INICIAL);

  const abrir = useCallback((producto: Producto) => {
    setState({ ...ESTADO_INICIAL, abierto: true, producto });
  }, []);

  const cerrar = useCallback(() => {
    setState((s) => ({ ...s, abierto: false }));
  }, []);

  const irAPaso = useCallback((paso: CheckoutStep) => {
    setState((s) => ({ ...s, paso }));
  }, []);

  const siguientePaso = useCallback(() => {
    setState((s) => ({ ...s, paso: Math.min(s.paso + 1, 5) as CheckoutStep }));
  }, []);

  const anteriorPaso = useCallback(() => {
    setState((s) => ({ ...s, paso: Math.max(s.paso - 1, 1) as CheckoutStep }));
  }, []);

  const setCantidad = useCallback((cantidad: number) => {
    setState((s) => ({ ...s, cantidad: Math.max(1, cantidad) }));
  }, []);

  const setEnvio = useCallback((envio: Partial<DatosEnvio>) => {
    setState((s) => ({ ...s, envio }));
  }, []);

  const setMetodo = useCallback((metodo: MetodoPago) => {
    setState((s) => ({ ...s, metodo }));
  }, []);

  const setComprobante = useCallback((comprobante: Partial<DatosComprobante>) => {
    setState((s) => ({ ...s, comprobante }));
  }, []);

  const setArchivo = useCallback((archivo: File | null) => {
    setState((s) => ({ ...s, archivo }));
  }, []);

  const enviarPorWhatsApp = useCallback(() => {
    const msg = buildWhatsAppMessage(state);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setState((s) => ({ ...s, paso: 5 }));
  }, [state]);

  return {
    state,
    abrir,
    cerrar,
    irAPaso,
    siguientePaso,
    anteriorPaso,
    setCantidad,
    setEnvio,
    setMetodo,
    setComprobante,
    setArchivo,
    enviarPorWhatsApp,
  };
}
