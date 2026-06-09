'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Producto, CategoriaProducto } from '@/types/producto';
import { buscarProductos, PRODUCTOS } from '@/lib/services/productosService';

interface UseProductosReturn {
  productos: Producto[];
  total: number;
  categoriaActiva: CategoriaProducto;
  terminoBusqueda: string;
  setCategoriaActiva: (c: CategoriaProducto) => void;
  setTerminoBusqueda: (t: string) => void;
}

export function useProductos(initialCategoria: CategoriaProducto = 'todos'): UseProductosReturn {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaProducto>(initialCategoria);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS);

  useEffect(() => {
    setProductos(buscarProductos(terminoBusqueda, categoriaActiva));
  }, [categoriaActiva, terminoBusqueda]);

  const handleSetCategoria = useCallback((c: CategoriaProducto) => {
    setCategoriaActiva(c);
  }, []);

  const handleSetBusqueda = useCallback((t: string) => {
    setTerminoBusqueda(t);
  }, []);

  return {
    productos,
    total: PRODUCTOS.length,
    categoriaActiva,
    terminoBusqueda,
    setCategoriaActiva: handleSetCategoria,
    setTerminoBusqueda: handleSetBusqueda,
  };
}
