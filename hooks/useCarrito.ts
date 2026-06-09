'use client';

import { useState, useCallback } from 'react';
import type { Producto } from '@/types/producto';

interface UseCarritoReturn {
  producto: Producto | null;
  cantidad: number;
  seleccionarProducto: (p: Producto) => void;
  setCantidad: (n: number) => void;
  limpiar: () => void;
}

export function useCarrito(): UseCarritoReturn {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);

  const seleccionarProducto = useCallback((p: Producto) => {
    setProducto(p);
    setCantidad(1);
  }, []);

  const limpiar = useCallback(() => {
    setProducto(null);
    setCantidad(1);
  }, []);

  return { producto, cantidad, seleccionarProducto, setCantidad, limpiar };
}
