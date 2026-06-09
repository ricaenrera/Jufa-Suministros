'use client';

import { useRef, useCallback } from 'react';
import type { MetodoPago } from '@/types/pedido';

const BANCOS_VE = [
  'Banesco','Mercantil','BDV (Banco de Venezuela)','BBVA Provincial',
  'Banco Activo','BNC','Banplus','Bicentenario','Otros',
];

type ComprobanteData = Record<string, string>;

interface Errors { [key: string]: string }

interface PasoComprobanteProps {
  metodo: MetodoPago;
  datos: ComprobanteData;
  archivo: File | null;
  onChange: (datos: ComprobanteData) => void;
  onArchivo: (f: File | null) => void;
  errores: Errors;
}

function Campo({ label, id, tipo = 'text', valor, placeholder, requerido, hint, error, onChange }: {
  label: string; id: string; tipo?: string; valor?: string;
  placeholder?: string; requerido?: boolean; hint?: string; error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="co-campo-grupo">
      <label className="co-label" htmlFor={id}>{label}{requerido && <span className="co-requerido"> *</span>}</label>
      <input type={tipo} id={id} className={`co-input${error ? ' co-input-error' : ''}`}
        value={valor ?? ''} placeholder={placeholder} required={requerido} autoComplete="off"
        onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="co-hint">{hint}</span>}
      {error && <span className="co-error">{error}</span>}
    </div>
  );
}

