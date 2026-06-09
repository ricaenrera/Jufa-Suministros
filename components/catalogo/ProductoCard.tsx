'use client';

import type { Producto } from '@/types/producto';
import { IconoProductoSVG } from '@/lib/iconos';
import { buildConsultaUrl } from '@/lib/whatsapp';

interface ProductoCardProps {
  producto: Producto;
  onComprar: (producto: Producto) => void;
}

export default function ProductoCard({ producto, onComprar }: ProductoCardProps) {
  const linkWA = buildConsultaUrl(producto.nombre);

  return (
    <article className="tarjeta-producto" data-categoria={producto.categoria} data-nombre={producto.nombre.toLowerCase()}>
      <div className="producto-imagen">
        <IconoProductoSVG icono={producto.icono} />
        <span className="producto-badge">{producto.etiqueta}</span>
      </div>
      <div className="producto-cuerpo">
        <p className="producto-categoria">{producto.etiqueta}</p>
        <h3 className="producto-nombre">{producto.nombre}</h3>
        <p className="producto-descripcion">{producto.descripcion}</p>
        <div className="producto-acciones">
          <button
            className="btn-comprar"
            onClick={() => onComprar(producto)}
            aria-label={`Comprar: ${producto.nombre}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Comprar
          </button>
          <a
            href={linkWA}
            className="btn-consultar btn-consultar-sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por WhatsApp: ${producto.nombre}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.076-1.12l-.292-.173-3.045.859.817-3.02-.19-.31A7.952 7.952 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
