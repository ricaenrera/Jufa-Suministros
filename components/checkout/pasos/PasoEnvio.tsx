'use client';

import type { DatosEnvio } from '@/types/pedido';

const ESTADOS_VE = [
  'Amazonas','Anzoátegui','Apure','Aragua','Barinas',
  'Bolívar','Carabobo','Cojedes','Delta Amacuro','Distrito Capital',
  'Falcón','Guárico','Lara','Mérida','Miranda',
  'Monagas','Nueva Esparta','Portuguesa','Sucre','Táchira',
  'Trujillo','La Guaira','Yaracuy','Zulia',
];

interface Errors { [key: string]: string }

interface PasoEnvioProps {
  datos: Partial<DatosEnvio>;
  onChange: (datos: Partial<DatosEnvio>) => void;
  errores: Errors;
}

function Campo({ label, id, tipo = 'text', valor, placeholder, requerido, hint, error, onChange }: {
  label: string; id: keyof DatosEnvio; tipo?: string; valor?: string;
  placeholder?: string; requerido?: boolean; hint?: string; error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="co-campo-grupo">
      <label className="co-label" htmlFor={id}>
        {label}{requerido && <span className="co-requerido"> *</span>}
      </label>
      <input type={tipo} id={id} className={`co-input${error ? ' co-input-error' : ''}`}
        value={valor ?? ''} placeholder={placeholder} required={requerido}
        autoComplete="off" onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="co-hint">{hint}</span>}
      {error && <span className="co-error">{error}</span>}
    </div>
  );
}

export default function PasoEnvio({ datos, onChange, errores }: PasoEnvioProps) {
  const set = (k: keyof DatosEnvio) => (v: string) => onChange({ ...datos, [k]: v });

  return (
    <div className="co-paso">
      <p className="co-paso-intro">Completa tus datos de contacto y dirección de entrega.</p>
      <div className="co-form">
        <Campo label="Nombre completo" id="nombre" valor={datos.nombre} placeholder="Ej: María García López" requerido hint="" error={errores.nombre} onChange={set('nombre')} />
        <Campo label="Cédula de identidad" id="cedula" valor={datos.cedula} placeholder="Ej: 12345678" requerido hint="Solo números, sin puntos ni guiones" error={errores.cedula} onChange={set('cedula')} />
        <Campo label="Teléfono de contacto" id="telefono" tipo="tel" valor={datos.telefono} placeholder="Ej: 0412-1234567" requerido hint="Formato: 04XX-XXXXXXX" error={errores.telefono} onChange={set('telefono')} />

        <div className="co-campo-grupo">
          <label className="co-label" htmlFor="estado">Estado <span className="co-requerido">*</span></label>
          <select className={`co-input${errores.estado ? ' co-input-error' : ''}`} id="estado" value={datos.estado ?? ''} onChange={(e) => set('estado')(e.target.value)}>
            <option value="">Selecciona un estado</option>
            {ESTADOS_VE.map((est) => <option key={est} value={est}>{est}</option>)}
          </select>
          {errores.estado && <span className="co-error">{errores.estado}</span>}
        </div>

        <Campo label="Ciudad / Municipio" id="ciudad" valor={datos.ciudad} placeholder="Ej: Maturín" requerido hint="" error={errores.ciudad} onChange={set('ciudad')} />

        <div className="co-campo-grupo">
          <label className="co-label" htmlFor="direccion">Dirección exacta <span className="co-requerido">*</span></label>
          <textarea className={`co-input co-textarea${errores.direccion ? ' co-input-error' : ''}`} id="direccion"
            placeholder="Calle, número, urbanización..." rows={3}
            value={datos.direccion ?? ''} onChange={(e) => set('direccion')(e.target.value)} />
          {errores.direccion && <span className="co-error">{errores.direccion}</span>}
        </div>

        <Campo label="Punto de referencia" id="referencia" valor={datos.referencia} placeholder="Ej: Frente al Banco Mercantil" hint="" error={errores.referencia} onChange={set('referencia')} />
        <Campo label="Nota adicional" id="nota" valor={datos.nota} placeholder="Cualquier detalle que debamos saber" hint="" error={errores.nota} onChange={set('nota')} />
      </div>
    </div>
  );
}
