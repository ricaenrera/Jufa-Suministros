/* ============================================================
   JUFA SUMINISTROS — Script principal
   Funciones: menú móvil, animaciones scroll, filtrado catálogo,
              búsqueda de productos, generación dinámica de tarjetas
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. DATOS DEL CATÁLOGO — 20 productos de ejemplo
      Estructura: { id, nombre, categoria, etiqueta, descripcion, icono }
      icono: clave del objeto ICONOS_SVG (abajo)
══════════════════════════════════════════════════════════ */
const PRODUCTOS = [
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

/* ══════════════════════════════════════════════════════════
   2. ÍCONOS SVG por tipo de producto
      Devuelven markup SVG inline para las tarjetas del catálogo
══════════════════════════════════════════════════════════ */
const ICONOS_SVG = {
  guante: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>`,

  mascarilla: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    <path d="M2 11h20"/>
    <path d="M5 11c0 5 3 9 7 9s7-4 7-9"/>
    <path d="M9 14c0 1.7.9 3 2 3s2-1.3 2-3"/>
  </svg>`,

  lentes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="6" cy="15" r="4"/>
    <circle cx="18" cy="15" r="4"/>
    <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
    <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/>
    <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>
  </svg>`,

  venda: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>`,

  gasa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>`,

  esparadrapo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="10" rx="3"/>
    <path d="M9 7v10M15 7v10"/>
    <path d="M9 12h6"/>
  </svg>`,

  tensiómetro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    <circle cx="19" cy="19" r="3"/>
  </svg>`,

  estetoscopio: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>`,

  oximetro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    <path d="M12 8v4M10 10h4"/>
  </svg>`,

  termómetro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>`,

  jeringa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m18 2 4 4"/><path d="m17 7 3-3"/>
    <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>
    <path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>
  </svg>`,

  sonda: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22V10"/>
    <path d="M5 10H2a10 10 0 0 0 20 0h-3"/>
    <path d="M8 10V3l4-1 4 1v7"/>
    <line x1="8" y1="7" x2="16" y2="7"/>
  </svg>`,

  abatelengua: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="10" width="18" height="4" rx="2"/>
    <path d="M3 12h18"/>
  </svg>`,

  tijeras: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="6" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>
  </svg>`,

  pinzas: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 3v12"/>
    <path d="M18 3v12"/>
    <path d="M6 15a6 6 0 0 0 6 6 6 6 0 0 0 6-6"/>
    <path d="M4 3h4M16 3h4"/>
  </svg>`,

  ortopedia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 12h6"/>
    <path d="M12 9v6"/>
    <rect x="4" y="4" width="16" height="16" rx="8"/>
  </svg>`,

  muleta: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 0 4H5a2 2 0 0 1-2-2z"/>
    <path d="M9 5v16"/>
    <path d="M6 14h6"/>
  </svg>`,

  /* Ícono genérico médico para casos sin ícono específico */
  generico: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12h6M12 9v6"/>
  </svg>`,
};

/* ══════════════════════════════════════════════════════════
   3. GENERADOR DE TARJETAS DE PRODUCTO
══════════════════════════════════════════════════════════ */

/**
 * Crea el HTML de una tarjeta de producto a partir de su datos.
 * El mensaje de WhatsApp se pre-llena con el nombre del producto.
 */
function crearTarjetaProducto(producto) {
  const icono = ICONOS_SVG[producto.icono] || ICONOS_SVG.generico;
  const mensajeWA = encodeURIComponent(`Hola, me interesa el producto: ${producto.nombre}`);
  const linkWA = `https://wa.me/584121017811?text=${mensajeWA}`;

  return `
    <article class="tarjeta-producto" data-categoria="${producto.categoria}" data-nombre="${producto.nombre.toLowerCase()}">
      <div class="producto-imagen">
        ${icono}
        <span class="producto-badge">${producto.etiqueta}</span>
      </div>
      <div class="producto-cuerpo">
        <p class="producto-categoria">${producto.etiqueta}</p>
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-descripcion">${producto.descripcion}</p>
        <div class="producto-acciones">
          <!-- Botón principal: abre el checkout modal -->
          <button
            class="btn-comprar"
            data-producto-id="${producto.id}"
            aria-label="Comprar: ${producto.nombre}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Comprar
          </button>
          <!-- Botón secundario: consulta directa por WhatsApp -->
          <a
            href="${linkWA}"
            class="btn-consultar btn-consultar-sm"
            target="_blank"
            rel="noopener"
            aria-label="Consultar por WhatsApp: ${producto.nombre}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.076-1.12l-.292-.173-3.045.859.817-3.02-.19-.31A7.952 7.952 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
            </svg>
            Consultar
          </a>
        </div>
      </div>
    </article>
  `;
}

/* ══════════════════════════════════════════════════════════
   4. MENÚ HAMBURGUESA (móvil)
══════════════════════════════════════════════════════════ */
function iniciarMenuMovil() {
  const btnMenu  = document.getElementById('btnMenu');
  const navMovil = document.getElementById('navMovil');
  if (!btnMenu || !navMovil) return;

  btnMenu.addEventListener('click', () => {
    const estaAbierto = navMovil.classList.toggle('visible');
    btnMenu.classList.toggle('abierto', estaAbierto);
    btnMenu.setAttribute('aria-expanded', estaAbierto);
  });

  /* Cierra el menú al hacer clic en un enlace */
  navMovil.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
      navMovil.classList.remove('visible');
      btnMenu.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════
   5. ANIMACIONES DE SCROLL — IntersectionObserver
      Todos los elementos con [data-animar] hacen fade-in
      al entrar en el viewport.
══════════════════════════════════════════════════════════ */
function iniciarAnimacionesScroll() {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          /* Una vez visible, dejar de observar para no re-animar */
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('[data-animar]').forEach(el => observador.observe(el));
}

/* ══════════════════════════════════════════════════════════
   6. CATÁLOGO — Filtrado y búsqueda
══════════════════════════════════════════════════════════ */

/* Estado actual del catálogo */
let categoriaActiva = 'todos';
let terminoBusqueda = '';

/**
 * Renderiza el grid de productos aplicando el filtro de categoría
 * y el término de búsqueda activos.
 */
function renderizarProductos() {
  const grid = document.getElementById('gridProductos');
  const sinResultados = document.getElementById('sinResultados');
  const contadorVisible = document.getElementById('contadorVisible');
  const contadorTotal = document.getElementById('contadorTotal');
  if (!grid) return;

  /* Filtrar por categoría y término de búsqueda */
  const filtrados = PRODUCTOS.filter(p => {
    const coincideCategoria = categoriaActiva === 'todos' || p.categoria === categoriaActiva;
    const coincideBusqueda  = p.nombre.toLowerCase().includes(terminoBusqueda) ||
                              p.descripcion.toLowerCase().includes(terminoBusqueda) ||
                              p.etiqueta.toLowerCase().includes(terminoBusqueda);
    return coincideCategoria && coincideBusqueda;
  });

  /* Actualizar contadores */
  if (contadorVisible) contadorVisible.textContent = filtrados.length;
  if (contadorTotal)   contadorTotal.textContent   = PRODUCTOS.length;

  /* Mostrar/ocultar mensaje de sin resultados */
  if (sinResultados) {
    sinResultados.classList.toggle('visible', filtrados.length === 0);
  }

  /* Renderizar tarjetas */
  grid.innerHTML = filtrados.map(crearTarjetaProducto).join('');
}

/**
 * Actualiza qué elemento de filtro aparece como activo (sidebar y chips móvil).
 */
function actualizarFiltrosUI(categoria) {
  /* Sidebar desktop */
  document.querySelectorAll('#filtrosSidebar .filtro-item').forEach(item => {
    const esActivo = item.dataset.categoria === categoria;
    item.classList.toggle('activo', esActivo);
    item.setAttribute('aria-pressed', esActivo);
  });

  /* Chips móvil */
  document.querySelectorAll('.chip-filtro').forEach(chip => {
    chip.classList.toggle('activo', chip.dataset.categoria === categoria);
  });
}

/**
 * Aplica un nuevo filtro de categoría.
 */
function aplicarFiltro(categoria) {
  categoriaActiva = categoria;
  actualizarFiltrosUI(categoria);
  renderizarProductos();
}

/**
 * Inicializa toda la lógica del catálogo:
 * generación de productos, filtros sidebar, chips móvil, búsqueda.
 */
function iniciarCatalogo() {
  const grid = document.getElementById('gridProductos');
  if (!grid) return; /* No estamos en la página del catálogo */

  /* Renderizado inicial */
  renderizarProductos();

  /* ── Filtros en sidebar (desktop) ── */
  document.querySelectorAll('#filtrosSidebar .filtro-item').forEach(item => {
    item.addEventListener('click', () => aplicarFiltro(item.dataset.categoria));
    /* Accesibilidad: también con teclado */
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        aplicarFiltro(item.dataset.categoria);
      }
    });
  });

  /* ── Chips de filtro (móvil) ── */
  document.querySelectorAll('.chip-filtro').forEach(chip => {
    chip.addEventListener('click', () => aplicarFiltro(chip.dataset.categoria));
  });

  /* ── Panel de filtros móvil (colapsar/expandir) ── */
  const btnFiltrosMovil = document.getElementById('filtrosMovilBtn');
  const panelFiltrosMovil = document.getElementById('filtrosMovilPanel');
  if (btnFiltrosMovil && panelFiltrosMovil) {
    btnFiltrosMovil.addEventListener('click', () => {
      const estaAbierto = panelFiltrosMovil.classList.toggle('visible');
      btnFiltrosMovil.classList.toggle('abierto', estaAbierto);
      btnFiltrosMovil.setAttribute('aria-expanded', estaAbierto);
      panelFiltrosMovil.setAttribute('aria-hidden', !estaAbierto);
    });
  }

  /* ── Búsqueda de productos ── */
  const inputBusqueda = document.getElementById('inputBusqueda');
  if (inputBusqueda) {
    /* Debounce: espera 300 ms antes de filtrar para no disparar en cada tecla */
    let temporizador;
    inputBusqueda.addEventListener('input', () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        terminoBusqueda = inputBusqueda.value.toLowerCase().trim();
        renderizarProductos();
      }, 300);
    });

    /* Limpiar al borrar con Escape */
    inputBusqueda.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        inputBusqueda.value = '';
        terminoBusqueda = '';
        renderizarProductos();
      }
    });
  }

  /* ── Pre-seleccionar categoría desde URL (?cat=...) ── */
  const params = new URLSearchParams(window.location.search);
  const catURL = params.get('cat');
  if (catURL) {
    aplicarFiltro(catURL);
  }
}

/* ══════════════════════════════════════════════════════════
   7. PUNTO DE ENTRADA — Ejecutar al cargar el DOM
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  iniciarMenuMovil();
  iniciarAnimacionesScroll();
  iniciarCatalogo();
});
