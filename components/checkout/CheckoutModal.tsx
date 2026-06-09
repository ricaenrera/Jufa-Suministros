'use client';

import { useEffect, useCallback, useState } from 'react';
import type { CheckoutStep } from '@/types/checkout';
import { useCheckout } from '@/hooks/useCheckout';
import PasoCarrito from './pasos/PasoCarrito';
import PasoEnvio from './pasos/PasoEnvio';
import PasoPago from './pasos/PasoPago';
import PasoComprobante from './pasos/PasoComprobante';
import PasoConfirmacion from './pasos/PasoConfirmacion';

const TITULOS: Record<CheckoutStep, string> = {
  1: 'Resumen del pedido',
  2: 'Datos de envío',
  3: 'Método de pago',
  4: 'Comprobante de pago',
  5: '¡Pedido enviado!',
};

const LABELS_PASOS = ['Carrito', 'Envío', 'Pago', 'Comprobante', '¡Listo!'];

type Errores = Record<string, string>;

interface CheckoutModalProps {
  checkout: ReturnType<typeof useCheckout>;
}

function validarPaso(paso: CheckoutStep, state: ReturnType<typeof useCheckout>['state']): Errores {
  const errs: Errores = {};

  if (paso === 1) {
    if (!state.cantidad || state.cantidad < 1) errs.cantidad = 'La cantidad debe ser al menos 1.';
  }

  if (paso === 2) {
    const e = state.envio;
    if (!e.nombre?.trim()) errs.nombre = 'El nombre completo es obligatorio.';
    if (!e.cedula?.trim()) errs.cedula = 'La cédula es obligatoria.';
    else if (!/^\d+$/.test(e.cedula.replace(/[\s.\-]/g, ''))) errs.cedula = 'La cédula debe contener solo números.';
    if (!e.telefono?.trim()) errs.telefono = 'El teléfono es obligatorio.';
    else if (!/^(0?(412|414|416|424|426|212)[\-\s]?\d{7})$/.test(e.telefono.replace(/[\s\-]/g, '')))
      errs.telefono = 'Formato inválido. Ej: 0412-1234567';
    if (!e.estado?.trim()) errs.estado = 'Selecciona un estado.';
    if (!e.ciudad?.trim()) errs.ciudad = 'La ciudad es obligatoria.';
    if (!e.direccion?.trim()) errs.direccion = 'La dirección es obligatoria.';
  }

  if (paso === 3) {
    if (!state.metodo) errs.metodo = 'Selecciona un método de pago.';
  }

  if (paso === 4) {
    if (!state.archivo) errs.archivo = 'Debes adjuntar el comprobante de pago.';
    const cb = state.comprobante as Record<string, string>;
    if (state.metodo === 'pagoMovil') {
      if (!cb.telefono?.trim()) errs.telefono = 'El teléfono es obligatorio.';
      if (!cb.cedulaTitular?.trim()) errs.cedulaTitular = 'La cédula del titular es obligatoria.';
      else if (!/^\d+$/.test(cb.cedulaTitular.replace(/[\s.\-]/g, ''))) errs.cedulaTitular = 'Solo números.';
      if (!cb.bancoOrigen?.trim()) errs.bancoOrigen = 'Selecciona tu banco.';
      if (!cb.fecha?.trim()) errs.fecha = 'La fecha es obligatoria.';
      if (!cb.referencia?.trim()) errs.referencia = 'El número de referencia es obligatorio.';
    }
    if (state.metodo === 'zelle') {
      if (!cb.nombreTitular?.trim()) errs.nombreTitular = 'El nombre del titular es obligatorio.';
      if (!cb.contactoZelle?.trim()) errs.contactoZelle = 'El email o teléfono Zelle es obligatorio.';
      if (!cb.fecha?.trim()) errs.fecha = 'La fecha es obligatoria.';
      if (!cb.monto?.trim()) errs.monto = 'El monto enviado es obligatorio.';
    }
    if (state.metodo === 'binance') {
      if (!cb.txid?.trim()) errs.txid = 'El TxID de la transacción es obligatorio.';
      if (!cb.fecha?.trim()) errs.fecha = 'La fecha es obligatoria.';
      if (!cb.monto?.trim()) errs.monto = 'El monto enviado es obligatorio.';
    }
  }

  return errs;
}

