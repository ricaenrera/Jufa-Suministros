'use client';

import { useRef, useCallback } from 'react';

interface BarraBusquedaProps {
  onBusqueda: (termino: string) => void;
}

export default function BarraBusqueda({ onBusqueda }: BarraBusquedaProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onBusqueda(e.target.value);
      }, 300);
    },
    [onBusqueda],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        (e.target as HTMLInputElement).value = '';
        onBusqueda('');
      }
    },
    [onBusqueda],
  );

  return (
    <div className="barra-busqueda" role="search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        id="inputBusqueda"
        placeholder="Buscar producto... (ej: guantes, tensiómetro)"
        aria-label="Buscar productos en el catálogo"
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