export default function PasoComprobante({ metodo, datos, archivo, onChange, onArchivo, errores }: PasoComprobanteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hoy = new Date().toISOString().split('T')[0];

  const set = (k: string) => (v: string) => onChange({ ...datos, [k]: v });

  const procesarArchivo = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) return;
    const tiposOK = ['image/jpeg','image/png','image/gif','image/webp','application/pdf'];
    if (!tiposOK.includes(file.type)) return;
    onArchivo(file);
  }, [onArchivo]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) procesarArchivo(e.dataTransfer.files[0]);
  }, [procesarArchivo]);

  const previewSrc = archivo && archivo.type.startsWith('image/')
    ? URL.createObjectURL(archivo)
    : null;

  return (
    <div className="co-paso">
      <p className="co-paso-intro">Completa los datos del pago realizado y sube el comprobante.</p>
      <div className="co-form">
        {metodo === 'pagoMovil' && (
          <>
            <Campo label="Teléfono desde el que pagó" id="cbTelefono" tipo="tel" valor={datos.telefono} placeholder="04XX-XXXXXXX" requerido hint="" error={errores.telefono} onChange={set('telefono')} />
            <Campo label="Cédula del titular de la cuenta" id="cbCedulaTitular" valor={datos.cedulaTitular} placeholder="Ej: 12345678" requerido hint="Solo números" error={errores.cedulaTitular} onChange={set('cedulaTitular')} />
            <div className="co-campo-grupo">
              <label className="co-label" htmlFor="cbBancoOrigen">Banco desde el que pagó <span className="co-requerido">*</span></label>
              <select className={`co-input${errores.bancoOrigen ? ' co-input-error' : ''}`} id="cbBancoOrigen" value={datos.bancoOrigen ?? ''} onChange={(e) => set('bancoOrigen')(e.target.value)}>
                <option value="">Selecciona tu banco</option>
                {BANCOS_VE.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {errores.bancoOrigen && <span className="co-error">{errores.bancoOrigen}</span>}
            </div>
            <div className="co-campo-grupo">
              <label className="co-label" htmlFor="cbFecha">Fecha del pago <span className="co-requerido">*</span></label>
              <input type="date" id="cbFecha" className={`co-input${errores.fecha ? ' co-input-error' : ''}`} value={datos.fecha ?? ''} max={hoy} required onChange={(e) => set('fecha')(e.target.value)} />
              {errores.fecha && <span className="co-error">{errores.fecha}</span>}
            </div>
            <Campo label="Número de referencia" id="cbReferencia" valor={datos.referencia} placeholder="Ej: 12345678901" requerido hint="" error={errores.referencia} onChange={set('referencia')} />
          </>
        )}
        {metodo === 'zelle' && (
          <>
            <Campo label="Nombre del titular que envió" id="cbNombreTitular" valor={datos.nombreTitular} placeholder="Nombre completo" requerido hint="" error={errores.nombreTitular} onChange={set('nombreTitular')} />
            <Campo label="Email o teléfono Zelle usado" id="cbContactoZelle" valor={datos.contactoZelle} placeholder="email@ejemplo.com" requerido hint="" error={errores.contactoZelle} onChange={set('contactoZelle')} />
            <div className="co-campo-grupo">
              <label className="co-label" htmlFor="cbFecha">Fecha del pago <span className="co-requerido">*</span></label>
              <input type="date" id="cbFecha" className={`co-input${errores.fecha ? ' co-input-error' : ''}`} value={datos.fecha ?? ''} max={hoy} required onChange={(e) => set('fecha')(e.target.value)} />
              {errores.fecha && <span className="co-error">{errores.fecha}</span>}
            </div>
            <Campo label="Monto enviado (USD)" id="cbMonto" tipo="number" valor={datos.monto} placeholder="Ej: 25.00" requerido hint="En dólares americanos" error={errores.monto} onChange={set('monto')} />
          </>
        )}
        {metodo === 'binance' && (
          <>
            <Campo label="TxID / Hash de la transacción" id="cbTxid" valor={datos.txid} placeholder="Hash de la tx en la blockchain" requerido hint="" error={errores.txid} onChange={set('txid')} />
            <div className="co-campo-grupo">
              <label className="co-label" htmlFor="cbFecha">Fecha del pago <span className="co-requerido">*</span></label>
              <input type="date" id="cbFecha" className={`co-input${errores.fecha ? ' co-input-error' : ''}`} value={datos.fecha ?? ''} max={hoy} required onChange={(e) => set('fecha')(e.target.value)} />
              {errores.fecha && <span className="co-error">{errores.fecha}</span>}
            </div>
            <Campo label="Monto enviado (USDT)" id="cbMonto" tipo="number" valor={datos.monto} placeholder="Ej: 25.00" requerido hint="En USDT" error={errores.monto} onChange={set('monto')} />
          </>
        )}

        <div className="co-campo-grupo">
          <label className="co-label">Comprobante de pago <span className="co-requerido">*</span></label>
          <div
            className={`co-dropzone${archivo ? ' co-dropzone-lleno' : ''}`}
            tabIndex={0}
            role="button"
            aria-label="Subir comprobante de pago"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('co-dropzone-hover'); }}
            onDragLeave={(e) => e.currentTarget.classList.remove('co-dropzone-hover')}
            onDrop={handleDrop}
          >
            {!archivo ? (
              <div className="co-dropzone-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div className="co-dz-textos">
                  <strong>Arrastra aquí tu comprobante</strong>
                  <span>o haz clic para seleccionar</span>
                  <span className="co-dz-hint">PNG, JPG o PDF · máx. 5 MB</span>
                </div>
              </div>
            ) : (
              <div className="co-preview-wrap" style={{ display: 'flex' }}>
                {previewSrc ? (
                  <div className="co-preview-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewSrc} alt="Vista previa del comprobante" />
                  </div>
                ) : (
                  <div className="co-preview-pdf-icono">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                )}
                <div className="co-preview-info">
                  <p className="co-preview-nombre">{archivo.name}</p>
                  <p className="co-preview-tipo">{archivo.name.split('.').pop()?.toUpperCase()} · {(archivo.size / 1024).toFixed(0)} KB</p>
                </div>
                <button type="button" className="co-btn-quitar" onClick={(e) => { e.stopPropagation(); onArchivo(null); }} aria-label="Quitar archivo">✕</button>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              className="co-file-input"
              accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
              aria-label="Seleccionar archivo del comprobante"
              onChange={(e) => { if (e.target.files?.[0]) procesarArchivo(e.target.files[0]); }}
            />
          </div>
          {errores.archivo && <span className="co-error">{errores.archivo}</span>}
        </div>
      </div>
    </div>
  );
}
