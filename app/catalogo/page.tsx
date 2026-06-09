'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { CategoriaProducto } from '@/types/producto';
import { useProductos } from '@/hooks/useProductos';
import { useCheckout } from '@/hooks/useCheckout';
import FiltrosSidebar from '@/components/catalogo/FiltrosSidebar';
import BarraBusqueda from '@/components/catalogo/BarraBusqueda';
import ProductoCard from '@/components/catalogo/ProductoCard';
import CheckoutModal from '@/components/checkout/CheckoutModal';

function CatalogoContenido() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') as CategoriaProducto | null;

  const { productos, total, categoriaActiva, setCategoriaActiva, setTerminoBusqueda } = useProductos(catParam ?? 'todos');
  const checkout = useCheckout();

  useEffect(() => {
    if (catParam) setCategoriaActiva(catParam);
  }, [catParam, setCategoriaActiva]);

  return (
    <>
      <div className="catalogo-hero" aria-label="Catálogo de productos">
        <div className="contenedor">
          <span className="seccion-etiqueta" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
            Nuestros productos
          </span>
          <h1>Catálogo de Insumos Médicos</h1>
          <p>Encuentra equipos de protección, material de curación, instrumental médico y más.</p>
          <BarraBusqueda onBusqueda={setTerminoBusqueda} />
        </div>
      </div>

      <div className="contenedor">
        <div className="catalogo-layout">
          <FiltrosSidebar categoriaActiva={categoriaActiva} onChange={setCategoriaActiva} />

          <main>
            <div className="productos-cabecera">
              <p className="productos-conteo">
                Mostrando <span id="contadorVisible">{productos.length}</span> de <span id="contadorTotal">{total}</span> productos
              </p>
            </div>

            <div className="grid-productos" id="gridProductos" aria-live="polite" aria-label="Listado de productos">
              {productos.map((p) => (
                <ProductoCard key={p.id} producto={p} onComprar={checkout.abrir} />
              ))}
            </div>

            {productos.length === 0 && (
              <div className="sin-resultados visible" aria-live="polite">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otro término o selecciona una categoría diferente.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <CheckoutModal checkout={checkout} />
    </>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense>
      <CatalogoContenido />
    </Suspense>
  );
}
