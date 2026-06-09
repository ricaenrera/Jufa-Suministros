import type { Producto, CategoriaProducto } from '@/types/producto';

export const PRODUCTOS: Producto[] = [
  /* ── Equipos de Protección Personal (4) ── */
  {
    id: 1,
    nombre: 'Guantes de Nitrilo',
    categoria: 'proteccion',
    etiqueta: 'Prot. Personal',
    descripcion: 'Caja x 100 unidades. Tallas S, M, L, XL. Sin polvo, alta resistencia y sensibilidad táctil.',
    icono: 'guante',
  },
  {
    id: 2,
    nombre: 'Mascarilla N95',
    categoria: 'proteccion',
    etiqueta: 'Prot. Personal',
    descripcion: 'Mascarilla de alta filtración (≥95%). Válvula exhalación. Certificación NIOSH. Pack x 10.',
    icono: 'mascarilla',
  },
  {
    id: 3,
    nombre: 'Mascarilla Quirúrgica',
    categoria: 'proteccion',
    etiqueta: 'Prot. Personal',
    descripcion: 'Triple capa con filtro bacteriano. Color azul. Caja x 50 unidades. Desechable.',
    icono: 'mascarilla',
  },
  {
    id: 4,
    nombre: 'Lentes de Protección',
    categoria: 'proteccion',
    etiqueta: 'Prot. Personal',
    descripcion: 'Gafas de seguridad anti-salpicadura. Marco ajustable. Lente policarbonato transparente.',
    icono: 'lentes',
  },
  /* ── Material de Curación (4) ── */
  {
    id: 5,
    nombre: 'Venda Elástica 10 cm',
    categoria: 'curacion',
    etiqueta: 'Material Curación',
    descripcion: 'Venda de tela elástica 10 cm x 4.5 m. Ideal para inmovilización y soporte muscular.',
    icono: 'venda',
  },
  {
    id: 6,
    nombre: 'Gasa Estéril',
    categoria: 'curacion',
    etiqueta: 'Material Curación',
    descripcion: 'Gasa tejida 100% algodón, 10x10 cm. Paquete x 10 sobres estériles individuales.',
    icono: 'gasa',
  },
  {
    id: 7,
    nombre: 'Esparadrapo Médico',
    categoria: 'curacion',
    etiqueta: 'Material Curación',
    descripcion: 'Cinta adhesiva hipoalergénica de tela. Rollo 5 cm x 5 m. Uso clínico y domiciliario.',
    icono: 'esparadrapo',
  },
  {
    id: 8,
    nombre: 'Apósito Adhesivo',
    categoria: 'curacion',
    etiqueta: 'Material Curación',
    descripcion: 'Curita estéril con almohadilla absorbente. Caja x 100 unidades en distintos tamaños.',
    icono: 'gasa',
  },
  /* ── Equipos de Diagnóstico (4) ── */
  {
    id: 9,
    nombre: 'Tensiómetro Digital',
    categoria: 'diagnostico',
    etiqueta: 'Diagnóstico',
    descripcion: 'Esfigmomanómetro automático de brazo. Pantalla LCD, memoria 120 lecturas, irregular heartbeat.',
    icono: 'tensiómetro',
  },
  {
    id: 10,
    nombre: 'Estetoscopio Clínico',
    categoria: 'diagnostico',
    etiqueta: 'Diagnóstico',
    descripcion: 'Estetoscopio biauricular de doble campana. Tubo de 65 cm. Varios colores disponibles.',
    icono: 'estetoscopio',
  },
  {
    id: 11,
    nombre: 'Oxímetro de Pulso',
    categoria: 'diagnostico',
    etiqueta: 'Diagnóstico',
    descripcion: 'Pulsioxímetro de dedo. Mide SpO2 y frecuencia cardíaca. Pantalla OLED. Incluye pilas.',
    icono: 'oximetro',
  },
  {
    id: 12,
    nombre: 'Termómetro Digital',
    categoria: 'diagnostico',
    etiqueta: 'Diagnóstico',
    descripcion: 'Termómetro clínico digital oral/axilar. Resultado en 60 seg. Alarma de fiebre. Memoria.',
    icono: 'termómetro',
  },
  /* ── Descartables (4) ── */
  {
    id: 13,
    nombre: 'Jeringa Desechable 5 ml',
    categoria: 'descartables',
    etiqueta: 'Descartables',
    descripcion: 'Jeringa Luer Lock con aguja 21G x 1½". Caja x 100 unidades. Esterilizada con EO.',
    icono: 'jeringa',
  },
  {
    id: 14,
    nombre: 'Catéter IV 20G',
    categoria: 'descartables',
    etiqueta: 'Descartables',
    descripcion: 'Catéter intravenoso periférico 20G. Cámara de reflujo. Con alas de fijación. Caja x 50.',
    icono: 'jeringa',
  },
  {
    id: 15,
    nombre: 'Sonda Foley 16 Fr',
    categoria: 'descartables',
    etiqueta: 'Descartables',
    descripcion: 'Sonda urinaria de doble vía látex siliconado. 16 Fr. Balón 10 ml. Embolsada individualmente.',
    icono: 'sonda',
  },
  {
    id: 16,
    nombre: 'Abatelenguas Madera',
    categoria: 'descartables',
    etiqueta: 'Descartables',
    descripcion: 'Baja lenguas de madera desechables, uso clínico. Bolsa x 100 unidades. Libre de astillas.',
    icono: 'abatelengua',
  },
  /* ── Instrumental Médico (2) ── */
  {
    id: 17,
    nombre: 'Tijeras Quirúrgicas',
    categoria: 'instrumental',
    etiqueta: 'Instrumental',
    descripcion: 'Tijeras Mayo de acero inoxidable 17 cm, punta roma-roma. Autoclavables. Uso clínico.',
    icono: 'tijeras',
  },
  {
    id: 18,
    nombre: 'Pinzas Hemostáticas',
    categoria: 'instrumental',
    etiqueta: 'Instrumental',
    descripcion: 'Pinzas Kelly de acero inoxidable 14 cm. Dientes transversales, cierre en clic. Autoclavables.',
    icono: 'pinzas',
  },
  /* ── Ortopedia y Rehabilitación (2) ── */
  {
    id: 19,
    nombre: 'Muñequera Elástica',
    categoria: 'ortopedia',
    etiqueta: 'Ortopedia',
    descripcion: 'Soporte para muñeca en neopreno transpirable. Tallas S-XL. Velcro ajustable. Par.',
    icono: 'ortopedia',
  },
  {
    id: 20,
    nombre: 'Muletas Axilares',
    categoria: 'ortopedia',
    etiqueta: 'Ortopedia',
    descripcion: 'Muletas de aluminio regulables en altura. Almohadilla axilar y empuñadura ergonómica. Par.',
    icono: 'muleta',
  },
];

export function getProductos(): Producto[] {
  return PRODUCTOS;
}

export function getProductoById(id: number): Producto | undefined {
  return PRODUCTOS.find((p) => p.id === id);
}

export function filtrarPorCategoria(categoria: CategoriaProducto): Producto[] {
  if (categoria === 'todos') return PRODUCTOS;
  return PRODUCTOS.filter((p) => p.categoria === categoria);
}

export function buscarProductos(termino: string, categoria: CategoriaProducto = 'todos'): Producto[] {
  const t = termino.toLowerCase().trim();
  return PRODUCTOS.filter((p) => {
    const coincideCategoria = categoria === 'todos' || p.categoria === categoria;
    const coincideBusqueda =
      !t ||
      p.nombre.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t) ||
      p.etiqueta.toLowerCase().includes(t);
    return coincideCategoria && coincideBusqueda;
  });
}
