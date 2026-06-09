'use client';

import { useState } from 'react';
import type { CategoriaProducto } from '@/types/producto';

interface FiltroItem {
  id: CategoriaProducto;
  label: string;
  count: number;
  icono: JSX.Element;
}

const FILTROS: FiltroItem[] = [
  {
    id: 'todos', label: 'Todos los productos', count: 20,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'proteccion', label: 'Prot. Personal', count: 4,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'curacion', label: 'Material de Curación', count: 4,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'diagnostico', label: 'Diagnóstico', count: 4,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
  {
    id: 'descartables', label: 'Descartables', count: 4,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m18 2 4 4" /><path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" />
      </svg>
    ),
  },
  {
    id: 'instrumental', label: 'Instrumental Médico', count: 2,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
      </svg>
    ),
  },
  {
    id: 'ortopedia', label: 'Ortopedia y Rehab.', count: 2,
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12h6" /><path d="M11 4v4" /><path d="M13 4v4" />
        <path d="M7 4c0 10 10 14 10 14" /><path d="M17 4c0 10-10 14-10 14" />
      </svg>
    ),
  },
];

interface FiltrosSidebarProps {
  categoriaActiva: CategoriaProducto;
  onChange: (c: CategoriaProducto) => void;
}

export default function FiltrosSidebar({ categoriaActiva, onChange }: FiltrosSidebarProps) {
  const [panelAbierto, setPanelAbierto] = useState(false);

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="filtros-sidebar" aria-label="Filtrar por categoría">
        <div className="filtros-titulo">
          Categorías
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </div>
        <ul className="filtros-lista" id="filtrosSidebar" role="list">
          {FILTROS.map((f) => (
            <li
              key={f.id}
              className={`filtro-item${categoriaActiva === f.id ? ' activo' : ''}`}
              data-categoria={f.id}
              role="listitem"
              tabIndex={0}
              onClick={() => onChange(f.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(f.id); } }}
            >
              {f.icono}
              {f.label}
              <span className="filtro-cantidad">{f.count}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Panel móvil */}
      <div className="filtros-movil" id="filtrosMovilContenedor">
        <button
          className={`filtros-movil-btn${panelAbierto ? ' abierto' : ''}`}
          aria-expanded={panelAbierto}
          onClick={() => setPanelAbierto((v) => !v)}
        >
          <span>Filtrar por categoría</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className={`filtros-movil-panel${panelAbierto ? ' visible' : ''}`} aria-hidden={!panelAbierto}>
          <div className="filtros-chips" role="list">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                className={`chip-filtro${categoriaActiva === f.id ? ' activo' : ''}`}
                data-categoria={f.id}
                role="listitem"
                onClick={() => onChange(f.id)}
              >
                {f.label === 'Todos los productos' ? 'Todos' : f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
