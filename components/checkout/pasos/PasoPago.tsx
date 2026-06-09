'use client';

import type { MetodoPago } from '@/types/pedido';

const DATOS_PAGO = {
  pagoMovil: {
    banco: '[BANCO_PLACEHOLDER]',
    telefono: '[TELEFONO_PLACEHOLDER]',
    cedula: '[CEDULA_PLACEHOLDER]',
    nombre: 'Jufa Suministros',
  },
  zelle: {
    contacto: '[ZELLE_PLACEHOLDER]',
    nombre: '[NOMBRE_ZELLE_PLACEHOLDER]',
  },
  binance: {
    wallet: '[WALLET_PLACEHOLDER]',
    payId: '[PAYID_PLACEHOLDER]',
  },
};

const METODOS = [
  { id: 'pagoMovil' as MetodoPago, emoji: '💰', label: 'Pago Móvil', desc: 'Transferencia bancaria desde tu teléfono' },
  { id: 'zelle' as MetodoPago, emoji: '💵', label: 'Zelle', desc: 'Desde una cuenta bancaria en EE.UU.' },
  { id: 'binance' as MetodoPago, emoji: '₿', label: 'Binance (USDT)', desc: 'Criptomonedas · Red TRC20' },
];

function FilaDato({ label, valor, copiable }: { label: string; valor: string; copiable?: boolean }) {
  const copiar = () => { navigator.clipboard?.writeText(valor).catch(() => {}); };
  return (
    <div className="co-dato-fila">
      <span className="co-dato-etiq">{label}:</span>
      <span className="co-dato-val">{valor}</span>
      {copiable && (
        <button type="button" className="co-btn-copiar" onClick={copiar} aria-label={`Copiar ${label}`}>📋</button>
      )}
    </div>
  );
}

function DatosPagoBox({ metodo }: { metodo: MetodoPago }) {
  const d = DATOS_PAGO[metodo];
  return (
    <div className="co-datos-pago-box">
      <p className="co-datos-titulo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px' }} aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
        </svg>
        Datos para realizar el pago
      </p>
      {metodo === 'pagoMovil' && (
        <>
          <FilaDato label="Banco" valor={(d as typeof DATOS_PAGO.pagoMovil).banco} />
          <FilaDato label="Teléfono" valor={(d as typeof DATOS_PAGO.pagoMovil).telefono} copiable />
          <FilaDato label="Cédula" valor={(d as typeof DATOS_PAGO.pagoMovil).cedula} copiable />
          <FilaDato label="Nombre" valor={(d as typeof DATOS_PAGO.pagoMovil).nombre} />
        </>
      )}
      {metodo === 'zelle' && (
        <>
          <FilaDato label="Email / Teléfono" valor={(d as typeof DATOS_PAGO.zelle).contacto} copiable />
          <FilaDato label="A nombre de" valor={(d as typeof DATOS_PAGO.zelle).nombre} />
        </>
      )}
      {metodo === 'binance' && (
        <>
          <p className="co-dato-red">Red: USDT (TRC20)</p>
          <FilaDato label="Dirección wallet" valor={(d as typeof DATOS_PAGO.binance).wallet} copiable />
          <FilaDato label="Pay ID" valor={(d as typeof DATOS_PAGO.binance).payId} copiable />
        </>
      )}
    </div>
  );
}

interface PasoPagoProps {
  metodo: MetodoPago | null;
  onChange: (m: MetodoPago) => void;
  error?: string;
}

export default function PasoPago({ metodo, onChange, error }: PasoPagoProps) {
  return (
    <div className="co-paso">
      <p className="co-paso-intro">Selecciona cómo realizarás el pago:</p>
      <div className="co-metodos" id="coMetodosLista">
        {METODOS.map((m) => (
          <label key={m.id} className={`co-metodo-card${metodo === m.id ? ' co-metodo-activo' : ''}`} htmlFor={`coMetodo_${m.id}`}>
            <input type="radio" name="coMetodoPago" id={`coMetodo_${m.id}`}
              value={m.id} className="co-radio-oculto"
              checked={metodo === m.id}
              onChange={() => onChange(m.id)} />
            <span className="co-metodo-emoji">{m.emoji}</span>
            <div className="co-metodo-texto">
              <strong>{m.label}</strong>
              <span>{m.desc}</span>
            </div>
            <span className="co-metodo-check">✓</span>
          </label>
        ))}
      </div>
      {metodo && <DatosPagoBox metodo={metodo} />}
      {error && <span className="co-error" id="coMetodoError">{error}</span>}
    </div>
  );
}
