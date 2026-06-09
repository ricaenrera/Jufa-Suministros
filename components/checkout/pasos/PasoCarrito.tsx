'use client';

import type { Producto } from '@/types/producto';
import { IconoProductoSVG } from '@/lib/iconos';

interface PasoCarritoProps {
  producto: Producto;
  cantidad: number;
  onChange: (n: number) => void;
  error?: string;
}

export default function PasoCarrito({ producto, cantidad, onChange, error }: PasoCarritoProps) {
  const dec = () => { if (cantidad > 1) onChange(cantidad - 1); };
  const inc = () => onChange(cantidad + 1);

  return (
    <div className="co-paso">
      <div className="co-producto-card">
        <div className="co-producto-icono">
          <IconoProductoSVG icono={producto.icono} />
        </div>
        <div className="co-producto-info">
          <span className="co-producto-etiqueta">{producto.etiqueta}</span>
          <h3 className="co-producto-nombre">{producto.nombre}</h3>
          <p className="co-producto-desc">{producto.descripcion}</p>
        </div>
      </div>

      <div className="co-campo-grupo">
        <label className="co-label" htmlFor="coQtyInput">Cantidad</label>
        <div className="co-cantidad-ctrl">
          <button type="button" className="co-qty-btn" onClick={dec} aria-label="Reducir">−</button>
          <input
            type="number"
            id="coQtyInput"
            className="co-qty-input"
            value={cantidad}
            min={1}
            max={9999}
            aria-label="Cantidad"
            onChange={(e) => {
              const v = parseInt(e.target.value);
              onChange(!v || v < 1 ? 1 : v);
            }}
          />
          <button type="button" className="co-qty-btn" onClick={inc} aria-label="Aumentar">+</button>
        </div>
        {error && <span className="co-error">{error}</span>}
      </div>

      <div className="co-nota-precio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px', flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>El precio lo confirma nuestro asesor por WhatsApp según disponibilidad.</span>
      </div>
    </div>
  );
}