export default function CheckoutModal({ checkout }: CheckoutModalProps) {
  const { state, cerrar, anteriorPaso, siguientePaso, setCantidad, setEnvio, setMetodo, setComprobante, setArchivo, enviarPorWhatsApp } = checkout;
  const [errores, setErrores] = useState<Errores>({});

  useEffect(() => {
    setErrores({});
  }, [state.paso]);

  useEffect(() => {
    if (state.abierto) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [state.abierto]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.abierto) cerrar();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state.abierto, cerrar]);

  const avanzar = useCallback(() => {
    const errs = validarPaso(state.paso, state);
    if (Object.keys(errs).length > 0) { setErrores(errs); return; }
    if (state.paso === 4) enviarPorWhatsApp();
    else siguientePaso();
  }, [state, enviarPorWhatsApp, siguientePaso]);

  if (!state.abierto || !state.producto) return null;

  const paso = state.paso;

  return (
    <div
      id="coOverlay"
      className={`co-overlay co-visible`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coTitulo"
      onClick={(e) => { if (e.target === e.currentTarget) cerrar(); }}
    >
      <div className="co-modal">
        <div className="co-header">
          <h2 className="co-titulo" id="coTitulo">{TITULOS[paso]}</h2>
          <button className="co-cerrar" onClick={cerrar} aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="co-progreso" aria-label="Progreso del checkout">
          <div className="co-progreso-pasos">
            {LABELS_PASOS.map((label, i) => {
              const num = (i + 1) as CheckoutStep;
              const clase = num < paso ? 'co-paso-completado' : num === paso ? 'co-paso-activo' : '';
              return (
                <div key={label} style={{ display: 'contents' }}>
                  <div className={`co-progreso-item ${clase}`}>
                    <div className="co-paso-circulo">{num < paso ? '✓' : num}</div>
                    <span className="co-paso-label">{label}</span>
                  </div>
                  {i < LABELS_PASOS.length - 1 && (
                    <div className={`co-progreso-linea${num < paso ? ' co-linea-completa' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="co-contenido">
          {paso === 1 && (
            <PasoCarrito
              producto={state.producto}
              cantidad={state.cantidad}
              onChange={setCantidad}
              error={errores.cantidad}
            />
          )}
          {paso === 2 && (
            <PasoEnvio
              datos={state.envio}
              onChange={setEnvio}
              errores={errores}
            />
          )}
          {paso === 3 && (
            <PasoPago
              metodo={state.metodo}
              onChange={setMetodo}
              error={errores.metodo}
            />
          )}
          {paso === 4 && state.metodo && (
            <PasoComprobante
              metodo={state.metodo}
              datos={state.comprobante as Record<string, string>}
              archivo={state.archivo}
              onChange={(d) => setComprobante(d as Parameters<typeof setComprobante>[0])}
              onArchivo={setArchivo}
              errores={errores}
            />
          )}
          {paso === 5 && <PasoConfirmacion onCerrar={cerrar} />}
        </div>

        {paso < 5 && (
          <div className="co-pie">
            <div className="co-pie-interior">
              {paso > 1 ? (
                <button className="co-btn-atras" onClick={anteriorPaso}>← Atrás</button>
              ) : (
                <div />
              )}
              <button className="co-btn-continuar" onClick={avanzar}>
                {paso === 4 && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '17px', height: '17px', flexShrink: 0 }} aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.076-1.12l-.292-.173-3.045.859.817-3.02-.19-.31A7.952 7.952 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
                  </svg>
                )}
                {paso === 1 && 'Continuar'}
                {paso === 2 && 'Continuar al pago'}
                {paso === 3 && 'Ya realicé el pago → Enviar comprobante'}
                {paso === 4 && 'Enviar pedido por WhatsApp'}
                {(paso === 1 || paso === 2) && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }} aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
